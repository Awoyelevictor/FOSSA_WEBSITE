import React, { useState, useEffect } from 'react';
import { getEvents, saveEvents } from '../utils/store';

export const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const updateList = () => {
            const raw = getEvents();
            // Take top 3 for dashboard list
            setEvents(raw.slice(0, 3));
        };
        updateList();
        window.addEventListener('fossa_store_update', updateList);
        return () => {
            window.removeEventListener('fossa_store_update', updateList);
        };
    }, []);

    const handleRegister = (id) => {
        const allEvs = getEvents();
        const updated = allEvs.map((ev) => 
            ev.id === id ? { ...ev, registered: !ev.registered } : ev
        );
        saveEvents(updated);
    };

    return (
        <section className="flex flex-col h-full bg-transparent pt-2">
            <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
                <a href="/dashboard/events" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View All</a>
            </div>
            <div className="flex flex-col gap-3 flex-grow">
                {events.length > 0 ? (
                    events.map((e, i) => (
                        <div key={i} className="flex p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm gap-3 items-end md:items-center relative cursor-pointer hover:border-indigo-200 text-left">
                            <img src={e.image || "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&h=250&auto=format&fit=crop"} className="w-[5.5rem] h-[4rem] rounded-xl object-cover flex-shrink-0" alt="Event" referrerPolicy="no-referrer" />
                            <div className="flex-grow min-w-0 pr-16 self-start mt-0.5">
                                <h3 className="font-extrabold text-[0.8rem] text-slate-900 dark:text-white leading-tight mb-1">{e.title}</h3>
                                <p className="text-[0.65rem] font-medium text-slate-500 dark:text-slate-400 leading-tight pr-4 truncate">{e.description}</p>
                            </div>
                            <button 
                                onClick={(evt) => {
                                    evt.stopPropagation();
                                    handleRegister(e.id);
                                }}
                                className={`absolute bottom-3 right-3 px-3 py-1.5 text-[0.65rem] font-bold rounded-lg transition-all ${
                                    e.registered 
                                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                        : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
                                }`}
                            >
                                {e.registered ? 'Registered ✓' : 'Register'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        No upcoming events listed.
                    </div>
                )}
            </div>
        </section>
    );
};
