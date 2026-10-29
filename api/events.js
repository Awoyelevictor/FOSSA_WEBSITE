import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => res.status(status).json(body);
const clean = value => String(value ?? '').trim();

export default async function eventsHandler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!['GET', 'POST', 'DELETE'].includes(req.method)) return send(res, 405, { error: 'Method not allowed.' });

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 503, { error: 'Events are not configured on the server.' });

  try {
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const token = (req.headers.authorization || '').startsWith('Bearer ')
      ? req.headers.authorization.slice(7) : '';
    let user = null;
    let role = null;

    if (token) {
      const { data, error } = await db.auth.getUser(token);
      if (error || !data?.user) return send(res, 401, { error: 'Session invalid or expired. Sign in again.' });
      user = data.user;
      const { data: profile, error: roleError } = await db.from('fossa_user_roles')
        .select('role').eq('user_id', user.id).maybeSingle();
      if (roleError) throw roleError;
      role = profile?.role || null;
    }

    if (req.method === 'GET') {
      const { data, error } = await db.from('fossa_content_items')
        .select('id,payload,created_at,updated_at')
        .eq('content_type', 'events').eq('published', true)
        .order('updated_at', { ascending: false });
      if (error) throw error;

      let registeredIds = [];
      if (user && role === 'student') {
        const { data: registrations, error: registrationError } = await db.from('fossa_event_registrations')
          .select('event_id').eq('user_id', user.id);
        if (registrationError) throw registrationError;
        registeredIds = (registrations || []).map(item => item.event_id);
      }

      const registeredSet = new Set(registeredIds);
      const items = (data || []).map(item => ({
        id: item.id,
        ...(item.payload || {}),
        payload: item.payload || {},
        created_at: item.created_at,
        updated_at: item.updated_at,
        registered: registeredSet.has(item.id)
      }));
      return send(res, 200, { items, viewerRole: role, registeredIds });
    }

    if (!user) return send(res, 401, { error: 'Sign in to register for an event.' });
    if (role !== 'student') return send(res, 403, { error: 'Only student accounts can register for events.' });

    const eventId = clean(req.body?.eventId || new URL(req.url, 'http://localhost').searchParams.get('eventId'));
    if (!eventId) return send(res, 400, { error: 'Choose a valid event.' });

    const { data: event, error: eventError } = await db.from('fossa_content_items')
      .select('id,payload').eq('id', eventId).eq('content_type', 'events').eq('published', true).maybeSingle();
    if (eventError) throw eventError;
    if (!event) return send(res, 404, { error: 'This event is no longer published.' });

    if (req.method === 'POST') {
      const dateValue = event.payload?.date;
      if (dateValue) {
        const textDate = String(dateValue).trim();
        const parsed = new Date(textDate);
        const hasExplicitTime = /(?:T|\b\d{1,2}:\d{2}\b)/i.test(textDate);
        if (!Number.isNaN(parsed.getTime()) && !hasExplicitTime) parsed.setUTCHours(23, 59, 59, 999);
        const parsedDate = parsed.getTime();
        if (Number.isFinite(parsedDate) && parsedDate < Date.now()) {
          return send(res, 409, { error: 'Registration is closed because this event has already passed.' });
        }
      }
      const { error } = await db.from('fossa_event_registrations').insert({ event_id: eventId, user_id: user.id });
      if (error?.code === '23505') return send(res, 409, { error: 'You are already registered for this event.' });
      if (error) throw error;
      return send(res, 201, { success: true, registered: true, eventId });
    }

    const { error } = await db.from('fossa_event_registrations')
      .delete().eq('event_id', eventId).eq('user_id', user.id);
    if (error) throw error;
    return send(res, 200, { success: true, registered: false, eventId });
  } catch (error) {
    console.error('FOSSA events API failure:', error?.message || error);
    return send(res, 500, { error: 'Could not complete this event request. Please try again.' });
  }
}
