import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList as FileText } from './animate-ui/icons/clipboard-list';
import { getPublishedContent } from '../lib/publicContent';

export const RecentlyAddedResources = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getPublishedContent('resources').then(items => { if (active) setResources(items.slice(0, 4)); })
      .catch(err => { if (active) setError(err.message || 'Could not load resources.'); });
    return () => { active = false; };
  }, []);
  return <section className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-6 flex items-center justify-between"><h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Recently Added Resources</h2><Link to="/dashboard/resources" className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">View all</Link></div>
    <div className="mb-6 flex flex-grow flex-col gap-3">
      {error ? <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{error}</p> : resources.length ? resources.map((resource, index) => <div key={resource.id || index} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/40"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm dark:bg-slate-700 dark:text-indigo-400"><FileText className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-900 dark:text-white">{resource.title || 'Academic resource'}</p><p className="truncate text-[0.65rem] text-slate-500 dark:text-slate-400">{[resource.category, resource.department, resource.level].filter(Boolean).join(' · ')}</p></div></div>) : <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">No published resources yet.</p>}
    </div>
    <Link to="/dashboard/resources" className="mt-auto block w-full rounded-xl border-2 border-indigo-50 py-3 text-center text-sm font-extrabold text-indigo-700 transition hover:bg-indigo-50 dark:border-slate-700 dark:text-indigo-300 dark:hover:bg-slate-800">Go to Resources</Link>
  </section>;
};
