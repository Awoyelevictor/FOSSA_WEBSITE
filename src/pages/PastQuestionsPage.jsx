import React, { useState } from 'react';
import { Search } from '../components/animate-ui/icons/search';
import { SlidersHorizontal as Filter } from '../components/animate-ui/icons/sliders-horizontal';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { Lock } from '../components/animate-ui/icons/lock';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const PastQuestionsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All Departments');
    const [levelFilter, setLevelFilter] = useState('All Levels');
    const [yearFilter, setYearFilter] = useState('All Years');

    const pastQuestions = [
        { id: 1, title: 'Data Structures - 2023', department: 'Computer Science', level: '200 Level', isLocked: true },
        { id: 2, title: 'Data Structures - 2022', department: 'Computer Science', level: '200 Level', isLocked: true },
        { id: 3, title: 'Thermodynamics - 2023', department: 'Physics', level: '200 Level', isLocked: true },
        { id: 4, title: 'Thermodynamics - 2022', department: 'Physics', level: '200 Level', isLocked: true },
        { id: 5, title: 'Organic Chemistry - 2023', department: 'Biochemistry', level: '300 Level', isLocked: true },
    ];

    const filtered = pastQuestions.filter(pq => {
        const matchesSearch = pq.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = departmentFilter === 'All Departments' || pq.department === departmentFilter;
        const matchesLevel = levelFilter === 'All Levels' || pq.level === levelFilter;
        const matchesYear = yearFilter === 'All Years' || pq.title.includes(yearFilter);
        return matchesSearch && matchesDept && matchesLevel && matchesYear;
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
                            <AnimatedText text="Past Questions" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Access past questions by department and level.</p>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search past questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-xl block w-full pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border-2 border-transparent transition-all font-semibold"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-slate-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Department</label>
                        <div className="relative">
                            <select
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                            >
                                <option>All Departments</option>
                                <option>Computer Science</option>
                                <option>Physics</option>
                                <option>Biochemistry</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Level</label>
                        <div className="relative">
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                            >
                                <option>All Levels</option>
                                <option>100 Level</option>
                                <option>200 Level</option>
                                <option>300 Level</option>
                                <option>400 Level</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Year</label>
                        <div className="relative">
                            <select
                                value={yearFilter}
                                onChange={(e) => setYearFilter(e.target.value)}
                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                            >
                                <option>All Years</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* List */}
                <AnimateStaggerContainer delay={0.05} className="space-y-4">
                    {filtered.map((pq) => (
                        <AnimateStaggerItem key={pq.id}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{pq.title}</h3>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{pq.department} &bull; {pq.level}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                    <button className="flex-1 sm:flex-none px-4 py-2 border-2 border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-400 font-bold text-xs rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                                        PDF
                                    </button>
                                    {pq.isLocked && (
                                        <div className="p-2 text-slate-400 dark:text-slate-500">
                                            <Lock className="w-4 h-4" animateOnHover={true} animateOnTap={true} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AnimateStaggerItem>
                    ))}
                    {filtered.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No past questions matched the current filters.</p>
                        </div>
                    )}
                </AnimateStaggerContainer>
            </AnimateIn>
        </div>
    );
};
