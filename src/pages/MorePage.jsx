import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleQuestion } from '../components/animate-ui/icons/message-circle-question';
import { Lock } from '../components/animate-ui/icons/lock';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { BadgeCheck } from '../components/animate-ui/icons/badge-check';
import { LogOut } from '../components/animate-ui/icons/log-out';
import { ChevronRight } from '../components/animate-ui/icons/chevron-right';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const MorePage = () => {
    return (
        <div className="max-w-3xl mx-auto w-full pb-10 text-left">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden lg:block">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="More" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Additional links and resources.</p>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 transition-colors duration-200 overflow-hidden">
                <div className="flex flex-col">
                    <Link to="/dashboard/help" className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <MessageCircleQuestion className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Help &amp; Support</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" animateOnHover={true} animateOnTap={true} />
                    </Link>

                    <a href="#" className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <Lock className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Privacy Policy</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" animateOnHover={true} animateOnTap={true} />
                    </a>

                    <a href="#" className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                <ClipboardList className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Terms &amp; Conditions</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" animateOnHover={true} animateOnTap={true} />
                    </a>

                    <Link to="/dashboard/about" className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <BadgeCheck className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">About FUSSA</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-indigo-450 transition-colors" animateOnHover={true} animateOnTap={true} />
                    </Link>

                    <Link to="/" className="flex items-center justify-between p-5 md:p-6 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                                <LogOut className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <span className="text-sm font-bold text-red-600 transition-colors">Logout</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-300 group-hover:text-red-500 transition-colors" animateOnHover={true} animateOnTap={true} />
                    </Link>
                </div>
            </AnimateIn>
        </div>
    );
};
