import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { ChevronRight } from '../components/animate-ui/icons/chevron-right';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="max-w-5xl mx-auto w-full pb-10 text-left">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="Settings" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your app preferences.</p>
                    </div>
                </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                <div className="space-y-8 text-left">
                    {/* General Settings */}
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">General Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Language</span>
                                <div className="relative">
                                    <select className="appearance-none bg-transparent text-slate-500 dark:text-slate-400 text-sm focus:outline-none pr-6 cursor-pointer font-medium text-right bg-white dark:bg-slate-900">
                                        <option>English</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-slate-400">
                                        <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Theme</span>
                                <div className="relative">
                                    <select 
                                        value={theme}
                                        onChange={toggleTheme}
                                        className="appearance-none bg-transparent text-slate-500 dark:text-slate-400 text-sm focus:outline-none pr-6 cursor-pointer font-medium text-right bg-white dark:bg-slate-900"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-slate-400">
                                        <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pb-2">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Notifications</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Security</h3>
                        
                        <div className="flex items-center justify-between pb-2 cursor-pointer group">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Change Password</span>
                            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" animateOnHover={true} animateOnTap={true} />
                        </div>
                    </div>
                </div>
            </AnimateIn>
        </div>
    );
};
