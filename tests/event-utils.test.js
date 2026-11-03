import test from 'node:test';
import assert from 'node:assert/strict';
import { eventDateLabel, filterEventsByTab, isEventPast, parseEventDate } from '../src/lib/eventUtils.js';

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

test('parseEventDate supports legacy Nigerian DD/MM/YY event dates', () => {
  const now = Date.parse('2026-11-03T12:00:00Z');
  assert.equal(parseEventDate('23/09/26'), Date.parse('2026-09-23T23:59:59.999Z'));
  assert.equal(isEventPast('23/09/26', now), true);
  assert.equal(isEventPast('23/12/26', now), false);
  assert.equal(parseEventDate('31/02/26'), null);
  assert.equal(eventDateLabel('23/09/26'), new Date('2026-09-23T23:59:59.999Z').toLocaleDateString([], { dateStyle: 'medium' }));
});
