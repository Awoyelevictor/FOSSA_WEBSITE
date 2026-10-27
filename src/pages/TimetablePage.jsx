import React, { useEffect, useMemo, useState } from 'react';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

const STORAGE_KEY = 'fossa_personal_timetable_v1';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const emptyForm = { course: '', day: 'Monday', start: '09:00', end: '10:00', venue: '' };

function readSchedule() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export const TimetablePage = () => {
  const [classes, setClasses] = useState(readSchedule);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(classes)); }
    catch { setError('This browser could not save your timetable. Check device storage settings.'); }
  }, [classes]);

  const grouped = useMemo(() => DAYS.map(day => ({
    day,
    classes: classes.filter(item => item.day === day).sort((a, b) => a.start.localeCompare(b.start))
  })), [classes]);

  const addClass = (event) => {
    event.preventDefault();
    setError('');
    setSaved(false);
    if (!form.course.trim()) return setError('Enter a course code or course title.');
    if (form.start >= form.end) return setError('The end time must be later than the start time.');
    const clash = classes.some(item => item.day === form.day && form.start < item.end && form.end > item.start);
    if (clash) return setError('This class overlaps another class on the selected day.');
    setClasses(current => [...current, { ...form, course: form.course.trim(), venue: form.venue.trim(), id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }]);
    setForm(emptyForm);
    setSaved(true);
  };

  const removeClass = (id) => setClasses(current => current.filter(item => item.id !== id));

  return (
    <div className="mx-auto w-full max-w-5xl pb-10 text-left">
      <AnimateIn direction="down" className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Timetable" /></h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Build and manage your personal weekly class timetable. Your entries are saved in this browser on this device.</p>
      </AnimateIn>
      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
        <h2 className="mb-4 text-base font-bold text-slate-900 dark:text-white">Add a class</h2>
        <form onSubmit={addClass} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="text-xs font-bold text-slate-500">Course code or title
            <input required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} placeholder="e.g. CSC 401" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-bold text-slate-500">Day
            <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">{DAYS.map(day => <option key={day}>{day}</option>)}</select>
          </label>
          <label className="text-xs font-bold text-slate-500">Venue (optional)
            <input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} placeholder="Lecture hall / lab" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-bold text-slate-500">Start time
            <input type="time" required value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <label className="text-xs font-bold text-slate-500">End time
            <input type="time" required value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </label>
          <button className="self-end rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">Add to timetable</button>
        </form>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
        {saved && <p role="status" className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Class added and saved on this device.</p>}
      </section>
      <section className="space-y-4">
        {grouped.map(({ day, classes: dayClasses }) => <div key={day} className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-slate-900 dark:text-white">{day}</h2><span className="text-xs text-slate-400">{dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}</span></div>
          {dayClasses.length ? <div className="space-y-2">{dayClasses.map(item => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60"><div><p className="font-bold text-slate-900 dark:text-white">{item.course}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.start}–{item.end}{item.venue ? ` · ${item.venue}` : ''}</p></div><button onClick={() => removeClass(item.id)} className="rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40">Remove</button></div>)}</div> : <p className="py-2 text-sm text-slate-400">No classes added for this day.</p>}
        </div>)}
        {classes.length > 0 && <button onClick={() => { if (window.confirm('Clear your entire timetable?')) setClasses([]); }} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">Clear timetable</button>}
      </section>
    </div>
  );
};
