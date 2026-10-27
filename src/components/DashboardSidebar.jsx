import React from 'react';
import { LayoutDashboard } from './animate-ui/icons/layout-dashboard';
import { ClipboardList as BookOpen } from './animate-ui/icons/clipboard-list';
import { ClipboardList as FileText } from './animate-ui/icons/clipboard-list';
import { Clock as Calendar } from './animate-ui/icons/clock';
import { Bell } from './animate-ui/icons/bell';
import { User } from './animate-ui/icons/user';
import { Settings } from './animate-ui/icons/settings';
import { MessageCircleQuestion as HelpCircle } from "./animate-ui/icons/message-circle-question";
import { LogOut } from './animate-ui/icons/log-out';
import { List as ListIcon } from './animate-ui/icons/list';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/adminApi';

export const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ListIcon, label: 'Quick Access', path: '/dashboard/quick-access' },
    { icon: FileText, label: 'Resources', path: '/dashboard/resources' },
    { icon: FileText, label: 'Past Questions', path: '/dashboard/past-questions' },
    { icon: BookOpen, label: 'Lecture Notes', path: '/dashboard/lecture-notes' },
    { icon: Calendar, label: 'Timetable', path: '/dashboard/timetable' },
    { icon: Calendar, label: 'Events', path: '/dashboard/events' },
    { icon: Bell, label: 'Notices', path: '/dashboard/announcements' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/help' },
  ];
  const logout = async () => {
    try { await supabase?.auth.signOut(); }
    finally { if (setIsOpen) setIsOpen(false); navigate('/login'); }
  };
  return <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-[#0f172a] p-4 text-slate-300 transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="mb-8 mt-4 flex items-center justify-center"><div className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-full border-4 border-indigo-900 bg-white/5 shadow-xl"><div className="absolute inset-0 rounded-full bg-blue-900/20" /><img src="/logo.png" alt="FOSSA Logo" className="z-10 h-16 w-16 object-contain drop-shadow-lg" /></div></div>
    <nav className="flex-grow space-y-1 overflow-y-auto pr-2 custom-scrollbar" aria-label="Dashboard navigation">
      {links.map(link => { const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path + '/')); return <Link key={link.path} onClick={() => setIsOpen && setIsOpen(false)} to={link.path} aria-current={isActive ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}><link.icon className="h-5 w-5" /><span className="text-[0.85rem] font-medium">{link.label}</span></Link>; })}
    </nav>
    <div className="mt-4 space-y-1 border-t border-slate-800/80 pb-2 pt-4"><button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"><LogOut className="h-5 w-5" /><span className="text-[0.85rem] font-medium">Log out</span></button></div>
  </aside>;
};
