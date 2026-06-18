import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardTopBar } from '../components/DashboardTopBar';
import { LayoutDashboard as Home } from '../components/animate-ui/icons/layout-dashboard';
import { ClipboardList as BookOpen } from '../components/animate-ui/icons/clipboard-list';
import { Clock as CalendarIcon } from '../components/animate-ui/icons/clock';
import { User } from '../components/animate-ui/icons/user';
import { Ellipsis as MoreHorizontal } from '../components/animate-ui/icons/ellipsis';

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex h-screen bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-hidden">
            <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-grow flex flex-col h-full w-full overflow-hidden pb-16 lg:pb-0 relative">
                <DashboardTopBar onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
                    <motion.div
                        key={location.pathname}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
                
                {/* Mobile Bottom Nav */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-2 flex justify-between items-center z-50 transition-colors duration-200 safe-area-bottom pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
                    <Link to="/dashboard" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/dashboard' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        <Home className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                        <span className="text-[0.6rem] font-bold">Home</span>
                    </Link>
                    <Link to="/dashboard/resources" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/dashboard/resources' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        <BookOpen className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                        <span className="text-[0.6rem] font-bold">Resources</span>
                    </Link>
                    <Link to="/dashboard/events" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/dashboard/events' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        <CalendarIcon className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                        <span className="text-[0.6rem] font-bold">Events</span>
                    </Link>
                    <Link to="/dashboard/profile" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/dashboard/profile' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        <User className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                        <span className="text-[0.6rem] font-bold">Profile</span>
                    </Link>
                    <Link to="/dashboard/more" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/dashboard/more' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        <MoreHorizontal className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                        <span className="text-[0.6rem] font-bold">More</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
