import React, { useEffect, useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { getPublishedExecutives } from '../lib/executives';

export const ExecutivesPage = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getPublishedExecutives()
      .then(items => { if (active) setExecutives(items); })
      .catch(e => { if (active) setError(e.message || 'Could not load the FOSSA executive roster.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 md:px-8 md:py-20">
    <div className="mx-auto max-w-7xl">
      <header className="mb-12 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-600 dark:text-indigo-400">Faculty of Science Students Association</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">Meet the FOSSA Executives</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">Official executive profiles published by FOSSA administration.</p>
      </header>
      {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      {loading ? <p className="py-16 text-center text-sm text-slate-500">Loading official executive profiles…</p> :
        executives.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {executives.map(person => <article key={person.id} className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img src={person.avatar} alt="" loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.png'; }} className="mx-auto h-36 w-36 rounded-full border-4 border-slate-100 bg-slate-50 object-cover dark:border-slate-800 dark:bg-slate-950"/>
            <div className="mt-5 text-center">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{person.name}</h2>
              <p className="mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">{person.position}</p>
            </div>
            {person.bio && <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">{person.bio}</p>}
            {person.profileUrl && <a href={person.profileUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-200"><ExternalLink size={15}/>View profile</a>}
          </article>)}
        </div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <Users className="mx-auto mb-4 text-slate-400" size={36}/>
          <h2 className="text-lg font-black text-slate-800 dark:text-white">Official profiles have not been published yet</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">FOSSA administrators can publish executive profiles from Admin Console → Website content. Use a category such as “Executive — President”, the person's name as the title, a short biography, and an optional image or profile link.</p>
        </div>}
    </div>
  </main>;
};
