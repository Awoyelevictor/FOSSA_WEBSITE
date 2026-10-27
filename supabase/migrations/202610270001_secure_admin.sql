-- Run in the Supabase SQL Editor before enabling the admin console.
create extension if not exists pgcrypto;
create table if not exists public.fossa_user_roles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'student' check(role in ('student','editor','admin','super_admin')),
 display_name text not null default '', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.fossa_content_items (
 id uuid primary key default gen_random_uuid(),
 content_type text not null check(content_type in ('announcements','events','resources','gallery','site-content')),
 payload jsonb not null default '{}'::jsonb, published boolean not null default false,
 created_by uuid references auth.users(id) on delete set null, updated_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists fossa_content_type_updated_idx on public.fossa_content_items(content_type,updated_at desc);
create table if not exists public.fossa_admin_audit_logs (
 id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null,
 actor_email text, action text not null, entity_type text not null, entity_id text, details jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists fossa_admin_audit_created_idx on public.fossa_admin_audit_logs(created_at desc);
alter table public.fossa_user_roles enable row level security;
alter table public.fossa_content_items enable row level security;
alter table public.fossa_admin_audit_logs enable row level security;
revoke all on public.fossa_user_roles from anon,authenticated;
revoke all on public.fossa_content_items from anon,authenticated;
revoke all on public.fossa_admin_audit_logs from anon,authenticated;
grant all on public.fossa_user_roles to service_role;
grant all on public.fossa_content_items to service_role;
grant all on public.fossa_admin_audit_logs to service_role;
create or replace function public.fossa_set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end; $$;
drop trigger if exists fossa_user_roles_updated_at on public.fossa_user_roles;
create trigger fossa_user_roles_updated_at before update on public.fossa_user_roles for each row execute function public.fossa_set_updated_at();
drop trigger if exists fossa_content_items_updated_at on public.fossa_content_items;
create trigger fossa_content_items_updated_at before update on public.fossa_content_items for each row execute function public.fossa_set_updated_at();

-- Bootstrap: first create a trusted user in Supabase Auth, then replace UUID and run:
-- insert into public.fossa_user_roles(user_id,role,display_name)
-- values ('YOUR-AUTH-USER-UUID','super_admin','FOSSA Administrator')
-- on conflict(user_id) do update set role='super_admin',display_name=excluded.display_name;