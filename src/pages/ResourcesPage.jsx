import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../components/animate-ui/icons/search';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { getPublishedContent } from '../lib/publicContent';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'past', label: 'Past Questions' },
  { id: 'notes', label: 'Lecture Notes' },
  { id: 'outlines', label: 'Course Outlines' },
];

function categoryOf(item) { return String(item.category || item.type || item.resourceType || '').toLowerCase(); }
function resourceUrl(item) { return item.url || item.file_url || item.download_url || item.link || ''; }

export const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPublishedContent('resources').then(items => { if (active) setResources(items); })
      .catch(err => { if (active) setError(err.message || 'Could not load resources.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => resources.filter(item => {
    const category = categoryOf(item);
    const matchesCategory = activeCategory === 'all' ||
      (activeCategory === 'past' && (category.includes('question') || category.includes('past paper'))) ||
      (activeCategory === 'notes' && (category.includes('note') || category.includes('lecture'))) ||
      (activeCategory === 'outlines' && category.includes('outline'));
    const text = [item.title, item.description, item.department, item.level, item.course].filter(Boolean).join(' ').toLowerCase();
    return matchesCategory && text.includes(search.toLowerCase());
  }), [resources, activeCategory, search]);

  return <div className="mx-auto w-full max-w-6xl pb-10 text-left">
    <AnimateIn direction="down" className="mb-6"><h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Academic Resources" /></h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse notes, past papers and course materials published for students.</p></AnimateIn>
    <div className="mb-5 flex flex-wrap gap-2">{categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${activeCategory === category.id ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'}`}>{category.label}</button>)}<Link to="/dashboard/timetable" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Open Timetable</Link></div>
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-7">
      <div className="relative mb-6"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, course or department…" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
      {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading published resources…</p> : error ? <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{error}</p> : filtered.length ? <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{filtered.map((item, index) => { const url = resourceUrl(item); return <article key={item.id || index} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"><ClipboardList className="h-5 w-5" /></div><div className="min-w-0 flex-1"><h2 className="font-bold text-slate-900 dark:text-white">{item.title || 'Academic resource'}</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{[item.category, item.department, item.level, item.year].filter(Boolean).join(' · ')}</p>{item.description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>}{url ? <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700">Open resource</a> : <p className="mt-3 text-xs font-semibold text-amber-700 dark:text-amber-300">Resource link not added yet</p>}</div></article>})}</div> : <div className="py-12 text-center"><p className="font-semibold text-slate-700 dark:text-slate-300">No published resources in this category.</p><p className="mt-1 text-sm text-slate-400">Published resources will appear here. Administrators should add a file URL when publishing materials.</p></div>}
    </section>
  </div>;
};
