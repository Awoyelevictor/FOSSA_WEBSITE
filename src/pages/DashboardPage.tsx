import React from 'react';
import { StatsOverview } from '../components/StatsOverview';
import { QuickAccess } from '../components/QuickAccess';
import { GPAOverview } from '../components/GPAOverview';
import { Announcements } from '../components/Announcements';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { RecentlyAddedResources } from '../components/RecentlyAddedResources';
import { Clock as Calendar } from '../components/animate-ui/icons/clock';
import { ClipboardList as FileText } from '../components/animate-ui/icons/clipboard-list';
import { Bell } from '../components/animate-ui/icons/bell';
import { Users } from '../components/animate-ui/icons/users';
import { Link } from 'react-router-dom';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const DashboardPage = () => {
    return (
        <div className="max-w-7xl mx-auto w-full pb-10">
            <div className="mb-6">
                <AnimateIn direction="down" delay={0.05}>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-bold mb-0.5">Welcome back,</p>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white transition-colors duration-200 tracking-tight">
                        <AnimatedText text="Goodluck! 👋" />
                    </h1>
                </AnimateIn>
            </div>

            {/* Mobile Nav Grid replacing Stats Overview on mobile */}
            <AnimateStaggerContainer delay={0.06} className="grid grid-cols-4 gap-3 mb-8">
                <AnimateStaggerItem>
                    <Link to="/dashboard/events" className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm gap-2 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30">
                            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <span className="text-[0.65rem] font-bold text-slate-700 dark:text-slate-300">Events</span>
                    </Link>
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <Link to="/dashboard/resources" className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm gap-2 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30">
                            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <span className="text-[0.65rem] font-bold text-slate-700 dark:text-slate-300">Resources</span>
                    </Link>
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <Link to="/dashboard/announcements" className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm gap-2 hover:border-orange-500/50 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-orange-50 dark:bg-orange-900/30">
                            <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <span className="text-[0.65rem] font-bold text-slate-700 dark:text-slate-300">Notices</span>
                    </Link>
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <Link to="/dashboard/members" className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm gap-2 hover:border-purple-500/50 hover:shadow-md transition-all duration-300">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/30">
                            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <span className="text-[0.65rem] font-bold text-slate-700 dark:text-slate-300">Members</span>
                    </Link>
                </AnimateStaggerItem>
            </AnimateStaggerContainer>
            
            <AnimateStaggerContainer delay={0.08} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <AnimateStaggerItem className="lg:col-span-2">
                    <QuickAccess />
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <GPAOverview />
                </AnimateStaggerItem>
            </AnimateStaggerContainer>
            
            <AnimateStaggerContainer delay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimateStaggerItem>
                    <Announcements />
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <UpcomingEvents />
                </AnimateStaggerItem>
                <AnimateStaggerItem className="md:col-span-2 lg:col-span-1">
                    <RecentlyAddedResources />
                </AnimateStaggerItem>
            </AnimateStaggerContainer>
        </div>
    );
};
