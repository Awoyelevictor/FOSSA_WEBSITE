import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { executivesData } from '../data';

import { GlareHover } from './GlareHover';

export const Executives = () => {
    return (
        <section className="p-6 md:p-12 bg-slate-50 dark:bg-slate-950 rounded-2xl transition-colors duration-200 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">FOSSA Executives</h2>
                <a href="/executives" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    View All <ArrowRight size={20} />
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {executivesData.map((e, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="h-full"
                    >
                        <GlareHover borderRadius="1.5rem" className="h-full">
                            <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm h-full">
                                <div className="relative group">
                                    <img src={e.avatar} alt={e.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                        <a href={e.socials[0]} className="text-white hover:text-blue-400"><Linkedin size={16} /></a>
                                        <a href={e.socials[1]} className="text-white hover:text-sky-400"><Twitter size={16} /></a>
                                        <a href={e.socials[2]} className="text-white hover:text-pink-400"><Instagram size={16} /></a>
                                        <a href={e.socials[3]} className="text-white hover:text-green-400"><MessageCircle size={16} /></a>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <p className="font-semibold text-slate-900 dark:text-white">{e.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{e.title}</p>
                                </div>
                            </div>
                        </GlareHover>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
