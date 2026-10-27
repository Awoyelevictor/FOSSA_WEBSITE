import { createClient } from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const anon=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase=url&&anon?createClient(url,anon,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
export async function adminRequest(path,options={}) {
 const {data}=await supabase?.auth.getSession()||{};
 const token=data?.session?.access_token;
 if(!token)throw new Error('Your session has expired. Please sign in again.');
 const response=await fetch('/api/admin/'+path.replace(/^\/+/,''),{...options,headers:{'Content-Type':'application/json',Authorization:'Bearer '+token,...(options.headers||{})},body:options.body===undefined?undefined:JSON.stringify(options.body)});
 const payload=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(payload.error||'The request failed.');
 return payload;
}