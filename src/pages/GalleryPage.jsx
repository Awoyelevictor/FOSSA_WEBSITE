import React, { useState } from 'react';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';
import { Sparkles } from '../components/animate-ui/icons/sparkles';

export const GalleryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
        { id: 'all', name: 'All Activities' },
        { id: 'academic', name: 'Academic Labs' },
        { id: 'sports', name: 'Sports & Games' },
        { id: 'events', name: 'Social Events' },
    ];

    const photos = [];

    const filteredPhotos = selectedCategory === 'all' 
        ? photos 
        : photos.filter(p => p.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 text-left">
            {/* Header section */}
            <div className="max-w-3xl mb-12">
                <AnimateIn direction="down" delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-905/30 border border-indigo-100 dark:border-indigo-900 rounded-full text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" animateOnHover={true} />
                        Faculty Showroom
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <AnimatedText text="FOSSA Photo Gallery" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg leading-relaxed font-semibold">
                        A retrospective window into our vibrant student culture—ranging from rigorous molecular chemistry research to thrilling varsity soccer tournaments.
                    </p>
                </AnimateIn>
            </div>

            {/* Tags Filter */}
            <AnimateIn direction="up" delay={0.12} className="mb-10 flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                            selectedCategory === cat.id
                                ? 'bg-indigo-650 border-transparent text-white shadow-md'
                                : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-indigo-500/30'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </AnimateIn>

            {/* Photo Grid */}
            <AnimateStaggerContainer delay={0.16} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPhotos.length > 0 ? filteredPhotos.map((photo) => (
                    <AnimateStaggerItem key={photo.id}>
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={photo.image} 
                                    alt={photo.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4 bg-slate-950/70 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md backdrop-blur-sm tracking-widest">
                                    {photo.category}
                                </div>
                            </div>
                            <div className="p-6 md:p-8 text-left">
                                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 truncate">
                                    {photo.title}
                                </h3>
                                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                                    {photo.caption}
                                </p>
                            </div>
                        </div>
                    </AnimateStaggerItem>
                )) : (<div className="col-span-full rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">No gallery photos have been published yet.</div>)}
            </AnimateStaggerContainer>
        </div>
    );
};
