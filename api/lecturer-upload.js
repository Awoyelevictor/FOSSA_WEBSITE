import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

const BUCKET = 'fossa-academic-files';
const MAX_BYTES = 20 * 1024 * 1024;
const extensionMime = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif',
  pdf: 'application/pdf', txt: 'text/plain', doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};
const allowedMime = new Set([
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);

const send = (res, status, body) => res.status(status).json(body);

export default async function lecturerUploadHandler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' });

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'File uploads are not configured on the server. Contact the FOSSA site administrator.' });

  const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
  if (!token) return send(res, 401, { error: 'Sign in to upload files.' });

  const rawName = String(req.headers['x-file-name'] || 'upload').slice(0, 240);
  let decodedName = rawName;
  try { decodedName = decodeURIComponent(rawName); } catch {}
  const extension = decodedName.split('.').pop()?.toLowerCase() || '';
  const requestedType = String(req.headers['content-type'] || '').split(';')[0].toLowerCase();
  const contentType = allowedMime.has(requestedType) ? requestedType : extensionMime[extension];
  if (!contentType || !allowedMime.has(contentType)) return send(res, 415, { error: 'Unsupported file type. Upload an image, PDF, Word, PowerPoint, Excel, or text file.' });

  const declaredLength = Number(req.headers['content-length'] || 0);
  if (declaredLength > MAX_BYTES) return send(res, 413, { error: 'Files must be 20 MB or smaller.' });

  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: auth, error: authError } = await db.auth.getUser(token);
    if (authError || !auth?.user) return send(res, 401, { error: 'Your session has expired. Please sign in again.' });

    const { data: profile, error: roleError } = await db.from('fossa_user_roles')
      .select('role').eq('user_id', auth.user.id).maybeSingle();
    if (roleError) {
      console.error('Lecturer upload role lookup failed:', roleError.message);
      return send(res, 503, { error: 'Could not verify your FOSSA role.' });
    }
    if (profile?.role !== 'lecturer') return send(res, 403, { error: 'Only approved lecturers can upload academic files.' });

    const chunks = [];
    let total = 0;
    for await (const chunk of req) {
      total += chunk.length;
      if (total > MAX_BYTES) return send(res, 413, { error: 'Files must be 20 MB or smaller.' });
      chunks.push(chunk);
    }
    if (!total) return send(res, 400, { error: 'Choose a file before uploading.' });

    const safeName = decodedName.normalize('NFKC').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(-100) || 'upload';
    const objectPath = auth.user.id + '/' + randomUUID() + '-' + safeName;
    const { error: uploadError } = await db.storage.from(BUCKET).upload(objectPath, Buffer.concat(chunks), {
      contentType,
      cacheControl: '3600',
      upsert: false
    });
    if (uploadError) {
      console.error('FOSSA storage upload failed:', uploadError.message);
      return send(res, 502, { error: 'The file could not be saved. Please try again.' });
    }

    const { data: publicData } = db.storage.from(BUCKET).getPublicUrl(objectPath);
    return send(res, 201, {
      url: publicData.publicUrl,
      path: objectPath,
      name: safeName,
      size: total,
      contentType
    });
  } catch (error) {
    console.error('FOSSA lecturer upload error:', error?.message || error);
    return send(res, 500, { error: 'Could not upload this file. Please try again.' });
  }
}
