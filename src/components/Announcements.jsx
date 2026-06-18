import React, { useState, useEffect } from 'react';
import { getAnnouncements } from '../utils/store';
import { BadgeCheck as Mailbox } from './animate-ui/icons/badge-check';
import { Bell as AlertCircle } from './animate-ui/icons/bell';
import { BadgeCheck as ShieldAlert } from './animate-ui/icons/badge-check';

export const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const updateList = () => {
            const raw = getAnnouncements();
            // Take top 3 for the dashboard feed
            setAnnouncements(raw.slice(0, 3));
        };
        updateList();
        window.addEventListener('fossa_store_update', updateList);
        return () => {
            window.removeEventListener('fossa_store_update', updateList);
        };
    }, []);

    const iconMap = {
        'important': ShieldAlert,
        'general': AlertCircle,
        'academic': Mailbox
    };

    return (
        <section className="flex flex-col h-full bg-transparent">
            <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Latest Announcements</h2>
                <a href="/dashboard/announcements" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View All</a>
            </div>
            <div className="flex flex-col gap-2 flex-grow">
                {announcements.length > 0 ? (
                    announcements.map((a, i) => {
                        const Icon = iconMap[a.type] || Mailbox;
                        return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors cursor-pointer hover:border-indigo-200 group text-left">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/30`}>
                                    <Icon className={`w-4 h-4 text-indigo-600 dark:text-indigo-400`} animateOnHover={true} animateOnTap={true} />
                                </div>
                                <div className="flex-grow min-w-0 pr-10">
                                    <h3 className="font-bold text-[0.75rem] text-slate-900 dark:text-white truncate">{a.title}</h3>
                                    <p className="text-[0.65rem] text-slate-400 dark:text-slate-500 truncate">{a.description}</p>
                                </div>
                                {a.isNew && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <span className="text-[0.6rem] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded">New</span>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        No announcements posted.
                    </div>
                )}
            </div>
        </section>
    );
};
