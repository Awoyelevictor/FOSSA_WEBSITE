import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, MapPin, Search } from 'lucide-react';
import { supabase } from '../lib/adminApi';
import { getEvents, setEventRegistration } from '../lib/eventsApi';
import { eventDateLabel, filterEventsByTab } from '../lib/eventUtils';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const EventsPage = () => {
  const [session, setSession] = useState(null);
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState('All Events');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getEvents(session);
      setEvents(result.items);
    } catch (e) {
      setError(e.message || 'Could not load events.');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { load(); }, [load]);

  const register = async event => {
    if (!session?.access_token) { setError('Sign in again to manage event registrations.'); return; }
    setSavingId(event.id);
    setError('');
    setNotice('');
    try {
      await setEventRegistration(event.id, !event.registered, session);
      setEvents(current => current.map(item => item.id === event.id ? { ...item, registered: !event.registered } : item));
      setNotice(event.registered ? 'Your event registration was cancelled.' : 'You are registered for this event.');
    } catch (e) {
      setError(e.message || 'Could not update registration.');
    } finally {
      setSavingId('');
    }
  };

  const visible = filterEventsByTab(events, tab).filter(event =>
    [event.title, event.category, event.description, event.venue].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return <div className="mx-auto w-full max-w-5xl pb-10 text-left">
    <AnimateIn direction="down" className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Events"/></h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse official events and manage registrations saved to your account.</p>
    </AnimateIn>
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search events…" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"/></label>
        <div className="flex gap-2 overflow-x-auto">{['All Events','My Registrations','Past Events'].map(value=><button key={value} onClick={()=>setTab(value)} className={'whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold '+(tab===value?'bg-indigo-600 text-white':'border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300')}>{value}</button>)}</div>
      </div>
      {error&&<p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      {notice&&<p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</p>}
      {loading?<p className="py-12 text-center text-sm text-slate-500">Loading published events…</p>:visible.length?<div className="space-y-3">{visible.map(event=><article key={event.id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center">
        <img src={event.image||'/logo.png'} alt="" loading="lazy" className="h-28 w-full rounded-xl bg-slate-100 object-cover sm:w-36" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/logo.png';}}/>
        <div className="min-w-0 flex-1"><h2 className="font-bold text-slate-900 dark:text-white">{event.title||'FOSSA event'}</h2><p className="mt-1 whitespace-pre-line text-sm text-slate-500 dark:text-slate-400">{event.description||'More details will be announced soon.'}</p><p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500"><CalendarDays size={14}/>{eventDateLabel(event.date)}{event.venue&&<><span>·</span><MapPin size={14}/>{event.venue}</>}</p></div>
        <button disabled={savingId===event.id} onClick={()=>register(event)} className={'shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-60 '+(event.registered?'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300':'bg-indigo-600 text-white hover:bg-indigo-700')}>{savingId===event.id?'Saving…':event.registered?'Cancel registration':'Register'}</button>
      </article>)}</div>:<div className="py-12 text-center"><CalendarDays className="mx-auto mb-3 text-slate-400" size={30}/><p className="font-semibold text-slate-700 dark:text-slate-300">{tab==='My Registrations'?'You have no registrations yet':tab==='Past Events'?'No past events found':'No published events yet'}</p><p className="mt-1 text-sm text-slate-400">Published events from the FOSSA admin console appear here.</p></div>}
    </section>
  </div>;
};
