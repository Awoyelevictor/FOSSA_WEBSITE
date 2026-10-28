import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => res.status(status).json(body);
const levels = new Set([100, 200, 300, 400, 500, 600]);
const SUPER_ADMIN_EMAIL = 'fossaadelekeuniversity@gmail.com';
const clean = value => String(value ?? '').trim();
const parseDate = value => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

export default async function electionsHandler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!['GET', 'POST', 'PATCH'].includes(req.method)) return send(res, 405, { error: 'Method not allowed.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'Election services are not configured on the server.' });
  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
    let actor = null;
    let profile = null;
    if (token) {
      const { data, error } = await db.auth.getUser(token);
      if (error || !data?.user) return send(res, 401, { error: 'Session invalid or expired. Sign in again.' });
      actor = data.user;
      const { data: role, error: roleError } = await db.from('fossa_user_roles').select('role,display_name').eq('user_id', actor.id).maybeSingle();
      if (roleError) throw roleError;
      profile = role;
      if (profile?.role === 'super_admin' && clean(actor.email).toLowerCase() !== SUPER_ADMIN_EMAIL) {
        return send(res, 403, { error: 'Super Admin access is restricted to the designated FOSSA account.' });
      }
    }
    const pathname = new URL(req.url, 'http://localhost').pathname.replace(/^\/api\/elections\/?/, '');
    const parts = pathname.split('/').filter(Boolean);
    const [electionId, action, subId, subAction] = parts;
    const admin = ['admin', 'super_admin'].includes(profile?.role);
    const audit = async (id, actionName, details = {}) => {
      const { error } = await db.from('fossa_election_audit_logs').insert({
        election_id: id || null, actor_id: actor?.id || null, action: actionName, details
      });
      if (error) console.error('Election audit write failed:', error.message);
    };
    const student = async () => {
      if (!actor) throw Object.assign(new Error('Sign in to continue.'), { status: 401 });
      if (profile?.role !== 'student') throw Object.assign(new Error('Only student accounts can use this action.'), { status: 403 });
      const { data, error } = await db.from('fossa_academic_students').select('user_id,department,level').eq('user_id', actor.id).maybeSingle();
      if (error) throw error;
      if (!data) throw Object.assign(new Error('Your verified department and level are missing. Contact FOSSA administration.'), { status: 403 });
      return data;
    };
    const eligible = async (id, s) => {
      const { data, error } = await db.from('fossa_election_cohorts').select('department,level').eq('election_id', id);
      if (error) throw error;
      return (data || []).some(c => clean(c.department).toLowerCase() === clean(s.department).toLowerCase() && Number(c.level) === Number(s.level));
    };
    const finalize = async election => {
      if (election.status !== 'published' || new Date(election.voting_ends_at).getTime() > Date.now()) return election;
      const { data: posts, error } = await db.from('fossa_election_posts').select('id').eq('election_id', election.id);
      if (error) throw error;
      for (const post of posts || []) {
        const { data: candidates, error: candidateError } = await db.from('fossa_election_candidates').select('id').eq('post_id', post.id).eq('status', 'approved');
        if (candidateError) throw candidateError;
        for (const candidate of candidates || []) {
          const { count, error: countError } = await db.from('fossa_election_ballots').select('id', { count: 'exact', head: true }).eq('post_id', post.id).eq('candidate_id', candidate.id);
          if (countError) throw countError;
          if (!Number.isInteger(count) || count < 0) throw new Error('Final tally validation failed.');
        }
      }
      const { data: updated, error: updateError } = await db.from('fossa_elections').update({ status: 'results_published', results_published_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', election.id).eq('status', 'published').select('*').maybeSingle();
      if (updateError) throw updateError;
      if (updated) await audit(election.id, 'results_auto_published', { reason: 'Voting deadline reached; tally validated.' });
      return updated || election;
    };
    const loadElection = async id => {
      const { data, error } = await db.from('fossa_elections').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    };
    const publicElection = async row => {
      const { data: posts, error: postError } = await db.from('fossa_election_posts').select('id,election_id,title,description').eq('election_id', row.id).order('created_at');
      if (postError) throw postError;
      const shaped = [];
      for (const post of posts || []) {
        const { data: candidates, error: candidateError } = await db.from('fossa_election_candidates')
          .select('id,election_id,post_id,manifesto,status,created_at,student_id')
          .eq('post_id', post.id).eq('status', 'approved').order('created_at');
        if (candidateError) throw candidateError;
        const safeCandidates = [];
        for (const candidate of candidates || []) {
          const { data: role } = await db.from('fossa_user_roles').select('display_name').eq('user_id', candidate.student_id).maybeSingle();
          const { count, error: tallyError } = await db.from('fossa_election_ballots').select('id', { count: 'exact', head: true }).eq('post_id', post.id).eq('candidate_id', candidate.id);
          if (tallyError) throw tallyError;
          safeCandidates.push({
            id: candidate.id, manifesto: candidate.manifesto, display_name: role?.display_name || 'Approved candidate',
            votes: row.show_live_scores || row.status === 'results_published' ? (count || 0) : null
          });
        }
        const { count: totalVotes, error: totalError } = await db.from('fossa_election_ballots').select('id', { count: 'exact', head: true }).eq('post_id', post.id);
        if (totalError) throw totalError;
        shaped.push({ ...post, candidates: safeCandidates, totalVotes: row.show_live_scores || row.status === 'results_published' ? (totalVotes || 0) : null });
      }
      return { ...row, posts: shaped };
    };

    if (req.method === 'GET' && !electionId) {
      const query = db.from('fossa_elections').select('id,title,description,status,registration_starts_at,registration_ends_at,voting_starts_at,voting_ends_at,show_live_scores,published_at,results_published_at,created_at').order('created_at', { ascending: false });
      const { data, error } = admin ? await query : await query.in('status', ['published', 'results_published']);
      if (error) throw error;
      const elections = [];
      for (const item of data || []) {
        const row = await finalize(item);
        elections.push(await publicElection(row));
      }
      return send(res, 200, { elections });
    }
    if (!electionId) {
      if (req.method !== 'POST' || !admin) return send(res, 403, { error: 'Only administrators can create elections.' });
      const body = req.body || {};
      const title = clean(body.title), description = clean(body.description);
      const registrationStarts = parseDate(body.registrationStartsAt), registrationEnds = parseDate(body.registrationEndsAt);
      const votingStarts = parseDate(body.votingStartsAt), votingEnds = parseDate(body.votingEndsAt);
      const cohorts = Array.isArray(body.cohorts) ? body.cohorts : [];
      if (title.length < 3 || title.length > 160 || !registrationStarts || !registrationEnds || !votingStarts || !votingEnds ||
          !(registrationStarts < registrationEnds && registrationEnds <= votingStarts && votingStarts < votingEnds) || !cohorts.length) {
        return send(res, 400, { error: 'Enter a title, valid ordered deadlines, and at least one eligible department/level.' });
      }
      const normalizedCohorts = cohorts.filter(c => clean(c.department) && levels.has(Number(c.level)))
        .map(c => ({ department: clean(c.department), level: Number(c.level) }));
      if (!normalizedCohorts.length) return send(res, 400, { error: 'Choose at least one valid department and level.' });
      const { data: election, error } = await db.from('fossa_elections').insert({
        title, description, status: 'draft', registration_starts_at: registrationStarts, registration_ends_at: registrationEnds,
        voting_starts_at: votingStarts, voting_ends_at: votingEnds, show_live_scores: body.showLiveScores !== false, created_by: actor.id
      }).select('*').single();
      if (error) throw error;
      const { error: cohortError } = await db.from('fossa_election_cohorts').insert(normalizedCohorts.map(c => ({ election_id: election.id, ...c })));
      if (cohortError) { await db.from('fossa_elections').delete().eq('id', election.id); throw cohortError; }
      await audit(election.id, 'election_created', { title, cohorts: normalizedCohorts });
      return send(res, 201, { election });
    }
    const election = await loadElection(electionId);
    if (!election) return send(res, 404, { error: 'Election not found.' });
    if (req.method === 'GET') {
      if (election.status === 'draft' && !admin) return send(res, 404, { error: 'Election not found.' });
      const row = await finalize(election);
      const shaped = await publicElection(row);
      if (actor && profile?.role === 'student') {
        const s = await student();
        shaped.viewerEligible = await eligible(electionId, s);
        if (shaped.viewerEligible) {
          const { data: posts } = await db.from('fossa_election_posts').select('id').eq('election_id', electionId);
          const participation = [];
          for (const post of posts || []) {
            const { data: record } = await db.from('fossa_election_participation').select('post_id').eq('election_id', electionId).eq('post_id', post.id).eq('voter_id', actor.id).maybeSingle();
            if (record) participation.push(record.post_id);
          }
          shaped.viewerVotedPostIds = participation;
        }
      }
      if (admin) {
        const { data: cohorts } = await db.from('fossa_election_cohorts').select('department,level').eq('election_id', electionId);
        const { data: candidates } = await db.from('fossa_election_candidates').select('id,election_id,post_id,student_id,manifesto,status,review_note,created_at').eq('election_id', electionId).order('created_at');
        shaped.cohorts = cohorts || [];
        shaped.applications = [];
        for (const candidate of candidates || []) {
          const { data: role } = await db.from('fossa_user_roles').select('display_name,matric_number').eq('user_id', candidate.student_id).maybeSingle();
          shaped.applications.push({ ...candidate, display_name: role?.display_name || 'Student', matric_number: role?.matric_number || '' });
        }
      }
      return send(res, 200, { election: shaped });
    }
    if (!actor) return send(res, 401, { error: 'Sign in to continue.' });
    if (action === 'publish' && req.method === 'POST') {
      if (!admin) return send(res, 403, { error: 'Only admins can publish elections.' });
      if (election.status !== 'draft') return send(res, 409, { error: 'Only draft elections can be published.' });
      const { data: posts, error: postError } = await db.from('fossa_election_posts').select('id').eq('election_id', electionId);
      if (postError) throw postError;
      if (!posts?.length) return send(res, 400, { error: 'Add at least one post before publishing.' });
      const { data: updated, error } = await db.from('fossa_elections').update({ status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', electionId).eq('status', 'draft').select('*').single();
      if (error) throw error;
      await audit(electionId, 'election_published', {});
      return send(res, 200, { election: updated });
    }
    if (action === 'posts' && req.method === 'POST') {
      if (!admin || election.status !== 'draft') return send(res, 403, { error: 'Posts can only be configured by admins while the election is a draft.' });
      const title = clean(req.body?.title);
      if (title.length < 2 || title.length > 120) return send(res, 400, { error: 'Post title must be between 2 and 120 characters.' });
      const { data, error } = await db.from('fossa_election_posts').insert({ election_id: electionId, title, description: clean(req.body?.description) }).select('*').single();
      if (error) throw error;
      await audit(electionId, 'post_created', { title });
      return send(res, 201, { post: data });
    }
    if (action === 'candidates' && req.method === 'POST') {
      const s = await student();
      if (!await eligible(electionId, s)) return send(res, 403, { error: 'Your department and level are not eligible for this election.' });
      if (election.status !== 'published' || Date.now() < new Date(election.registration_starts_at).getTime() || Date.now() >= new Date(election.registration_ends_at).getTime()) {
        return send(res, 409, { error: 'Candidate registration is not open.' });
      }
      const postId = clean(req.body?.postId), manifesto = clean(req.body?.manifesto);
      if (!postId || manifesto.length > 5000) return send(res, 400, { error: 'Choose a post and keep the manifesto under 5,000 characters.' });
      const { data: post } = await db.from('fossa_election_posts').select('id').eq('id', postId).eq('election_id', electionId).maybeSingle();
      if (!post) return send(res, 400, { error: 'Choose a valid post for this election.' });
      const { data, error } = await db.from('fossa_election_candidates').insert({ election_id: electionId, post_id: postId, student_id: actor.id, manifesto }).select('id,status,created_at').single();
      if (error?.code === '23505') return send(res, 409, { error: 'You already applied for this post.' });
      if (error) throw error;
      await audit(electionId, 'candidate_application_submitted', { post_id: postId });
      return send(res, 201, { application: data });
    }
    if (action === 'candidates' && subAction === 'review' && req.method === 'PATCH') {
      if (!admin) return send(res, 403, { error: 'Only admins can review applications.' });
      if (election.status !== 'draft' && Date.now() >= new Date(election.voting_starts_at).getTime()) return send(res, 409, { error: 'Candidate decisions are frozen after voting begins.' });
      const status = clean(req.body?.status);
      if (!['approved', 'rejected'].includes(status)) return send(res, 400, { error: 'Choose approved or rejected.' });
      const { data, error } = await db.from('fossa_election_candidates').update({ status, reviewed_by: actor.id, reviewed_at: new Date().toISOString(), review_note: clean(req.body?.reviewNote).slice(0, 1000) }).eq('id', subId).eq('election_id', electionId).eq('status', 'pending').select('id,status,reviewed_at').maybeSingle();
      if (error) throw error;
      if (!data) return send(res, 409, { error: 'Application is no longer pending or does not exist.' });
      await audit(electionId, 'candidate_application_reviewed', { candidate_id: subId, status });
      return send(res, 200, { application: data });
    }
    if (action === 'vote' && req.method === 'POST') {
      const s = await student();
      if (!await eligible(electionId, s)) return send(res, 403, { error: 'Your department and level are not eligible to vote.' });
      const postId = clean(req.body?.postId), candidateId = clean(req.body?.candidateId);
      if (!postId || !candidateId) return send(res, 400, { error: 'Choose one approved candidate for a post.' });
      const { error } = await db.rpc('fossa_cast_election_vote', { p_election_id: electionId, p_post_id: postId, p_candidate_id: candidateId, p_voter_id: actor.id });
      if (error?.code === '23505') return send(res, 409, { error: 'Your vote for this post has already been recorded.' });
      if (error) {
        if (String(error.message || '').includes('Voting is not open')) return send(res, 409, { error: 'Voting is not open.' });
        if (String(error.message || '').includes('eligible')) return send(res, 403, { error: error.message });
        if (String(error.message || '').includes('Candidate is not approved')) return send(res, 400, { error: error.message });
        throw error;
      }
      await audit(electionId, 'vote_accepted', { post_id: postId });
      return send(res, 201, { success: true, message: 'Your vote has been recorded. Your selection remains secret.' });
    }
    return send(res, 404, { error: 'Election action not found.' });
  } catch (error) {
    console.error('FOSSA election request failed:', error?.message || error);
    return send(res, error.status || 500, { error: error.status ? error.message : 'Election request failed. Please try again.' });
  }
}
