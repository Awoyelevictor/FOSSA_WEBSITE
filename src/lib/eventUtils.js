export function parseEventDate(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const text = String(value).trim();
  // Date-only values represent the whole calendar day, not midnight at its start.
  const timestamp = /^\\d{4}-\\d{2}-\\d{2}$/.test(text)
    ? new Date(text + 'T23:59:59.999Z').getTime()
    : new Date(text).getTime();
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
  if (/^\\d{4}-\\d{2}-\\d{2}$/.test(String(value).trim())) return new Date(value + 'T12:00:00Z').toLocaleDateString([], { dateStyle: 'medium' });
  return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}
