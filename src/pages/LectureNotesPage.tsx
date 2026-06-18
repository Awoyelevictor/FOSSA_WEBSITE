import React, { useState, useEffect } from 'react';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { Search } from '../components/animate-ui/icons/search';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { getLectureNotes } from '../utils/store';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const LectureNotesPage = () => {
    const [lectureNotes, setLectureNotes] = useState(getLectureNotes());

    useEffect(() => {
        const handleSync = () => {
            setLectureNotes(getLectureNotes());
        };
        window.addEventListener('fossa_store_update', handleSync);
        return () => {
            window.removeEventListener('fossa_store_update', handleSync);
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [downloadingNotes, setDownloadingNotes] = useState<Record<number, string>>({});

    const handleDownload = (id: number, title: string) => {
        setDownloadingNotes(prev => ({ ...prev, [id]: 'loading' }));
        setTimeout(() => {
            setDownloadingNotes(prev => ({ ...prev, [id]: 'done' }));
            setTimeout(() => {
                setDownloadingNotes(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
            }, 3000);
        }, 1500);
    };

    const filteredNotes = lectureNotes.filter((note: any) => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              note.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === 'All Departments' || note.department === selectedDept;
        const matchesLevel = selectedLevel === 'All Levels' || note.level === selectedLevel;
        return matchesSearch && matchesDept && matchesLevel;
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
                            <AnimatedText text="Lecture Notes" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Access your course lecture notes.</p>
                    </div>
                </div>
            </AnimateIn>
            
            <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                {/* Search Bar */}
                <div className="relative flex-grow mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search notes by course title or instructor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-xl block w-full pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border-2 border-transparent transition-all font-semibold"
                    />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Department</label>
                        <div className="relative">
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
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
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Level</label>
                        <div className="relative">
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-slate-100 text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                            >
                                <option>All Levels</option>
                                <option>100 Level</option>
                                <option>200 Level</option>
                                <option>300 Level</option>
                                <option>400 Level</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* List */}
                <AnimateStaggerContainer delay={0.05} className="space-y-4">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => {
                            const dlState = downloadingNotes[note.id];
                            return (
                                <AnimateStaggerItem key={note.id}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                         <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                                                <ClipboardList className="w-6 h-6" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{note.title}</h3>
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    {note.department} &bull; {note.level} &bull; {note.author} &bull; {note.size}
                                                </p>
                                            </div>
                                         </div>
                                         <button 
                                             onClick={() => handleDownload(note.id, note.title)}
                                             disabled={dlState === 'loading'}
                                             className={`w-full sm:w-auto px-5 py-2.5 font-bold text-xs rounded-xl transition-all shadow-sm ${
                                                 dlState === 'loading'
                                                     ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 animate-pulse'
                                                     : dlState === 'done'
                                                     ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                                                     : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                                             }`}
                                         >
                                             {dlState === 'loading' ? 'Downloading...' : dlState === 'done' ? 'Downloaded ✓' : 'Download'}
                                         </button>
                                    </div>
                                </AnimateStaggerItem>
                            );
                        })
                    ) : (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                            No notes match your search or filters.
                        </div>
                    )}
                </AnimateStaggerContainer>
            </AnimateIn>
        </div>
    );
};
