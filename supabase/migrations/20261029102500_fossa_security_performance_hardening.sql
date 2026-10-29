-- Production hardening: remove unnecessary FK scans and restrict the auth bootstrap trigger function.
create index if not exists fossa_course_registrations_course_idx
  on public.fossa_course_registrations(course_id);
create index if not exists fossa_course_results_course_idx
  on public.fossa_course_results(course_id);

create index if not exists fossa_elections_created_by_idx
  on public.fossa_elections(created_by);
create index if not exists fossa_election_candidates_election_idx
  on public.fossa_election_candidates(election_id);
create index if not exists fossa_election_candidates_student_idx
  on public.fossa_election_candidates(student_id);
create index if not exists fossa_election_candidates_reviewed_by_idx
  on public.fossa_election_candidates(reviewed_by);
create index if not exists fossa_election_ballots_post_candidate_idx
  on public.fossa_election_ballots(post_id, candidate_id);
create index if not exists fossa_election_ballots_candidate_post_idx
  on public.fossa_election_ballots(candidate_id, post_id);
create index if not exists fossa_election_participation_post_idx
  on public.fossa_election_participation(post_id);
create index if not exists fossa_election_audit_election_idx
  on public.fossa_election_audit_logs(election_id);
create index if not exists fossa_election_audit_actor_idx
  on public.fossa_election_audit_logs(actor_id);
create index if not exists fossa_level_advisors_assigned_by_idx
  on public.fossa_level_advisors(assigned_by);

alter table public.fossa_elections alter column show_live_scores set default false;

-- The auth.users trigger remains owned by the database owner. Prevent direct invocation
-- through exposed PostgREST roles; trigger execution does not require these roles to call it.
revoke all on function public.fossa_bootstrap_auth_user() from public, anon, authenticated;
