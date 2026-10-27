-- FOSSA role-based authentication: students self-register; lecturer access is approval-only.
alter table public.fossa_user_roles drop constraint if exists fossa_user_roles_role_check;
alter table public.fossa_user_roles add constraint fossa_user_roles_role_check check (role in ('student','lecturer','editor','admin','super_admin'));
alter table public.fossa_user_roles add column if not exists requested_role text not null default 'student' check (requested_role in ('student','lecturer'));
create or replace function public.fossa_bootstrap_auth_user() returns trigger language plpgsql security definer set search_path = '' as $$
declare requested text; display_name text;
begin
 requested := case when new.raw_user_meta_data ->> 'requested_role' = 'lecturer' then 'lecturer' else 'student' end;
 display_name := coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), '');
 insert into public.fossa_user_roles(user_id,role,requested_role,display_name) values(new.id,'student',requested,display_name) on conflict(user_id) do nothing;
 return new;
end; $$;
drop trigger if exists fossa_auth_user_created on auth.users;
create trigger fossa_auth_user_created after insert on auth.users for each row execute function public.fossa_bootstrap_auth_user();
insert into public.fossa_user_roles(user_id,role,requested_role,display_name)
select u.id,'student',case when u.raw_user_meta_data ->> 'requested_role' = 'lecturer' then 'lecturer' else 'student' end,coalesce(nullif(trim(u.raw_user_meta_data ->> 'display_name'),''),'')
from auth.users u on conflict(user_id) do nothing;
