export async function getEvents(session) {
  const response = await fetch('/api/events', {
    headers: session?.access_token ? { Authorization: 'Bearer ' + session.access_token } : {}
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Could not load events.');
  return { items: Array.isArray(payload.items) ? payload.items : [], viewerRole: payload.viewerRole || null };
}

export async function setEventRegistration(eventId, registered, session) {
  if (!session?.access_token) throw new Error('Sign in to register for an event.');
  const response = await fetch('/api/events', {
    method: registered ? 'POST' : 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
    body: JSON.stringify({ eventId })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Could not update event registration.');
  return payload;
}
