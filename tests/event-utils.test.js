import test from 'node:test';
import assert from 'node:assert/strict';
import { eventDateLabel, filterEventsByTab, parseEventDate } from '../src/lib/eventUtils.js';

test('parseEventDate handles valid dates and unknown labels', () => {
  assert.equal(parseEventDate('2026-12-01T12:00:00Z'), Date.parse('2026-12-01T12:00:00Z'));
  assert.equal(parseEventDate('Date to be announced'), null);
  assert.equal(parseEventDate('October 29, 2026'), Date.parse('2026-10-29T23:59:59.999Z'));
  assert.equal(parseEventDate(''), null);
});

test('filterEventsByTab separates upcoming, registered and past events', () => {
  const now = Date.parse('2026-10-29T12:00:00Z');
  const events = [
    { id: 'past', date: '2026-10-01T10:00:00Z', registered: false },
    { id: 'future', date: '2026-11-01T10:00:00Z', registered: true },
    { id: 'unknown', date: 'Date to be announced', registered: false }
  ];
  assert.deepEqual(filterEventsByTab(events, 'Past Events', now).map(e => e.id), ['past']);
  assert.deepEqual(filterEventsByTab(events, 'My Registrations', now).map(e => e.id), ['future']);
  assert.deepEqual(filterEventsByTab(events, 'All Events', now).map(e => e.id), ['future', 'unknown']);
});

test('eventDateLabel safely handles an unset date', () => {
  assert.equal(eventDateLabel(''), 'Date to be announced');
});
