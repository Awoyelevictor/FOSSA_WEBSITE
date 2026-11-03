import { createClient } from '@supabase/supabase-js';
const TYPES = new Set(['announcements','events','resources','gallery','site-content']);
const ROLES = new Set(['student','lecturer','editor','admin','super_admin']);
const SUPER_ADMIN_EMAIL = 'fossaadelekeuniversity@gmail.com';
const send = (res, code, body) => res.status(code).json(body);
export default async function adminHandler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!['GET','POST','PUT','PATCH','DELETE'].includes(req.method)) return send(res,405,{error:'Method not allowed.'});
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res,503,{error:'Admin database is not configured. Ask the site owner to complete ADMIN_SETUP.md.'});
  try {
    const db = createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
    const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
    if (!token) return send(res,401,{error:'Sign in to continue.'});
    const {data:auth,error:authError}=await db.auth.getUser(token);
    if(authError || !auth?.user) return send(res,401,{error:'Session invalid or expired. Sign in again.'});
    const actor=auth.user;
    const actorEmail=String(actor.email||'').trim().toLowerCase();
    const {data:profile,error:profileError}=await db.from('fossa_user_roles').select('role,display_name').eq('user_id',actor.id).maybeSingle();
    if(profileError){console.error('FOSSA admin role query failed:',{code:profileError.code,message:profileError.message,details:profileError.details,hint:profileError.hint,host:(()=>{try{return new URL(url).host}catch{return 'invalid-url'}})()});return send(res,503,{error:'Could not verify role. Check the Supabase project URL, service-role key, and function logs.'});}
    if(!profile) return send(res,403,{error:'This account has no FOSSA role.'});
    const { data: additionalEditor, error: additionalEditorError } = await db.from('fossa_content_editor_access').select('user_id').eq('user_id',actor.id).maybeSingle();
    if (additionalEditorError) return send(res,503,{error:'Could not verify additional content-editor access. Apply the latest FOSSA migration.'});
    const hasAdditionalEditorAccess = Boolean(additionalEditor);
    if(!['editor','admin','super_admin'].includes(profile.role) && !hasAdditionalEditorAccess) return send(res,403,{error:'This account has no FOSSA content-editor access.'});
    // Enforce the sole Super Admin identity on every server request.
    if(profile.role==='super_admin' && actorEmail!==SUPER_ADMIN_EMAIL) return send(res,403,{error:'Super Admin access is restricted to the designated FOSSA account.'});
    const parts=new URL(req.url,'http://localhost').pathname.replace(/^\/api\/admin\/?/,'').split('/').filter(Boolean);
    const [section,type,id]=parts;
    const superAdmin=profile.role==='super_admin';
    const admin=superAdmin||profile.role==='admin';
    const audit=async(action,entity,entityId,details={})=>{await db.from('fossa_admin_audit_logs').insert({actor_id:actor.id,actor_email:actor.email,action,entity_type:entity,entity_id:entityId==null?null:String(entityId),details});};
    const findExecutiveAccount = async payload => {
      if (!/^executive\b/i.test(String(payload?.category || ''))) return null;
      const email = String(payload.account_email || '').trim().toLowerCase();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        throw Object.assign(new Error('Add the executive’s registered FOSSA account email to grant content-editor access automatically.'), { status: 400 });
      }
      const { data: users, error: usersError } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) throw usersError;
      const account = (users?.users || []).find(item => String(item.email || '').trim().toLowerCase() === email);
      if (!account) throw Object.assign(new Error('No FOSSA account exists for this email. Invite the executive as a student first, then publish the profile.'), { status: 400 });
      const { data: existing, error: roleError } = await db.from('fossa_user_roles').select('role').eq('user_id', account.id).maybeSingle();
      if (roleError) throw roleError;
      return { account, role: existing?.role || 'student', email };
    };
    const grantExecutiveEditor = async (resolved, executiveId) => {
      if (!resolved) return null;
      if (['admin', 'super_admin', 'editor'].includes(resolved.role)) return { email: resolved.email, role: resolved.role, granted: false };
      const { error: grantError } = await db.from('fossa_content_editor_access').upsert({
        user_id: resolved.account.id, granted_by: actor.id, source: 'executive_profile:' + String(executiveId || 'new')
      }, { onConflict: 'user_id' });
      if (grantError) throw grantError;
      await audit('executive_editor_granted', 'user', resolved.account.id, { email: resolved.email, source: 'published executive profile' });
      return { email: resolved.email, role: resolved.role, can_edit_content: true, granted: true };
    };
    const revokeExecutiveEditor = async payload => {
      if (!/^executive\b/i.test(String(payload?.category || ''))) return;
      const email = String(payload.account_email || '').trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) return;
      const { data: users, error: usersError } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (usersError) throw usersError;
      const account = (users?.users || []).find(item => String(item.email || '').trim().toLowerCase() === email);
      if (!account) return;
      const { data: remaining, error: remainingError } = await db.from('fossa_content_items')
        .select('id').eq('content_type', 'site-content').eq('published', true)
        .eq('payload->>account_email', email).ilike('payload->>category', 'Executive%');
      if (remainingError) throw remainingError;
      if ((remaining || []).length) return;
      const { error } = await db.from('fossa_content_editor_access').delete().eq('user_id', account.id);
      if (error) throw error;
      await audit('executive_editor_revoked', 'user', account.id, { email, source: 'executive profile unpublished, removed, or reassigned' });
    };
    if(section==='content'){
      if(!TYPES.has(type)) return send(res,400,{error:'Unknown content section.'});
      if(req.method==='GET'){
        let q=db.from('fossa_content_items').select('*').eq('content_type',type).order('updated_at',{ascending:false});
        if(new URL(req.url,'http://localhost').searchParams.get('published')==='true') q=q.eq('published',true);
        const {data,error}=await q;if(error)throw error;
        let items=data||[];
        if(type==='events'&&admin&&items.length){
          const{data:registrations,error:registrationError}=await db.from('fossa_event_registrations').select('event_id').in('event_id',items.map(item=>item.id));
          if(registrationError)throw registrationError;
          const counts=new Map();
          for(const registration of registrations||[])counts.set(registration.event_id,(counts.get(registration.event_id)||0)+1);
          items=items.map(item=>({...item,registration_count:counts.get(item.id)||0}));
        }
        return send(res,200,{items});
      }
      if((profile.role==='editor'||hasAdditionalEditorAccess) && type==='site-content') return send(res,403,{error:'Only administrators can edit site-wide content.'});
      if(req.method==='POST'){
        const payload=req.body?.payload;
        if(!payload||typeof payload!=='object'||Array.isArray(payload)||!String(payload.title||'').trim())return send(res,400,{error:'A title is required.'});
        const publishedExecutive=type==='site-content'&&Boolean(req.body.published)&&/^executive\b/i.test(String(payload.category||''));
        const resolvedExecutive=publishedExecutive?await findExecutiveAccount(payload):null;
        const {data,error}=await db.from('fossa_content_items').insert({content_type:type,payload,published:Boolean(req.body.published),created_by:actor.id,updated_by:actor.id}).select('*').single();
        if(error)throw error;
        let executiveAccess=null;
        if(resolvedExecutive){
          try{executiveAccess=await grantExecutiveEditor(resolvedExecutive,data.id);}
          catch(grantError){await db.from('fossa_content_items').delete().eq('id',data.id);throw grantError;}
        }
        await audit('create',type,data.id,{title:payload.title});return send(res,201,{item:data,executiveAccess});
      }
      if(!id)return send(res,400,{error:'Content ID is required.'});
      if(req.method==='DELETE'){
        const {data:old,error:oldError}=await db.from('fossa_content_items').select('payload,published').eq('id',id).eq('content_type',type).maybeSingle();
        if(oldError)throw oldError;
        if(!old)return send(res,404,{error:'Content item not found.'});
        const {error}=await db.from('fossa_content_items').delete().eq('id',id).eq('content_type',type);if(error)throw error;
        if(old.published)await revokeExecutiveEditor(old.payload);
        await audit('delete',type,id,{title:old?.payload?.title||''});return send(res,200,{success:true});
      }
      const updates={updated_by:actor.id,updated_at:new Date().toISOString()};
      if(req.body?.payload!==undefined){if(!req.body.payload||typeof req.body.payload!=='object'||Array.isArray(req.body.payload)||!String(req.body.payload.title||'').trim())return send(res,400,{error:'A title is required.'});updates.payload=req.body.payload;}
      if(typeof req.body?.published==='boolean')updates.published=req.body.published;
      const {data:currentItem,error:currentError}=await db.from('fossa_content_items').select('payload,published').eq('id',id).eq('content_type',type).maybeSingle();
      if(currentError)throw currentError;
      if(!currentItem)return send(res,404,{error:'Content item not found.'});
      const nextPayload=updates.payload||currentItem.payload;
      const nextPublished=typeof updates.published==='boolean'?updates.published:currentItem.published;
      const publishedExecutive=type==='site-content'&&nextPublished&&/^executive\b/i.test(String(nextPayload?.category||''));
      const resolvedExecutive=publishedExecutive?await findExecutiveAccount(nextPayload):null;
      const {data,error}=await db.from('fossa_content_items').update(updates).eq('id',id).eq('content_type',type).select('*').single();
      if(error)throw error;
      let executiveAccess=null;
      if(resolvedExecutive){
        try{executiveAccess=await grantExecutiveEditor(resolvedExecutive,id);}
        catch(grantError){await db.from('fossa_content_items').update({payload:currentItem.payload,published:currentItem.published}).eq('id',id);throw grantError;}
      }
      const oldWasExecutive=type==='site-content'&&currentItem.published&&/^executive\b/i.test(String(currentItem.payload?.category||''));
      const sameExecutive=publishedExecutive&&String(currentItem.payload?.account_email||'').trim().toLowerCase()===String(nextPayload?.account_email||'').trim().toLowerCase();
      if(oldWasExecutive&&!sameExecutive)await revokeExecutiveEditor(currentItem.payload);
      await audit('update',type,id,{title:data.payload?.title||''});return send(res,200,{item:data,executiveAccess});
    }
    if(section==='users'){
      if(!admin)return send(res,403,{error:'Only admins can manage student accounts.'});
      if(req.method==='GET'&&!type){
        const {data:list,error}=await db.auth.admin.listUsers({page:1,perPage:200});if(error)throw error;
        const {data:roles,error:roleErr}=await db.from('fossa_user_roles').select('user_id,role,display_name,requested_role');if(roleErr)throw roleErr;
        const map=new Map((roles||[]).map(r=>[r.user_id,r]));
        return send(res,200,{users:(list.users||[]).map(u=>({id:u.id,email:u.email,created_at:u.created_at,last_sign_in_at:u.last_sign_in_at,...map.get(u.id)}))});
      }
      if(req.method==='POST'&&!type){
        const {email,displayName,role='student'}=req.body||{};
        if(!email||!/^\S+@\S+\.\S+$/.test(email))return send(res,400,{error:'Enter a valid email.'});
        if(!ROLES.has(role)||(['admin','super_admin'].includes(role)&&!superAdmin))return send(res,403,{error:'You cannot assign that role.'});
        if(role==='super_admin')return send(res,403,{error:'Super Admin is a single protected account and cannot be granted through invitations.'});
        const {data,error}=await db.auth.admin.inviteUserByEmail(email,{data:{display_name:displayName||''}});if(error)throw error;
        const {error:roleErr}=await db.from('fossa_user_roles').upsert({user_id:data.user.id,role,display_name:displayName||''});if(roleErr)throw roleErr;
        await audit('invite','user',data.user.id,{email,role});return send(res,201,{user:{id:data.user.id,email:data.user.email,role}});
      }
      if(req.method==='PATCH'&&type){
        const targetId=type,role=req.body?.role;
        if(!ROLES.has(role))return send(res,400,{error:'Unknown role.'});
        if(targetId===actor.id)return send(res,400,{error:'You cannot change your own role.'});
        if(['admin','super_admin'].includes(role)&&!superAdmin)return send(res,403,{error:'Only a super administrator can grant admin access.'});
        const {data:target}=await db.from('fossa_user_roles').select('role').eq('user_id',targetId).maybeSingle();
        if(target?.role==='super_admin'&&!superAdmin)return send(res,403,{error:'Only a super administrator can change this account.'});
        if(role==='super_admin')return send(res,403,{error:'Super Admin is restricted to the designated account and cannot be granted here.'});
        const {data,error}=await db.from('fossa_user_roles').upsert({user_id:targetId,role}).select('user_id,role,display_name').single();if(error)throw error;
        await audit('role_change','user',targetId,{role});return send(res,200,{user:data});
      }
      if(req.method==='DELETE'&&type){
        if(!superAdmin)return send(res,403,{error:'Only a super administrator can delete accounts.'});
        if(type===actor.id)return send(res,400,{error:'You cannot delete your own account.'});
        const {error}=await db.auth.admin.deleteUser(type);if(error)throw error;
        await audit('delete','user',type);return send(res,200,{success:true});
      }
      return send(res,405,{error:'Unsupported account operation.'});
    }
    if(section==='audit'&&req.method==='GET'){
      if(!admin)return send(res,403,{error:'Only administrators can view audit logs.'});
      const {data,error}=await db.from('fossa_admin_audit_logs').select('id,actor_email,action,entity_type,entity_id,details,created_at').order('created_at',{ascending:false}).limit(100);
      if(error)throw error;return send(res,200,{logs:data||[]});
    }
    return send(res,404,{error:'Admin endpoint not found.'});
  } catch(err) {
    console.error('FOSSA admin API failure:',err?.message||err);
    return send(res,err.status||500,{error:err.status?err.message:'The request failed. Check server configuration and database migration.'});
  }
}