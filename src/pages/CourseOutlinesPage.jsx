import React, { useState, useEffect } from 'react';
import { Layers } from '../components/animate-ui/icons/layers';
import { Search } from '../components/animate-ui/icons/search';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { getCourseOutlines } from '../utils/store';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const CourseOutlinesPage = () => {
    const [outlines, setOutlines] = useState(getCourseOutlines());

    useEffect(() => {
        const handleSync = () => {
            setOutlines(getCourseOutlines());
        };
        window.addEventListener('fossa_store_update', handleSync);
        return () => {
            window.removeEventListener('fossa_store_update', handleSync);
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [expandedOutlineId, setExpandedOutlineId] = useState(null);

    const filteredOutlines = outlines.filter((out) => {
        const matchesSearch = out.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              out.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === 'All Departments' || out.department === selectedDept;
        return matchesSearch && matchesDept;
    });

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
                            <AnimatedText text="Course Outlines" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Access and inspect your scientific course syllabi.</p>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by course code or title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-xl block w-full pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border-2 border-transparent transition-all font-semibold"
                        />
                    </div>
                    <div className="relative w-full md:w-64 flex-shrink-0">
                        <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3.5 focus:outline-none transition-all font-semibold cursor-pointer"
                        >
                            <option>All Departments</option>
                            <option>Computer Science</option>
                            <option>Physics</option>
                            <option>Biochemistry</option>
                            <option>Mathematics</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                {/* List with Smooth Accordeon Drawer */}
                <AnimateStaggerContainer delay={0.05} className="space-y-4">
                    {filteredOutlines.length > 0 ? (
                        filteredOutlines.map((outline) => {
                            const isExpanded = expandedOutlineId === outline.id;
                            return (
                                <AnimateStaggerItem key={outline.id}>
                                    <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-all">
                                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                             <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
                                                    <Layers className="w-6 h-6" animateOnHover={true} animateOnTap={true} />
                                                </div>
                                                <div className="text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-0.5 text-[0.65rem] font-bold uppercase rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400">
                                                            {outline.code}
                                                        </span>
                                                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                                                            {outline.units} Credits
                                                        </span>
                                                    </div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{outline.title}</h3>
                                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{outline.department} &bull; {outline.level}</p>
                                                </div>
                                             </div>
                                             <button 
                                                 onClick={() => setExpandedOutlineId(isExpanded ? null : outline.id)}
                                                 className={`px-4 py-2 font-bold text-xs rounded-xl transition-all ${
                                                     isExpanded
                                                         ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                                                         : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50'
                                                 }`}
                                             >
                                                 {isExpanded ? 'Collapse' : 'Inspect'}
                                             </button>
                                        </div>
                                        
                                        {isExpanded && (
                                            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/10 border-t border-slate-100 dark:border-slate-800 text-left animate-fade-in">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">Lectures & Topics Covered</h4>
                                                        <ul className="space-y-2.5">
                                                            {outline.topics.map((t, idx) => (
                                                                <li key={idx} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                                                                    <span className="text-indigo-600 font-bold">•</span>
                                                                    <span className="leading-tight">{t}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">Recommended Textbooks & Bibliography</h4>
                                                        <ul className="space-y-2.5">
                                                            {outline.materials.map((m, idx) => (
                                                                <li key={idx} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                                                                    <span className="text-orange-600 font-bold">📖</span>
                                                                    <span className="leading-tight italic">{m}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimateStaggerItem>
                            );
                        })
                    ) : (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                            No course outlines found matching your filters.
                        </div>
                    )}
                </AnimateStaggerContainer>
            </AnimateIn>
        </div>
    );
};
