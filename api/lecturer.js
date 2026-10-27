import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => res.status(status).json(body);
const allowedTypes = new Set(['resources', 'announcements']);
const allowedCategories = new Set(['Lecture Notes', 'Past Questions', 'Course Outlines', 'Other Academic Resource']);
const levels = new Set([100, 200, 300, 400, 500, 600]);

export default async function lecturerHandler(req, res) {
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) return send(res, 405, { error: 'Method not allowed.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'Lecturer tools are not configured on the server. Contact the FOSSA site administrator.' });

  const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
  if (!token) return send(res, 401, { error: 'Sign in to continue.' });

  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: auth, error: authError } = await db.auth.getUser(token);
    if (authError || !auth?.user) return send(res, 401, { error: 'Your session has expired. Please sign in again.' });
    const user = auth.user;
    const { data: profile, error: roleError } = await db.from('fossa_user_roles').select('role,display_name').eq('user_id', user.id).maybeSingle();
    if (roleError) {
      console.error('Lecturer role lookup failed:', roleError.message);
      return send(res, 503, { error: 'Could not verify your FOSSA role.' });
    }
    if (profile?.role !== 'lecturer') return send(res, 403, { error: 'This area is only available to approved lecturer accounts.' });

    if (req.method === 'GET') {
      const { data, error } = await db.from('fossa_content_items')
        .select('id,content_type,payload,published,created_at,updated_at')
        .eq('created_by', user.id)
        .in('content_type', ['resources', 'announcements'])
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return send(res, 200, { items: data || [], displayName: profile.display_name || user.user_metadata?.display_name || '' });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const contentType = body.kind === 'notice' ? 'announcements' : body.kind === 'material' ? 'resources' : '';
      const title = String(body.title || '').trim();
      const description = String(body.description || '').trim();
      const urlValue = String(body.url || '').trim();
      const category = String(body.category || '').trim();
      const courseCode = String(body.courseCode || '').trim();
      const department = String(body.department || '').trim();
      const level = body.level === '' || body.level == null ? null : Number(body.level);
      const year = String(body.year || '').trim();
      const fileName = String(body.fileName || '').trim().slice(0, 240);
      const filePath = String(body.filePath || '').trim().slice(0, 500);
      const fileSize = Number(body.fileSize || 0);
      const fileType = String(body.fileType || '').trim().slice(0, 160);

      if (!contentType || !title || title.length > 180) return send(res, 400, { error: 'Choose what you are submitting and enter a title (maximum 180 characters).' });
      if (description.length > 5000 || urlValue.length > 2000 || courseCode.length > 40 || department.length > 120) return send(res, 400, { error: 'One or more fields are too long.' });
      if (contentType === 'resources') {
        if (!allowedCategories.has(category)) return send(res, 400, { error: 'Choose a valid academic material type.' });
        if (!urlValue) return send(res, 400, { error: 'Add a file link before submitting. Upload your document to an approved file host and paste its share link here.' });
        let parsed;
        try { parsed = new URL(urlValue); } catch { return send(res, 400, { error: 'Enter a valid file URL.' }); }
        if (!['https:', 'http:'].includes(parsed.protocol)) return send(res, 400, { error: 'The file link must start with http:// or https://.' });
        if (level !== null && !levels.has(level)) return send(res, 400, { error: 'Choose a valid student level.' });
      }

      const payload = contentType === 'resources'
        ? { title, description, url: urlValue, file_name: fileName, file_path: filePath, file_size: fileSize, file_type: fileType, category, type: category, course_code: courseCode, course: courseCode, department, level: level || '', year, submitted_by: profile.display_name || user.user_metadata?.display_name || user.email || 'Lecturer' }
        : { title, description, message: description, category: 'Lecturer Notice', submitted_by: profile.display_name || user.user_metadata?.display_name || user.email || 'Lecturer' };

      const { data, error } = await db.from('fossa_content_items')
        .insert({ content_type: contentType, payload, published: false, created_by: user.id, updated_by: user.id })
        .select('id,content_type,payload,published,created_at,updated_at').single();
      if (error) throw error;
      await db.from('fossa_admin_audit_logs').insert({
        actor_id: user.id, actor_email: user.email, action: 'submit_for_review',
        entity_type: contentType, entity_id: data.id,
        details: { title, category: category || 'Lecturer Notice' }
      });
      return send(res, 201, { item: data, message: 'Submitted for administrator review. Students will see it after an administrator publishes it.' });
    }

    const id = String(req.body?.id || new URL(req.url, 'http://localhost').searchParams.get('id') || '').trim();
    if (!id) return send(res, 400, { error: 'Submission ID is required.' });
    const { data: existing, error: findError } = await db.from('fossa_content_items')
      .select('id,published,content_type').eq('id', id).eq('created_by', user.id).maybeSingle();
    if (findError) throw findError;
    if (!existing || !allowedTypes.has(existing.content_type)) return send(res, 404, { error: 'Submission not found.' });
    if (existing.published) return send(res, 409, { error: 'Published submissions cannot be deleted by lecturers. Contact an administrator if a correction is needed.' });
    const { error } = await db.from('fossa_content_items').delete().eq('id', id).eq('created_by', user.id).eq('published', false);
    if (error) throw error;
    return send(res, 200, { success: true });
  } catch (error) {
    console.error('FOSSA lecturer API error:', error?.message || error);
    return send(res, 500, { error: 'Could not complete this lecturer request. Please try again.' });
  }
}
