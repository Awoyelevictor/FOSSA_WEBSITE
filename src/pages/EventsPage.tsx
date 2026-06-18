import React, { useState, useEffect } from 'react';
import { getEvents, saveEvents } from '../utils/store';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('All Events');
    const [eventList, setEventList] = useState(getEvents());

    useEffect(() => {
        const handleSync = () => {
            setEventList(getEvents());
        };
        window.addEventListener('fossa_store_update', handleSync);
        return () => {
            window.removeEventListener('fossa_store_update', handleSync);
        };
    }, []);

    const tabs = ['All Events', 'My Registrations', 'Past Events'];

    const handleRegister = (id: number) => {
        const updated = eventList.map((event: any) => 
            event.id === id ? { ...event, registered: !event.registered } : event
        );
        setEventList(updated);
        saveEvents(updated);
    };

    const getFilteredEvents = () => {
        if (activeTab === 'My Registrations') {
            return eventList.filter(e => e.registered);
        }
        if (activeTab === 'Past Events') {
            return [];
        }
        return eventList;
    };

    const filteredEvents = getFilteredEvents();

    return (
        <div className="max-w-5xl mx-auto w-full pb-10 text-left">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden lg:block">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="Events" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Discover and register for exciting events.</p>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto text-left">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${
                                activeTab === tab 
                                    ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400' 
                                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Event List */}
                <AnimateStaggerContainer delay={0.05} className="space-y-6">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <AnimateStaggerItem key={event.id}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
                                        <div className="w-full sm:w-32 h-48 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow text-left">
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{event.title}</h3>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-auto mt-2 sm:mt-0 flex-shrink-0">
                                        <button 
                                            onClick={() => handleRegister(event.id)}
                                            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                                                event.registered 
                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 space-x-2'
                                                    : 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                                            }`}
                                        >
                                            {event.registered ? 'Registered' : 'Register'}
                                        </button>
                                    </div>
                                </div>
                            </AnimateStaggerItem>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No events found in this category.</p>
                        </div>
                    )}
                </AnimateStaggerContainer>
            </AnimateIn>
        </div>
    );
};
