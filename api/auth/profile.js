import { createClient } from '@supabase/supabase-js';
const send=(res,status,body)=>res.status(status).json(body);
export default async function profileHandler(req,res){
 if(req.method!=='GET')return send(res,405,{error:'Method not allowed.'});
 const url=process.env.VITE_SUPABASE_URL||process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return send(res,503,{error:'Account role verification is not configured. Ask the site owner to complete ADMIN_SETUP.md.'});
 const token=(req.headers.authorization||'').startsWith('Bearer ')?req.headers.authorization.slice(7):'';
 if(!token)return send(res,401,{error:'Sign in to continue.'});
 try{
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const{data:auth,error:authError}=await db.auth.getUser(token);
  if(authError||!auth?.user)return send(res,401,{error:'Session invalid or expired. Please sign in again.'});
  const{data:profile,error}=await db.from('fossa_user_roles').select('role,display_name').eq('user_id',auth.user.id).maybeSingle();
  if(error){console.error('FOSSA role query failed:',{code:error.code,message:error.message,details:error.details,hint:error.hint,host:(()=>{try{return new URL(url).host}catch{return 'invalid-url'}})()});return send(res,503,{error:'Could not verify your FOSSA role. The server could not read the role record; check the Vercel Supabase URL and service-role key, then inspect function logs.'});}
  if(!profile)return send(res,403,{error:'No FOSSA role is assigned to this account. Contact the site owner.'});
  const email=String(auth.user.email||'').trim().toLowerCase();
  if(profile.role==='super_admin' && email!=='fossaadelekeuniversity@gmail.com')return send(res,403,{error:'Super Admin access is restricted to the designated FOSSA account.'});
  return send(res,200,{role:profile.role,display_name:profile.display_name||''});
 }catch(error){console.error('FOSSA profile lookup failed:',error);return send(res,500,{error:'Could not verify your account. Please try again.'});}
}