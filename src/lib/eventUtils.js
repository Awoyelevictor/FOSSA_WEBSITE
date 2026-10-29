export function parseEventDate(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const timestamp = new Date(value).getTime();
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
  return timestamp === null ? (value ? String(value) : 'Date to be announced') : new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}
