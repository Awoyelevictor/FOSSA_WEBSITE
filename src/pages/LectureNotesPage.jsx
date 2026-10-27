import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { Search } from '../components/animate-ui/icons/search';
import { getPublishedContent } from '../lib/publicContent';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const LectureNotesPage = () => {
  const [allResources, setAllResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPublishedContent('resources').then(items => { if (active) setAllResources(items); })
      .catch(err => { if (active) setError(err.message || 'Could not load lecture notes.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const notes = useMemo(() => allResources.filter(item => {
    const category = String(item.category || item.type || item.resourceType || '').toLowerCase();
    return !category || category.includes('note') || category.includes('lecture');
  }), [allResources]);
  const departments = [...new Set(notes.map(n => n.department).filter(Boolean))];
  const levels = [...new Set(notes.map(n => n.level).filter(Boolean))];
  const filtered = notes.filter(note => {
    const title = String(note.title || '');
    const author = String(note.author || note.instructor || '');
    return (title.toLowerCase().includes(searchQuery.toLowerCase()) || author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDept === 'All Departments' || note.department === selectedDept) &&
      (selectedLevel === 'All Levels' || String(note.level) === selectedLevel);
  });

  return <div className="mx-auto w-full max-w-5xl pb-10 text-left">
    <AnimateIn direction="down" className="mb-6"><h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Lecture Notes" /></h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse and open lecture notes published by FOSSA administrators.</p></AnimateIn>
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="relative md:col-span-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search notes or instructor…" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
        <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>All Departments</option>{departments.map(dept => <option key={dept}>{dept}</option>)}</select>
        <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>All Levels</option>{levels.map(level => <option key={level}>{level}</option>)}</select>
      </div>
      {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading lecture notes…</p> : error ? <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{error}</p> : filtered.length ? <div className="space-y-3">{filtered.map((note, index) => { const url = note.url || note.file_url || note.download_url || note.link; return <article key={note.id || index} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"><ClipboardList className="h-5 w-5" /></div><div><h2 className="font-bold text-slate-900 dark:text-white">{note.title || 'Lecture note'}</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{[note.department, note.level, note.author || note.instructor].filter(Boolean).join(' · ') || 'Academic resource'}</p>{note.description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{note.description}</p>}</div></div>{url ? <a href={url} target="_blank" rel="noreferrer" className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-indigo-700">Open / Download</a> : <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">File link not added yet</span>}</article>})}</div> : <div className="py-12 text-center"><p className="font-semibold text-slate-700 dark:text-slate-300">No published lecture notes found.</p><p className="mt-1 text-sm text-slate-400">Administrators need to publish a resource and add its file URL.</p></div>}
    </section>
  </div>;
};
