import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from '../components/animate-ui/icons/bell';
import { getPublishedContent } from '../lib/publicContent';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('All Notices');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const tabs = ['All Notices', 'Important', 'General'];

  useEffect(() => {
    let active = true;
    getPublishedContent('announcements')
      .then(items => { if (active) setAnnouncements(items); })
      .catch(err => { if (active) setError(err.message || 'Could not load notices.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = announcements.filter(item => {
    const type = String(item.type || item.category || 'general').toLowerCase();
    if (activeTab === 'Important') return type.includes('important');
    if (activeTab === 'General') return !type.includes('important');
    return true;
  });

  return <div className="mx-auto w-full max-w-5xl pb-10 text-left">
    <AnimateIn direction="down" className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Notices & Announcements" /></h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Official updates published for the FOSSA community.</p>
      <Link to="/elections" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"><span aria-hidden="true">●</span> Election centre · Live scores</Link>
    </AnimateIn>
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-100 pb-3 dark:border-slate-800">{tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{tab}</button>)}</div>
      {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading published notices…</p> : error ? <div role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{error}</div> : filtered.length ? <div className="divide-y divide-slate-100 dark:divide-slate-800">{filtered.map((item, index) => <article key={item.id || index} className="flex gap-4 py-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"><Bell className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-slate-900 dark:text-white">{item.title || 'FOSSA Notice'}</h2>{String(item.type || item.category || '').toLowerCase().includes('important') && <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-extrabold uppercase text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Important</span>}</div><p className="mt-1 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{item.description || item.message || 'Please check the notice details.'}</p><p className="mt-2 text-xs font-semibold text-slate-400">{item.date || (item.created_at ? new Date(item.created_at).toLocaleDateString() : '')}</p></div></article>)}</div> : <div className="py-12 text-center"><p className="font-semibold text-slate-700 dark:text-slate-300">No notices have been published yet.</p><p className="mt-1 text-sm text-slate-400">New notices will appear here after an administrator publishes them.</p></div>}
    </section>
  </div>;
};
