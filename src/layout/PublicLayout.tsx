import React from 'react';
import { motion } from 'motion/react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LayoutDashboard as Home } from "../components/animate-ui/icons/layout-dashboard";
import { MessageSquareText as Info } from "../components/animate-ui/icons/message-square-text";
import { LayoutDashboard as Building2 } from "../components/animate-ui/icons/layout-dashboard";
import { Lock } from "../components/animate-ui/icons/lock";

export const PublicLayout = () => {
    const location = useLocation();
    
    return (
        <div className="min-h-screen bg-transparent font-sans text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 pb-16 md:pb-0">
            <Navbar />
            <div className="flex-grow">
                <motion.div
                    key={location.pathname}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
            
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-2 flex justify-between items-center z-50 transition-colors duration-200 safe-area-bottom pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
                <Link to="/" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    <Home className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                    <span className="text-[0.6rem] font-bold">Home</span>
                </Link>
                <Link to="/about" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/about' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    <Info className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                    <span className="text-[0.6rem] font-bold">About</span>
                </Link>
                <Link to="/departments" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/departments' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    <Building2 className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                    <span className="text-[0.6rem] font-bold">Departments</span>
                </Link>
                <Link to="/dashboard" className={`flex flex-col items-center gap-1.5 ${location.pathname.startsWith('/dashboard') ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    <Lock className="w-[1.4rem] h-[1.4rem]" animateOnHover={true} animateOnTap={true} />
                    <span className="text-[0.6rem] font-bold">Login</span>
                </Link>
            </div>
        </div>
    );
};
