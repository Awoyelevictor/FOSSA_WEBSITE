import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => res.status(status).json(body);
const TYPES = new Set(['announcements', 'events', 'resources', 'gallery', 'site-content']);

export default async function publicContentHandler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed.' });
  const type = String(req.query?.type || new URL(req.url, 'http://localhost').searchParams.get('type') || '').trim();
  if (!TYPES.has(type)) return send(res, 400, { error: 'Choose a valid content type.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'Published content is not configured on the server yet.' });
  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await db.from('fossa_content_items')
      .select('id,content_type,payload,published,created_at,updated_at')
      .eq('content_type', type).eq('published', true).order('updated_at', { ascending: false });
    if (error) throw error;
    return send(res, 200, { items: (data || []).map(item => ({ id: item.id, ...item.payload, payload: item.payload, created_at: item.created_at, updated_at: item.updated_at })) });
  } catch (error) {
    console.error('Published FOSSA content read failed:', error?.message || error);
    return send(res, 500, { error: 'Could not load published content right now.' });
  }
}
