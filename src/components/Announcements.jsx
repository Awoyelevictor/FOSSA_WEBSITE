import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from './animate-ui/icons/bell';
import { getPublishedContent } from '../lib/publicContent';

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getPublishedContent('announcements').then(items => { if (active) setAnnouncements(items.slice(0, 3)); })
      .catch(err => { if (active) setError(err.message || 'Could not load notices.'); });
    return () => { active = false; };
  }, []);
  return <section className="flex h-full flex-col bg-transparent">
    <div className="mb-4 flex items-center justify-between px-1"><h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Latest Notices</h2><Link to="/dashboard/announcements" className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">View all</Link></div>
    <div className="flex flex-grow flex-col gap-2">
      {error ? <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">{error}</p> : announcements.length ? announcements.map((item, index) => <Link key={item.id || index} to="/dashboard/announcements" className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"><Bell className="h-4 w-4" /></div><div className="min-w-0 flex-1"><h3 className="truncate text-xs font-bold text-slate-900 dark:text-white">{item.title || 'FOSSA Notice'}</h3><p className="truncate text-[0.65rem] text-slate-500 dark:text-slate-400">{item.description || item.message || ''}</p></div></Link>) : <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900">No published notices yet.</div>}
    </div>
  </section>;
};
