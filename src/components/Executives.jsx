import React, { useEffect, useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { GlareHover } from './GlareHover';
import { getPublishedExecutives } from '../lib/executives';

export const Executives = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    getPublishedExecutives().then(items => { if (active) setExecutives(items.slice(0, 5)); })
      .catch(() => { if (active) setExecutives([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return <section className="rounded-2xl bg-slate-50 p-6 text-center transition-colors duration-200 dark:bg-slate-950 md:p-12">
    <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-4xl">FOSSA Executives</h2>
      <a href="/executives" className="flex items-center gap-2 font-semibold text-indigo-600 hover:underline dark:text-indigo-400">View All <ArrowRight size={20}/></a>
    </div>
    {loading ? <p className="py-8 text-sm text-slate-500">Loading official profiles…</p> :
      executives.length ? <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
        {executives.map(person => <div key={person.id} className="h-full">
          <GlareHover borderRadius="1.5rem" className="h-full">
            <div className="flex h-full flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <img src={person.avatar} alt="" loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/logo.png'; }} className="h-24 w-24 rounded-full border-4 border-slate-100 bg-slate-50 object-cover dark:border-slate-800 dark:bg-slate-950"/>
              <div className="text-center"><p className="font-semibold text-slate-900 dark:text-white">{person.name}</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{person.position}</p></div>
            </div>
          </GlareHover>
        </div>)}
      </div> : <div className="rounded-2xl border border-dashed border-slate-300 py-10 dark:border-slate-800"><Users className="mx-auto mb-3 text-slate-400" size={30}/><p className="font-semibold text-slate-700 dark:text-slate-300">Official executive profiles will appear here</p><p className="mt-1 text-sm text-slate-500">FOSSA administrators can publish them from Website content.</p></div>}
  </section>;
};
