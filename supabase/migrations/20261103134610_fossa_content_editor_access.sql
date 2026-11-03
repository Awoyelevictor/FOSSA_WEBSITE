-- Additive content-editor access for executives without replacing their primary FOSSA role.
create table if not exists public.fossa_content_editor_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid references auth.users(id) on delete set null,
  source text not null default 'executive_profile',
  granted_at timestamptz not null default now()
);

alter table public.fossa_content_editor_access enable row level security;
revoke all on public.fossa_content_editor_access from public, anon, authenticated;
grant all on public.fossa_content_editor_access to service_role;
