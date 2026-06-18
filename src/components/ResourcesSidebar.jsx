import React from 'react';
import { ClipboardList as BookOpen } from "./animate-ui/icons/clipboard-list";
import { Lock } from "./animate-ui/icons/lock";

export const ResourcesSidebar = () => {
    const resources = [
        { title: 'Data Structures Notes' },
        { title: 'Thermodynamics Notes' },
        { title: 'Microbiology Practical Manual' },
        { title: 'Calculus I Lecture Notes' },
    ];
    return (
        <section className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-colors duration-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Resources</h2>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline tracking-wide">View All</a>
            </div>
            <div className="space-y-4">
                {resources.map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex gap-4 items-center">
                            <BookOpen className="w-5 h-5 text-slate-400 dark:text-slate-500" animateOnHover={true} animateOnTap={true} />
                            <p className="font-medium text-slate-900 dark:text-slate-200 text-sm">{r.title}</p>
                        </div>
                        <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" animateOnHover={true} animateOnTap={true} />
                    </div>
                ))}
            </div>
        </section>
    );
};