import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { Search } from '../components/animate-ui/icons/search';
import { getPublishedContent } from '../lib/publicContent';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const PastQuestionsPage = () => {
  const [allResources, setAllResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPublishedContent('resources').then(items => { if (active) setAllResources(items); })
      .catch(err => { if (active) setError(err.message || 'Could not load past questions.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const questions = useMemo(() => allResources.filter(item => {
    const category = String(item.category || item.type || item.resourceType || '').toLowerCase();
    return category.includes('question') || category.includes('past paper') || category.includes('past-question');
  }), [allResources]);
  const departments = [...new Set(questions.map(q => q.department).filter(Boolean))];
  const levels = [...new Set(questions.map(q => q.level).filter(Boolean))];
  const years = [...new Set(questions.map(q => String(q.year || '').trim()).filter(Boolean))];
  const filtered = questions.filter(q => {
    const searchable = [q.title, q.course, q.course_code, q.description].filter(Boolean).join(' ').toLowerCase();
    return searchable.includes(searchQuery.toLowerCase()) &&
      (departmentFilter === 'All Departments' || q.department === departmentFilter) &&
      (levelFilter === 'All Levels' || String(q.level) === levelFilter) &&
      (yearFilter === 'All Years' || String(q.year) === yearFilter);
  });

  return <div className="mx-auto w-full max-w-5xl pb-10 text-left">
    <AnimateIn direction="down" className="mb-6"><h1 className="text-2xl font-bold text-slate-900 dark:text-white"><AnimatedText text="Past Questions" /></h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Find published past papers by course, department, level, or year.</p></AnimateIn>
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="relative md:col-span-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search past questions…" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>All Departments</option>{departments.map(dept => <option key={dept}>{dept}</option>)}</select>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>All Levels</option>{levels.map(level => <option key={level}>{level}</option>)}</select>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"><option>All Years</option>{years.map(year => <option key={year}>{year}</option>)}</select>
      </div>
      {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading past questions…</p> : error ? <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">{error}</p> : filtered.length ? <div className="space-y-3">{filtered.map((q, index) => { const url = q.url || q.file_url || q.download_url || q.link; return <article key={q.id || index} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"><ClipboardList className="h-5 w-5" /></div><div><h2 className="font-bold text-slate-900 dark:text-white">{q.title || q.course || 'Past question paper'}</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{[q.department, q.level, q.year, q.course_code].filter(Boolean).join(' · ') || 'Academic resource'}</p>{q.description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{q.description}</p>}</div></div>{url ? <a href={url} target="_blank" rel="noreferrer" className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-indigo-700">Open / Download</a> : <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">File link not added yet</span>}</article>})}</div> : <div className="py-12 text-center"><p className="font-semibold text-slate-700 dark:text-slate-300">No published past questions found.</p><p className="mt-1 text-sm text-slate-400">Administrators need to publish past papers under the Past Questions category and add a file URL.</p></div>}
    </section>
  </div>;
};
