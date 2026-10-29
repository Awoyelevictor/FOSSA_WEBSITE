export function parseEventDate(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const text = String(value).trim();
  // Date-only values represent the whole calendar day, not midnight at its start.
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;
  const hasExplicitTime = /(?:T\d{2}:?\d{2}|\b\d{1,2}:\d{2}\b)/i.test(text);
  if (!hasExplicitTime) parsed.setUTCHours(23, 59, 59, 999);
  const timestamp = parsed.getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function filterEventsByTab(events, tab, now = Date.now()) {
  if (tab === 'My Registrations') return events.filter(event => event.registered === true);
  if (tab === 'Past Events') return events.filter(event => {
    const timestamp = parseEventDate(event.date);
    return timestamp !== null && timestamp < now;
  });
  return events.filter(event => {
    const timestamp = parseEventDate(event.date);
    return timestamp === null || timestamp >= now;
  });
}

export function eventDateLabel(value) {
  const timestamp = parseEventDate(value);
  if (timestamp === null) return value ? String(value) : 'Date to be announced';
  if (!/(?:T\d{2}:?\d{2}|\b\d{1,2}:\d{2}\b)/i.test(String(value).trim())) return new Date(timestamp).toLocaleDateString([], { dateStyle: 'medium' });
  return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}
