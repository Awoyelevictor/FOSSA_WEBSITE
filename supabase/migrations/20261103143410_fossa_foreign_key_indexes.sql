-- Cover foreign-key lookups identified by the Supabase performance advisor.
-- These indexes do not change application data or access policies.
create index if not exists fossa_content_editor_access_granted_by_idx
  on public.fossa_content_editor_access (granted_by);
create index if not exists fossa_course_registrations_course_id_idx
  on public.fossa_course_registrations (course_id);
create index if not exists fossa_course_results_course_id_idx
  on public.fossa_course_results (course_id);
create index if not exists fossa_election_audit_logs_actor_id_idx
  on public.fossa_election_audit_logs (actor_id);
create index if not exists fossa_election_audit_logs_election_id_idx
  on public.fossa_election_audit_logs (election_id);
create index if not exists fossa_election_ballots_candidate_post_idx
  on public.fossa_election_ballots (candidate_id, post_id);
create index if not exists fossa_election_ballots_post_id_idx
  on public.fossa_election_ballots (post_id);
create index if not exists fossa_election_candidates_election_id_idx
  on public.fossa_election_candidates (election_id);
create index if not exists fossa_election_candidates_reviewed_by_idx
  on public.fossa_election_candidates (reviewed_by);
create index if not exists fossa_election_candidates_student_id_idx
  on public.fossa_election_candidates (student_id);
create index if not exists fossa_election_participation_post_id_idx
  on public.fossa_election_participation (post_id);
create index if not exists fossa_elections_created_by_idx
  on public.fossa_elections (created_by);
create index if not exists fossa_level_advisors_assigned_by_idx
  on public.fossa_level_advisors (assigned_by);
