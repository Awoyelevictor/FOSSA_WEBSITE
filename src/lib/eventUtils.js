function parseDateParts(value) {
  const text = String(value ?? '').trim();
  if (!text) return null;
  // Existing FOSSA records use DD/MM/YY; support DD/MM/YYYY and optional time too.
  const parts = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (parts) {
    const day = Number(parts[1]), month = Number(parts[2]);
    const year = Number(parts[3]) < 100 ? Number(parts[3]) + 2000 : Number(parts[3]);
    const hasTime = parts[4] !== undefined;
    const hour = hasTime ? Number(parts[4]) : 23;
    const minute = hasTime ? Number(parts[5]) : 59;
    const second = hasTime ? Number(parts[6] || 0) : 59;
    if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) return null;
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second, hasTime ? 0 : 999));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return date.getTime();
  }
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  const hasTime = /(?:T\d{2}:?\d{2}|\b\d{1,2}:\d{2}\b)/i.test(text);
  if (!hasTime) date.setUTCHours(23, 59, 59, 999);
  return date.getTime();
}
export function parseEventDate(value) { return parseDateParts(value); }
export function isEventPast(value, now = Date.now()) {
  const timestamp = parseDateParts(value);
  return timestamp !== null && timestamp < now;
}
export function filterEventsByTab(events, tab, now = Date.now()) {
  if (tab === 'My Registrations') return events.filter(event => event.registered === true);
  if (tab === 'Past Events') return events.filter(event => isEventPast(event.date, now));
  return events.filter(event => !isEventPast(event.date, now));
}
export function eventDateLabel(value) {
  const timestamp = parseDateParts(value);
  if (timestamp === null) return value ? String(value) : 'Date to be announced';
  const text = String(value).trim();
  const hasTime = /(?:T\d{2}:?\d{2}|\b\d{1,2}:\d{2}\b)/i.test(text);
  return hasTime
    ? new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : new Date(timestamp).toLocaleDateString([], { dateStyle: 'medium' });
}
