import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, UserRound, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/adminApi';
import { getEvents, setEventRegistration } from '../lib/eventsApi';
import { eventDateLabel, filterEventsByTab } from '../lib/eventUtils';
import { AnimateIn } from '../components/AnimateLoad';

export const PublicEventsPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [viewerRole, setViewerRole] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('All Events');
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
      setViewerRole(result.viewerRole);
    } catch (e) {
      setError(e.message || 'Could not load events.');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { load(); }, [load]);

  const register = async event => {
    if (!session?.access_token) {
      navigate('/login');
      return;
    }
    if (viewerRole !== 'student') {
      setError('Sign in with an approved student account to register for events.');
      return;
    }
    setSavingId(event.id);
    setError('');
    setNotice('');
    try {
      await setEventRegistration(event.id, !event.registered, session);
      setEvents(current => current.map(item => item.id === event.id ? { ...item, registered: !event.registered } : item));
      setNotice(event.registered ? 'Your event registration was cancelled.' : 'You are registered for this event.');
    } catch (e) {
      setError(e.message || 'Could not update your registration.');
    } finally {
      setSavingId('');
    }
  };

  const visible = filterEventsByTab(events, tab).filter(event =>
    [event.title, event.category, event.description, event.venue].filter(Boolean).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6">
    <AnimateIn direction="down" className="mb-8">
      <header className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white md:p-9">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-200">FOSSA · Campus life</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Campus events</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100/80">Browse official events published by the association. Student registrations are saved to your account.</p>
      </header>
    </AnimateIn>

    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search events, categories or venues…" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"/></label>
      <div className="flex gap-2 overflow-x-auto">{['All Events','My Registrations','Past Events'].map(value => <button key={value} onClick={() => setTab(value)} className={'whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold '+(tab===value?'bg-indigo-600 text-white':'border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300')}>{value}</button>)}</div>
    </div>

    {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
    {notice && <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</p>}
    {loading ? <p className="py-16 text-center text-sm text-slate-500">Loading published events…</p> :
      visible.length ? <div className="grid gap-5 md:grid-cols-2">
        {visible.map(event => <article key={event.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
            <img src={event.image || '/logo.png'} alt={event.title || 'FOSSA event'} loading="lazy" className="h-full w-full object-cover" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.png'; }}/>
            {event.category && <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700">{event.category}</span>}
          </div>
          <div className="p-5 md:p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">{event.title || 'FOSSA event'}</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{event.description || 'More details will be announced soon.'}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <p className="flex items-start gap-2"><Calendar size={16} className="mt-0.5 shrink-0"/>{eventDateLabel(event.date)}</p>
              {event.time && <p className="flex items-start gap-2"><Clock size={16} className="mt-0.5 shrink-0"/>{event.time}</p>}
              {event.venue && <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0"/>{event.venue}</p>}
              {event.speakers && <p className="flex items-start gap-2"><UserRound size={16} className="mt-0.5 shrink-0"/>{Array.isArray(event.speakers) ? event.speakers.join(', ') : event.speakers}</p>}
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              {viewerRole === 'student' ? <button disabled={savingId===event.id} onClick={() => register(event)} className={'w-full rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-60 '+(event.registered?'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300':'bg-indigo-600 text-white hover:bg-indigo-700')}>{savingId===event.id?'Saving…':event.registered?'Cancel registration':'Register for event'}</button> :
                <button onClick={() => register(event)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">{session ? 'Student sign-in required' : 'Sign in to register'}<ArrowUpRight size={16}/></button>}
            </div>
          </div>
        </article>)}
      </div> : <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700"><Calendar className="mx-auto mb-3 text-slate-400" size={34}/><h2 className="font-bold text-slate-700 dark:text-slate-200">{tab==='My Registrations'?'You have no event registrations yet':tab==='Past Events'?'No past events found':'No published events yet'}</h2><p className="mt-1 text-sm text-slate-500">Published events added by FOSSA administrators will appear here.</p>{searchTerm&&<button onClick={()=>setSearchTerm('')} className="mt-3 text-sm font-bold text-indigo-600">Clear search</button>}</div>}
  </main>;
};
