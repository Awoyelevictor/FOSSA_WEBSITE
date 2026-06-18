import React from 'react';
import { LayoutDashboard } from './animate-ui/icons/layout-dashboard';
import { ClipboardList as BookOpen } from './animate-ui/icons/clipboard-list';
import { ClipboardList as FileText } from './animate-ui/icons/clipboard-list';
import { Clock as Calendar } from './animate-ui/icons/clock';
import { Bell } from './animate-ui/icons/bell';
import { User } from './animate-ui/icons/user';
import { Settings } from './animate-ui/icons/settings';
import { MessageCircleQuestion as HelpCircle } from "./animate-ui/icons/message-circle-question";
import { LayoutDashboard as Calculator } from "./animate-ui/icons/layout-dashboard";
import { LogOut } from './animate-ui/icons/log-out';
import { ChevronDown } from './animate-ui/icons/chevron-down';
import { List as ListIcon } from './animate-ui/icons/list';
import { Link, useLocation } from 'react-router-dom';

export const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ListIcon, label: 'Quick Access', path: '/dashboard/quick-access' },
    { icon: FileText, label: 'Resources', path: '/dashboard/resources', hasDropdown: true },
    { icon: FileText, label: 'Past Questions', path: '/dashboard/past-questions' },
    { icon: BookOpen, label: 'Lecture Notes', path: '/dashboard/lecture-notes' },
    { icon: BookOpen, label: 'Course Outlines', path: '/dashboard/course-outlines' },
    { icon: Calculator, label: 'GPA Calculator', path: '/dashboard/gpa-calculator' },
    { icon: Calendar, label: 'Events', path: '/dashboard/events' },
    { icon: Bell, label: 'Announcements', path: '/dashboard/announcements' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/help' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 h-screen p-4 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center mb-8 mt-4">
        {/* Simulating AU Logo */}
        <div className="w-24 h-24 bg-black rounded-full flex flex-col items-center justify-center border-4 border-indigo-900 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-900/30 rounded-full"></div>
            <span className="font-bold text-4xl text-indigo-400 font-serif z-10 -mb-1">AU</span>
            <div className="text-[0.35rem] tracking-[0.15em] text-indigo-200 uppercase z-10 w-full text-center px-1 font-semibold leading-tight">Adeleke<br/>University</div>
        </div>
      </div>
      
      <nav className="flex-grow space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {links.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={i} onClick={() => setIsOpen && setIsOpen(false)} to={link.path} className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'}`}>
              <div className="flex items-center gap-3">
                <link.icon className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                <span className="text-[0.85rem] font-medium">{link.label}</span>
              </div>
              {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" animateOnHover={true} animateOnTap={true} />}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-slate-800/80 pb-2 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
            <span className="text-[0.85rem] font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};