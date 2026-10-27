import { createClient } from '@supabase/supabase-js';

const send=(res,status,body)=>res.status(status).json(body);
const levels=new Set([100,200,300,400,500,600]);
const getClient=()=>createClient(process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
async function auth(req,res,db){
 const token=(req.headers.authorization||'').startsWith('Bearer ')?req.headers.authorization.slice(7):'';
 if(!token){send(res,401,{error:'Sign in to continue.'});return null;}
 const{data,error}=await db.auth.getUser(token);
 if(error||!data?.user){send(res,401,{error:'Session invalid or expired. Sign in again.'});return null;}
 const{data:role,error:roleError}=await db.from('fossa_user_roles').select('role,display_name').eq('user_id',data.user.id).maybeSingle();
 if(roleError){send(res,503,{error:'Could not verify your FOSSA role. Apply the latest Supabase migrations.'});return null;}
 return {user:data.user,profile:role};
}
export default async function academicHandler(req,res){
 if(!['GET','POST','DELETE'].includes(req.method))return send(res,405,{error:'Method not allowed.'});
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY||!(process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL))return send(res,503,{error:'Academic records are not configured. Complete the FOSSA server environment setup.'});
 try{
  const db=getClient(),identity=await auth(req,res,db);if(!identity)return;
  const{user,profile}=identity;if(!profile)return send(res,403,{error:'Your account has no FOSSA role.'});
  const url=new URL(req.url,'http://localhost'),path=url.pathname.split('/').filter(Boolean).slice(2);
  if(path[0]==='advisors'){
   if(!['super_admin','admin'].includes(profile.role))return send(res,403,{error:'Only school administrators can manage Level Advisor assignments.'});
   if(req.method==='GET'){
    const[{data:lecturers,error:lErr},{data:assignments,error:aErr}]=await Promise.all([
     db.from('fossa_user_roles').select('user_id,display_name,role').eq('role','lecturer').order('display_name'),
     db.from('fossa_level_advisors').select('id,lecturer_id,department,level,active,created_at').eq('active',true).order('department').order('level')
    ]);
    if(lErr||aErr)throw lErr||aErr;
    const ids=(lecturers||[]).map(x=>x.user_id);
    const {data:users,error:uErr}=ids.length?await db.auth.admin.listUsers({page:1,perPage:1000}):{data:{users:[]},error:null};
    if(uErr)throw uErr;
    const emails=new Map((users?.users||[]).map(x=>[x.id,x.email]));
    return send(res,200,{lecturers:(lecturers||[]).map(x=>({...x,email:emails.get(x.user_id)||''})),assignments:assignments||[]});
   }
   if(req.method==='POST'){
    if(profile.role!=='super_admin')return send(res,403,{error:'Only the Super Admin can assign Level Advisors.'});
    const{lecturerId,department,level}=req.body||{},numericLevel=Number(level),dept=String(department||'').trim();
    if(!lecturerId||!dept||dept.length>120||!levels.has(numericLevel))return send(res,400,{error:'Choose a lecturer, department and valid level.'});
    const{data:lecturer,error:lErr}=await db.from('fossa_user_roles').select('role').eq('user_id',lecturerId).maybeSingle();
    if(lErr)throw lErr;if(lecturer?.role!=='lecturer')return send(res,400,{error:'Only an approved lecturer account can be assigned.'});
    const{data:existing,error:eErr}=await db.from('fossa_level_advisors').select('id').eq('active',true).ilike('department',dept).eq('level',numericLevel);
    if(eErr)throw eErr;
    if(existing?.length){const{error}=await db.from('fossa_level_advisors').update({active:false}).in('id',existing.map(x=>x.id));if(error)throw error;}
    const{data:assignment,error}=await db.from('fossa_level_advisors').insert({lecturer_id:lecturerId,department:dept,level:numericLevel,assigned_by:user.id,active:true}).select('*').single();
    if(error)throw error;
    await db.from('fossa_admin_audit_logs').insert({actor_id:user.id,actor_email:user.email,action:'assign_level_advisor',entity_type:'level_advisor',entity_id:assignment.id,details:{lecturerId,department:dept,level:numericLevel}});
    return send(res,201,{assignment});
   }
   return send(res,405,{error:'Method not allowed.'});
  }
  if(path[0]==='students'&&req.method==='GET'){
   if(!['lecturer','super_admin','admin'].includes(profile.role))return send(res,403,{error:'Academic records are available to assigned Level Advisors and administrators.'});
   let cohortQuery=db.from('fossa_level_advisors').select('department,level').eq('active',true);
   if(profile.role==='lecturer')cohortQuery=cohortQuery.eq('lecturer_id',user.id);
   const{data:cohorts,error:cErr}=await cohortQuery;if(cErr)throw cErr;
   if(profile.role==='lecturer'&&!cohorts?.length)return send(res,200,{cohorts:[],students:[]});
   const filters=profile.role==='lecturer'?cohorts:[];
   let query=db.from('fossa_academic_students').select('user_id,student_number,department,level');
   const{data:allStudents,error:sErr}=await query.order('student_number');if(sErr)throw sErr;
   const students=(allStudents||[]).filter(s=>profile.role!=='lecturer'||filters.some(c=>c.department.toLowerCase()===s.department.toLowerCase()&&c.level===s.level));
   if(!students.length)return send(res,200,{cohorts:cohorts||[],students:[]});
   const ids=students.map(s=>s.user_id);
   const[{data:registrations,error:rErr},{data:results,error:resErr},{data:users,error:uErr}]=await Promise.all([
    db.from('fossa_course_registrations').select('student_id,academic_session,semester,status,course_id,fossa_academic_courses(course_code,title,credit_units)').in('student_id',ids).order('academic_session',{ascending:false}),
    db.from('fossa_course_results').select('student_id,academic_session,semester,score,grade,grade_point,result_status,course_id,fossa_academic_courses(course_code,title,credit_units)').in('student_id',ids).order('academic_session',{ascending:false}),
    db.auth.admin.listUsers({page:1,perPage:1000})
   ]);
   if(rErr||resErr||uErr)throw rErr||resErr||uErr;
   const userMap=new Map((users?.users||[]).map(x=>[x.id,{email:x.email,name:x.user_metadata?.display_name||x.user_metadata?.full_name||''}]));
   const mapped=students.map(s=>{
    const account=userMap.get(s.user_id)||{};
    const regs=(registrations||[]).filter(x=>x.student_id===s.user_id);
    const res=(results||[]).filter(x=>x.student_id===s.user_id);
    return {...s,display_name:account.name,email:account.email,registrations:regs,results:res,carryovers:res.filter(x=>['failed','carryover'].includes(String(x.result_status).toLowerCase()))};
   });
   return send(res,200,{cohorts:cohorts||[],students:mapped});
  }
  return send(res,404,{error:'Unknown academic endpoint.'});
 }catch(error){console.error('FOSSA academic API error:',error);return send(res,500,{error:'Could not load academic records. Verify the academic schema and try again.'});}
}
