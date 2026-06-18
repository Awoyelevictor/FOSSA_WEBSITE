import React from 'react';
import { ClipboardList as FileText } from "./animate-ui/icons/clipboard-list";
import { Lock } from "./animate-ui/icons/lock";

export const RecentlyAddedResources = () => {
    const resources = [
        { title: 'Data Structures Notes', subtitle: 'Computer Science • 3rd Year' },
        { title: 'Organic Chemistry Notes', subtitle: 'Biochemistry • 3rd Year' },
        { title: 'Mechanics II Past Questions', subtitle: 'Physics • 200 Level' },
    ];
    return (
        <section className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm transition-colors duration-200 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Recently Added Resources</h2>
                <a href="#" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View All</a>
            </div>
            <div className="flex flex-col gap-3 flex-grow mb-6">
                {resources.map((r, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 border border-transparent dark:border-slate-700/30 rounded-2xl group transition-all hover:bg-slate-100 dark:hover:bg-slate-800/60">
                        <div className="w-10 h-10 bg-white shadow-sm dark:bg-slate-700 rounded-xl text-indigo-500 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                            <FileText className='w-5 h-5'animateOnHover={true} animateOnTap={true} />
                        </div>
                        <div className="flex-grow min-w-0 pr-2">
                            <p className="font-bold text-[0.8rem] text-slate-900 dark:text-white truncate pb-0.5">{r.title}</p>
                            <p className="text-[0.65rem] font-medium text-slate-500 dark:text-slate-400 truncate">{r.subtitle}</p>
                        </div>
                        <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" animateOnHover={true} animateOnTap={true} />
                    </div>
                ))}
            </div>
            <button className="w-full py-3 bg-white dark:bg-slate-800 border-2 border-indigo-50 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-[0.8rem] font-extrabold hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors mt-auto">
                Go to Resources
            </button>
        </section>
    );
};