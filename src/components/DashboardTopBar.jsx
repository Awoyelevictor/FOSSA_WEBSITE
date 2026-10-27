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
  const titles = {
    '/dashboard': 'Dashboard',
    '/dashboard/quick-access': 'Quick Access',
    '/dashboard/resources': 'Resources',
    '/dashboard/past-questions': 'Past Questions',
    '/dashboard/lecture-notes': 'Lecture Notes',
    '/dashboard/timetable': 'Timetable',
    '/dashboard/gpa-calculator': 'GPA Calculator',
    '/dashboard/events': 'Events',
    '/dashboard/announcements': 'Notices',
    '/dashboard/profile': 'Profile',
    '/dashboard/settings': 'Settings',
    '/dashboard/help': 'Help & Support',
    '/dashboard/more': 'More'
  };
  const title = titles[location.pathname] || 'Dashboard';
  return <header className="flex items-center justify-between p-4 md:px-8 md:py-5 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200 flex-shrink-0">
    <div className="flex items-center gap-2 lg:w-48">
      <div className="flex lg:hidden items-center">
        {location.pathname !== '/dashboard' ? <Link to="/dashboard" aria-label="Back to dashboard" className="p-1 -ml-1 text-slate-600 dark:text-slate-400"><ChevronLeft className="w-5 h-5" /></Link> : <button onClick={onMenuClick} aria-label="Open navigation menu" className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Menu className="w-5 h-5" /></button>}
      </div>
      <div className="flex flex-col ml-1 lg:ml-0"><span className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white leading-none hidden lg:block">FOSSA</span><span className="text-[0.65rem] font-medium leading-tight text-slate-500 dark:text-slate-400 hidden lg:block uppercase tracking-wider">Faculty of Science<br />Association</span></div>
    </div>
    <div className="lg:hidden absolute left-1/2 -translate-x-1/2 font-bold text-slate-900 dark:text-white text-base">{title}</div>
    <div className="flex-grow flex justify-center px-4 max-w-2xl hidden sm:flex">
      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2.5 rounded-full w-full border border-transparent focus-within:border-indigo-200 dark:focus-within:border-indigo-900/50">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input type="search" aria-label="Search dashboard" placeholder="Search resources, events, notices..." onKeyDown={e => { if (e.key === 'Enter' && e.currentTarget.value.trim()) window.location.href = `/dashboard/resources?search=${encodeURIComponent(e.currentTarget.value.trim())}`; }} className="bg-transparent focus:outline-none w-full text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400" />
      </div>
    </div>
    <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
      <Link to="/dashboard/announcements" aria-label="Open notices" className="relative p-1"><Bell className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" /></Link>
      <button type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors">{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
      <div className="hidden md:block pl-2 md:pl-5 md:border-l border-slate-200 dark:border-slate-800"><p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">FOSSA Member</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Student account</p></div>
    </div>
  </header>;
};
