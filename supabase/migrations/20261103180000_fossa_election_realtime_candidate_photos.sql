-- Candidate headshots and lightweight public election score notifications.
alter table public.fossa_election_candidates
  add column if not exists photo_path text;

create or replace function public.fossa_broadcast_election_score_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform realtime.send(
    jsonb_build_object('post_id', NEW.post_id),
    'score_update',
    'fossa-election:' || NEW.election_id::text,
    false
  );
  return NEW;
end;
$$;

revoke all on function public.fossa_broadcast_election_score_update() from public, anon, authenticated;

drop trigger if exists fossa_election_score_broadcast on public.fossa_election_ballots;
create trigger fossa_election_score_broadcast
after insert on public.fossa_election_ballots
for each row execute function public.fossa_broadcast_election_score_update();
