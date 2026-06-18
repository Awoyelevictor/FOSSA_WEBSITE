import React, { useState } from 'react';
import { Search } from "../components/animate-ui/icons/search";
import { SlidersHorizontal as Filter } from "../components/animate-ui/icons/sliders-horizontal";
import { ChevronDown } from "../components/animate-ui/icons/chevron-down";
import { Lock } from "../components/animate-ui/icons/lock";
import { ChevronLeft } from "../components/animate-ui/icons/chevron-left";
import { ChevronRight } from "../components/animate-ui/icons/chevron-right";
import { ClipboardList as FileText } from "../components/animate-ui/icons/clipboard-list";
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const ResourcesPage = () => {
    const categories = [
        { id: 'all', label: 'All Resources' },
        { id: 'pq', label: 'Past Questions' },
        { id: 'notes', label: 'Lecture Notes' },
        { id: 'outlines', label: 'Course Outlines' },
        { id: 'timetable', label: 'Timetable' },
    ];
    const [activeCategory, setActiveCategory] = useState('all');

    const resources = [
        { title: 'Data Structures Notes', subtitle: 'Computer Science • 2nd Year • Notes', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
        { title: 'Thermodynamics Notes', subtitle: 'Physics • 200 Level • Notes', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30' },
        { title: 'Microbiology Practical Manual', subtitle: 'Microbiology • 300 Level • Notes', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
        { title: 'Calculus I Lecture Notes', subtitle: 'Mathematics • 100 Level • Notes', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/30' },
        { title: 'Organic Chemistry Notes', subtitle: 'Biochemistry • 3rd Year • Notes', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30' },
        { title: 'Data Structures Past Questions', subtitle: 'Computer Science • 200 Level • Past Questions', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
        { title: 'Mechanics II Past Questions', subtitle: 'Physics • 200 Level • Past Questions', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
        { title: 'Linear Algebra Notes', subtitle: 'Mathematics • 200 Level • Notes', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/30' },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full pb-10 text-left">
            {/* Inner Sidebar / Tabs */}
            <div className="lg:w-64 flex-shrink-0">
                <AnimateIn direction="left" delay={0.1}>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-row lg:flex-col gap-1 overflow-x-auto custom-scrollbar transition-colors duration-200">
                        {categories.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setActiveCategory(c.id)}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-[0.8rem] whitespace-nowrap transition-all duration-200 ${
                                    activeCategory === c.id
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                            >
                                <span>{c.label}</span>
                                {activeCategory === c.id && <ChevronDown className="w-4 h-4 hidden lg:block opacity-70" animateOnHover={true} animateOnTap={true} />}
                            </button>
                        ))}
                    </div>
                </AnimateIn>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0">
                <AnimateIn direction="down" delay={0.05} className="mb-6 hidden lg:block">
                    <h1 className="text-2xl md:text-[1.75rem] font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-200">
                        <AnimatedText text="Resources" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Access all academic resources in one place.</p>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 md:p-6 shadow-sm mb-6 flex-grow transition-colors duration-200">
                    {/* Search and Filters */}
                    <div className="flex flex-col gap-5 mb-8">
                        <div className="flex gap-3">
                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl flex-grow border border-transparent focus-within:border-indigo-200 dark:focus-within:border-indigo-900/50 transition-colors shadow-inner">
                                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" animateOnHover={true} animateOnTap={true} />
                                <input type="text" placeholder="Search resources..." className="bg-transparent border-none focus:outline-none w-full text-sm font-medium text-slate-900 dark:text-slate-200 placeholder:text-slate-400" />
                            </div>
                            <button className="flex items-center justify-center w-[3.25rem] h-[3.25rem] bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-transparent shadow-sm flex-shrink-0">
                                <Filter className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Department</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl px-4 py-3 outline-none focus:border-indigo-300 dark:focus:border-indigo-700 transition-colors cursor-pointer shadow-sm">
                                        <option>All Departments</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" animateOnHover={true} animateOnTap={true} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Level</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl px-4 py-3 outline-none focus:border-indigo-300 dark:focus:border-indigo-700 transition-colors cursor-pointer shadow-sm">
                                        <option>All Levels</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" animateOnHover={true} animateOnTap={true} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Type</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl px-4 py-3 outline-none focus:border-indigo-300 dark:focus:border-indigo-700 transition-colors cursor-pointer shadow-sm">
                                        <option>All Types</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" animateOnHover={true} animateOnTap={true} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resource List */}
                    <AnimateStaggerContainer delay={0.04} className="flex flex-col gap-3 mb-8">
                        {resources.map((r, i) => (
                            <AnimateStaggerItem key={i}>
                                <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl hover:border-indigo-200 hover:shadow-md dark:hover:border-indigo-900/50 bg-white dark:bg-slate-800/20 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4 min-w-0 pr-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200 ${r.bg}`}>
                                            <FileText className={`w-6 h-6 ${r.color}`} animateOnHover={true} animateOnTap={true} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-[0.95rem] font-bold text-slate-900 dark:text-white leading-tight mb-1 truncate transition-colors">{r.title}</h3>
                                            <p className="text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400 truncate">{r.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="pr-1 flex-shrink-0">
                                        <Lock className="w-5 h-5 text-slate-300 dark:text-slate-600 transition-colors" animateOnHover={true} animateOnTap={true} />
                                    </div>
                                </div>
                            </AnimateStaggerItem>
                        ))}
                    </AnimateStaggerContainer>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 gap-4 mt-auto">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Showing 1 to 8 of 124 resources</span>
                        <div className="flex items-center gap-1.5">
                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <ChevronLeft className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm transition-transform hover:scale-105">1</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">2</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <ChevronRight className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </button>
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </div>
    );
};