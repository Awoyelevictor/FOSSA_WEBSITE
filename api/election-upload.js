import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

const BUCKET = 'fossa-academic-files';
const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const send = (res, status, body) => res.status(status).json(body);

export default async function electionUploadHandler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'Candidate photo uploads are not configured.' });
  const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
  if (!token) return send(res, 401, { error: 'Sign in to upload a candidate photo.' });
  const type = String(req.headers['content-type'] || '').split(';')[0].toLowerCase();
  if (!TYPES.has(type)) return send(res, 415, { error: 'Use a JPG, PNG, or WebP image.' });
  if (Number(req.headers['content-length'] || 0) > MAX_BYTES) return send(res, 413, { error: 'Candidate photos must be 3 MB or smaller.' });
  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: auth, error: authError } = await db.auth.getUser(token);
    if (authError || !auth?.user) return send(res, 401, { error: 'Your session has expired. Sign in again.' });
    const { data: role, error: roleError } = await db.from('fossa_user_roles').select('role').eq('user_id', auth.user.id).maybeSingle();
    if (roleError) throw roleError;
    if (role?.role !== 'student') return send(res, 403, { error: 'Only student accounts can upload candidate photos.' });
    const chunks = [];
    let total = 0;
    for await (const chunk of req) {
      total += chunk.length;
      if (total > MAX_BYTES) return send(res, 413, { error: 'Candidate photos must be 3 MB or smaller.' });
      chunks.push(chunk);
    }
    if (!total) return send(res, 400, { error: 'Choose a photo first.' });
    const ext = type === 'image/jpeg' ? 'jpg' : type.split('/')[1];
    const objectPath = auth.user.id + '/election-candidates/' + randomUUID() + '.' + ext;
    const { error: uploadError } = await db.storage.from(BUCKET).upload(objectPath, Buffer.concat(chunks), { contentType: type, cacheControl: '3600', upsert: false });
    if (uploadError) throw uploadError;
    return send(res, 201, { path: objectPath });
  } catch (error) {
    console.error('Candidate photo upload failed:', error?.message || error);
    return send(res, 500, { error: 'Could not save the candidate photo. Please try again.' });
  }
}
