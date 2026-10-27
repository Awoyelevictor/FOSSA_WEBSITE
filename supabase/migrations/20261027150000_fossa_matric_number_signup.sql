alter table public.fossa_user_roles
  add column if not exists matric_number text;

create unique index if not exists fossa_user_roles_matric_number_unique
  on public.fossa_user_roles (upper(btrim(matric_number)))
  where matric_number is not null and btrim(matric_number) <> '';

create or replace function public.fossa_bootstrap_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested text;
  display_name text;
  matric text;
begin
  requested := case when new.raw_user_meta_data ->> 'requested_role' = 'lecturer' then 'lecturer' else 'student' end;
  display_name := coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), '');
  matric := nullif(regexp_replace(upper(trim(coalesce(new.raw_user_meta_data ->> 'matric_number', ''))), '\s+', '', 'g'), '');

  insert into public.fossa_user_roles(user_id, role, requested_role, display_name, matric_number)
  values(new.id, 'student', requested, display_name, matric)
  on conflict(user_id) do nothing;

  return new;
end;
$$;

update public.fossa_user_roles r
set matric_number = nullif(regexp_replace(upper(trim(coalesce(u.raw_user_meta_data ->> 'matric_number', ''))), '\s+', '', 'g'), '')
from auth.users u
where u.id = r.user_id
  and r.matric_number is null
  and nullif(trim(coalesce(u.raw_user_meta_data ->> 'matric_number', '')), '') is not null;
