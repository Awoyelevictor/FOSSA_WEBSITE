import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, MessageCircle, ShieldCheck } from 'lucide-react';
import { executivesData } from '../data';

const socialLinks = [
    { key: 0, label: 'LinkedIn', Icon: Linkedin, className: 'hover:text-blue-500' },
    { key: 1, label: 'Twitter', Icon: Twitter, className: 'hover:text-sky-500' },
    { key: 2, label: 'Instagram', Icon: Instagram, className: 'hover:text-pink-500' },
    { key: 3, label: 'WhatsApp', Icon: MessageCircle, className: 'hover:text-green-500' }
];

export const ExecutivesPage = () => {
    const showingMockData = executivesData.some((executive) => executive.isMock);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 text-center"
                >
                    Meet the FOSSA Executives
                </motion.h1>
                <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600 dark:text-slate-400">
                    Get to know the student leaders and the responsibilities of each executive office.
                </p>

                {showingMockData && (
                    <div role="status" className="mx-auto mb-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-left text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                        <ShieldCheck className="mt-0.5 shrink-0" size={21} />
                        <div>
                            <p className="font-bold">Preview — mock executive data</p>
                            <p className="mt-1 text-sm">These are sample positions and placeholder profiles, not the names of real or officially appointed officers. Replace them with approved details before publishing the official roster.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {executivesData.map((e, i) => (
                        <motion.article
                            key={e.id || e.matricNumber || i}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-7 md:p-8 shadow-sm flex flex-col gap-5 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex flex-col items-center text-center">
                                <img src={e.avatar} alt={`${e.name} placeholder avatar`} loading="lazy" className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-slate-100 dark:border-slate-800" referrerPolicy="no-referrer" />
                                <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{e.name}</h2>
                                <p className="mt-1 text-indigo-600 dark:text-indigo-400 font-semibold">{e.title}</p>
                                <p className="mt-2 text-xs text-slate-500">Matric No: {e.matricNumber}</p>
                                {e.isMock && <span className="mt-3 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">Mock profile</span>}
                                {e.accessRole === 'editor' && <span className="mt-2 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">Intended access: Editor</span>}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Vision</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{e.vision}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">About</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">{e.about}</p>
                                </div>
                            </div>

                            {socialLinks.some(({ key }) => e.socials?.[key] && e.socials[key] !== '#') && (
                                <div className="flex justify-center gap-4 mt-auto pt-5 border-t border-slate-100 dark:border-slate-800">
                                    {socialLinks.map(({ key, label, Icon, className }) => e.socials?.[key] && e.socials[key] !== '#' ? (
                                        <a key={label} href={e.socials[key]} aria-label={label} target="_blank" rel="noreferrer" className={`text-slate-400 transition-colors ${className}`}>
                                            <Icon size={19} />
                                        </a>
                                    ) : null)}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </main>
        </div>
    );
};
