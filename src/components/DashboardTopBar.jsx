import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from './animate-ui/icons/search';
import { Bell } from './animate-ui/icons/bell';
import { Moon } from './animate-ui/icons/moon';
import { Sun } from './animate-ui/icons/sun';
import { Menu } from './animate-ui/icons/menu';
import { ChevronLeft } from './animate-ui/icons/chevron-left';
import { useTheme } from '../context/ThemeContext';

export const DashboardTopBar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard/resources': return 'Resources';
      case '/dashboard/past-questions': return 'Past Questions';
      case '/dashboard/gpa-calculator': return 'GPA Calculator';
      case '/dashboard/events': return 'Events';
      case '/dashboard/announcements': return 'Announcements';
      case '/dashboard/profile': return 'Profile';
      case '/dashboard/settings': return 'Settings';
      case '/dashboard': return 'Dashboard';
      default: return 'Dashboard';
    }
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="flex items-center justify-between p-4 md:px-8 md:py-5 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200 flex-shrink-0">
      <div className="flex items-center gap-2 lg:w-48">
        <div className="flex lg:hidden items-center">
            {location.pathname !== '/dashboard' ? (
                <Link to="/dashboard" className="p-1 -ml-1 text-slate-600 dark:text-slate-400">
                    <ChevronLeft className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                </Link>
            ) : (
                <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold opacity-90 shadow-sm border border-indigo-800">
                    <span className="font-serif text-xs">AU</span>
                </div>
            )}
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white leading-none hidden lg:block">FUSSA</span>
            <span className="text-[0.65rem] font-medium leading-tight text-slate-500 dark:text-slate-400 hidden lg:block">Faculty of Science<br/>Students' Association</span>
        </div>
      </div>

      {/* Mobile Title Component */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 font-bold text-slate-900 dark:text-white text-base">
        {title}
      </div>

      <div className="flex-grow flex justify-center px-4 max-w-2xl hidden sm:flex">
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2.5 rounded-full w-full transition-colors duration-200 border border-transparent focus-within:border-indigo-200 dark:focus-within:border-indigo-900/50">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" animateOnHover={true} animateOnTap={true} />
            <input type="text" placeholder="Search resources, events, announcements..." className="bg-transparent focus:outline-none w-full text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400" />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
        <Link to="/dashboard/announcements" className="relative p-1">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" animateOnHover={true} animateOnTap={true} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">2</span>
        </Link>
        <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" animateOnHover={true} animateOnTap={true} /> : <Moon className="w-5 h-5" animateOnHover={true} animateOnTap={true} />}
        </button>
        <div className="flex items-center gap-3 pl-2 md:pl-5 md:border-l border-slate-200 dark:border-slate-800">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&auto=format&fit=crop" alt="User" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm border-2 border-white dark:border-slate-800 hidden md:block" referrerPolicy="no-referrer" />
            <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Goodluck E.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Computer Science</p>
            </div>
        </div>
      </div>
    </header>
  );
};
