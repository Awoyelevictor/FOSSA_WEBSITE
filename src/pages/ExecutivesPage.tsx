import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { executivesData } from '../data';

export const ExecutivesPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-16 text-center"
                >
                    Meet the FOSSA Executives
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {executivesData.map((e, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm flex flex-col gap-6"
                        >
                            <img src={e.avatar} alt={e.name} className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-slate-100 dark:border-slate-800" referrerPolicy="no-referrer" />
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{e.name}</h3>
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{e.title}</p>
                                <p className="text-sm text-slate-500 mt-2">Matric No: {e.matricNumber}</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Vision</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{e.vision}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">About</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{e.about}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                <a href={e.socials[0]} className="text-slate-400 hover:text-blue-500"><Linkedin size={20} /></a>
                                <a href={e.socials[1]} className="text-slate-400 hover:text-sky-500"><Twitter size={20} /></a>
                                <a href={e.socials[2]} className="text-slate-400 hover:text-pink-500"><Instagram size={20} /></a>
                                <a href={e.socials[3]} className="text-slate-400 hover:text-green-500"><MessageCircle size={20} /></a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};
