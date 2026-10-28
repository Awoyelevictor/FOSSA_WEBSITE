-- FOSSA election module: server-mediated access, secret ballot choices, and database-enforced one-vote-per-post.
create table if not exists public.fossa_elections (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 3 and 160),
  description text not null default '',
  status text not null default 'draft' check (status in ('draft','published','results_published','cancelled')),
  registration_starts_at timestamptz not null,
  registration_ends_at timestamptz not null,
  voting_starts_at timestamptz not null,
  voting_ends_at timestamptz not null,
  show_live_scores boolean not null default true,
  created_by uuid not null references auth.users(id),
  published_at timestamptz,
  results_published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (registration_starts_at < registration_ends_at),
  check (registration_ends_at <= voting_starts_at),
  check (voting_starts_at < voting_ends_at)
);
create table if not exists public.fossa_election_cohorts (
  election_id uuid not null references public.fossa_elections(id) on delete cascade,
  department text not null check (length(trim(department)) between 1 and 120),
  level integer not null check (level in (100,200,300,400,500,600)),
  primary key (election_id, department, level)
);
create table if not exists public.fossa_election_posts (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.fossa_elections(id) on delete cascade,
  title text not null check (length(trim(title)) between 2 and 120),
  description text not null default '',
  created_at timestamptz not null default now(),
  unique (election_id, title)
);
create table if not exists public.fossa_election_candidates (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.fossa_elections(id) on delete cascade,
  post_id uuid not null references public.fossa_election_posts(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  manifesto text not null default '',
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  review_note text not null default '',
  created_at timestamptz not null default now(),
  unique (post_id, student_id),
  unique (id, post_id)
);
-- This table records participation only; it does not contain the candidate selection.
create table if not exists public.fossa_election_participation (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.fossa_elections(id) on delete restrict,
  post_id uuid not null references public.fossa_election_posts(id) on delete restrict,
  voter_id uuid not null references auth.users(id) on delete restrict,
  accepted_at timestamptz not null default now(),
  unique (election_id, post_id, voter_id)
);
-- Ballots contain candidate choice but intentionally have no voter_id or participation_id.
create table if not exists public.fossa_election_ballots (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.fossa_elections(id) on delete restrict,
  post_id uuid not null references public.fossa_election_posts(id) on delete restrict,
  candidate_id uuid not null,
  foreign key (candidate_id, post_id) references public.fossa_election_candidates(id, post_id) on delete restrict
);
create table if not exists public.fossa_election_audit_logs (
  id uuid primary key default gen_random_uuid(),
  election_id uuid references public.fossa_elections(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists fossa_elections_public_status_idx on public.fossa_elections(status, voting_starts_at, voting_ends_at);
create index if not exists fossa_election_candidates_post_status_idx on public.fossa_election_candidates(post_id, status);
create index if not exists fossa_election_ballots_tally_idx on public.fossa_election_ballots(election_id, post_id, candidate_id);
create index if not exists fossa_election_participation_voter_idx on public.fossa_election_participation(voter_id, election_id);
alter table public.fossa_elections enable row level security;
alter table public.fossa_election_cohorts enable row level security;
alter table public.fossa_election_posts enable row level security;
alter table public.fossa_election_candidates enable row level security;
alter table public.fossa_election_participation enable row level security;
alter table public.fossa_election_ballots enable row level security;
alter table public.fossa_election_audit_logs enable row level security;
revoke all on public.fossa_elections, public.fossa_election_cohorts, public.fossa_election_posts,
  public.fossa_election_candidates, public.fossa_election_participation,
  public.fossa_election_ballots, public.fossa_election_audit_logs from anon, authenticated;
grant all on public.fossa_elections, public.fossa_election_cohorts, public.fossa_election_posts,
  public.fossa_election_candidates, public.fossa_election_participation,
  public.fossa_election_ballots, public.fossa_election_audit_logs to service_role;
create or replace function public.fossa_cast_election_vote(
  p_election_id uuid, p_post_id uuid, p_candidate_id uuid, p_voter_id uuid
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  election_row public.fossa_elections%rowtype;
  student_row public.fossa_academic_students%rowtype;
begin
  select * into election_row from public.fossa_elections where id = p_election_id for share;
  if not found or election_row.status <> 'published' or now() < election_row.voting_starts_at or now() >= election_row.voting_ends_at then
    raise exception 'Voting is not open for this election.' using errcode = 'P0001';
  end if;
  select * into student_row from public.fossa_academic_students where user_id = p_voter_id;
  if not found then raise exception 'A verified student department and level record is required.' using errcode = 'P0001'; end if;
  if not exists (
    select 1 from public.fossa_election_cohorts c
    where c.election_id = p_election_id
      and lower(trim(c.department)) = lower(trim(student_row.department))
      and c.level = student_row.level
  ) then raise exception 'You are not eligible to vote in this election.' using errcode = 'P0001'; end if;
  if not exists (
    select 1 from public.fossa_election_posts p where p.id = p_post_id and p.election_id = p_election_id
  ) then raise exception 'Invalid election post.' using errcode = 'P0001'; end if;
  if not exists (
    select 1 from public.fossa_election_candidates c
    where c.id = p_candidate_id and c.post_id = p_post_id
      and c.election_id = p_election_id and c.status = 'approved'
  ) then raise exception 'Candidate is not approved for this post.' using errcode = 'P0001'; end if;
  insert into public.fossa_election_participation(election_id, post_id, voter_id)
  values (p_election_id, p_post_id, p_voter_id);
  insert into public.fossa_election_ballots(election_id, post_id, candidate_id)
  values (p_election_id, p_post_id, p_candidate_id);
end;
$$;
revoke all on function public.fossa_cast_election_vote(uuid,uuid,uuid,uuid) from public, anon, authenticated;
grant execute on function public.fossa_cast_election_vote(uuid,uuid,uuid,uuid) to service_role;
