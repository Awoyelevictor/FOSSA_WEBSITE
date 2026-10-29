-- Persist event RSVPs in the database so registrations follow a student across devices.
create table if not exists public.fossa_event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.fossa_content_items(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (event_id, user_id)
);

create index if not exists fossa_event_registrations_user_idx
  on public.fossa_event_registrations(user_id, created_at desc);
create index if not exists fossa_event_registrations_event_idx
  on public.fossa_event_registrations(event_id);

alter table public.fossa_event_registrations enable row level security;
revoke all on public.fossa_event_registrations from anon, authenticated;
grant all on public.fossa_event_registrations to service_role;
