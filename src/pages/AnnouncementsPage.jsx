import React, { useState, useEffect } from 'react';
import { getAnnouncements } from '../utils/store';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState(getAnnouncements());
    const [activeTab, setActiveTab] = useState('All Announcements');
    const tabs = ['All Announcements', 'Important', 'General'];

    useEffect(() => {
        const handleSync = () => {
            setAnnouncements(getAnnouncements());
        };
        window.addEventListener('fossa_store_update', handleSync);
        return () => {
            window.removeEventListener('fossa_store_update', handleSync);
        };
    }, []);

    const getFilteredAnnouncements = () => {
        if (activeTab === 'Important') {
            return announcements.filter((a) => a.type === 'important');
        }
        if (activeTab === 'General') {
            return announcements.filter((a) => a.type === 'general');
        }
        return announcements;
    };

    const filteredAnnouncements = getFilteredAnnouncements();

    return (
        <div className="max-w-5xl mx-auto w-full pb-10">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden lg:block text-left">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="Announcements" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Stay updated with important news.</p>
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

                {/* Announcement List */}
                <AnimateStaggerContainer delay={0.06} className="space-y-0">
                    {filteredAnnouncements.length > 0 ? (
                        filteredAnnouncements.map((announcement, index) => (
                            <AnimateStaggerItem key={announcement.id}>
                                <div className={`flex items-start gap-4 py-5 ${index !== filteredAnnouncements.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/50' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${announcement.icon}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow text-left">
                                        <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-1">{announcement.title}</h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{announcement.description}</p>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{announcement.date}</p>
                                    </div>
                                    {announcement.isNew && (
                                        <div className="flex-shrink-0">
                                            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg uppercase tracking-wider">New</span>
                                        </div>
                                    )}
                                </div>
                            </AnimateStaggerItem>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No announcements found.</p>
                        </div>
                    )}
                </AnimateStaggerContainer>
            </AnimateIn>
        </div>
    );
};
