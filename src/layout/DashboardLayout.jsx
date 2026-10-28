import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/adminApi';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardTopBar } from '../components/DashboardTopBar';
import { LayoutDashboard as Home } from '../components/animate-ui/icons/layout-dashboard';
import { ClipboardList as BookOpen } from '../components/animate-ui/icons/clipboard-list';
import { Bell } from '../components/animate-ui/icons/bell';
import { Clock as CalendarIcon } from '../components/animate-ui/icons/clock';
import { Ellipsis as MoreHorizontal } from '../components/animate-ui/icons/ellipsis';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accessState, setAccessState] = useState('checking');
  const [accessError, setAccessError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // A lecturer's server-assigned role always wins over browser history or dashboard links.
  useEffect(() => {
    let active = true;
    const verifyDashboardAccess = async () => {
      setAccessState('checking');
      setAccessError('');
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!data.session) {
          navigate('/login', { replace: true });
          return;
        }
        const response = await fetch('/api/auth/profile', {
          headers: { Authorization: 'Bearer ' + data.session.access_token }
        });
        const profile = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(profile.error || 'Could not verify your FOSSA role.');
        if (!active) return;
        if (profile.role === 'lecturer') {
          navigate('/lecturer', { replace: true });
          return;
        }
        setAccessState('allowed');
      } catch (error) {
        if (!active) return;
        setAccessError(error.message || 'Could not verify your account role.');
        setAccessState('error');
      }
    };
    if (!supabase) {
      setAccessError('Authentication is not configured. Please contact the site administrator.');
      setAccessState('error');
    } else {
      verifyDashboardAccess();
    }
    return () => { active = false; };
  }, [location.pathname, navigate]);
  const navClass = path => `flex flex-col items-center gap-1.5 ${location.pathname === path ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`;
  if (accessState === 'checking') return <main className="flex min-h-[70vh] items-center justify-center px-4"><div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/><p className="font-bold">Verifying your FOSSA role…</p></div></main>;
  if (accessState === 'error') return <main className="flex min-h-[70vh] items-center justify-center px-4"><div className="max-w-lg rounded-2xl border border-amber-200 bg-white p-6 text-center shadow-sm dark:border-amber-900 dark:bg-slate-900"><h1 className="text-lg font-black">We couldn’t verify your account</h1><p role="alert" className="mt-2 text-sm text-slate-600 dark:text-slate-300">{accessError}</p><button onClick={() => navigate('/login', { replace: true })} className="mt-5 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white">Return to sign in</button></div></main>;

  return <div className="flex h-screen bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-hidden">
    <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    {sidebarOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    <div className="flex-grow flex flex-col h-full w-full overflow-hidden pb-16 lg:pb-0 relative">
      <DashboardTopBar onMenuClick={() => setSidebarOpen(true)} />
      <main className="p-4 md:p-8 overflow-y-auto flex-grow custom-scrollbar"><motion.div key={location.pathname} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}><Outlet /></motion.div></main>
      <nav aria-label="Mobile dashboard navigation" className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-5 py-2 flex justify-between items-center z-50 safe-area-bottom pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link to="/dashboard" className={navClass('/dashboard')}><Home className="w-5 h-5" /><span className="text-[0.6rem] font-bold">Home</span></Link>
        <Link to="/dashboard/resources" className={navClass('/dashboard/resources')}><BookOpen className="w-5 h-5" /><span className="text-[0.6rem] font-bold">Resources</span></Link>
        <Link to="/dashboard/announcements" className={navClass('/dashboard/announcements')}><Bell className="w-5 h-5" /><span className="text-[0.6rem] font-bold">Notices</span></Link>
        <Link to="/dashboard/timetable" className={navClass('/dashboard/timetable')}><CalendarIcon className="w-5 h-5" /><span className="text-[0.6rem] font-bold">Timetable</span></Link>
        <Link to="/dashboard/more" className={navClass('/dashboard/more')}><MoreHorizontal className="w-5 h-5" /><span className="text-[0.6rem] font-bold">More</span></Link>
      </nav>
    </div>
  </div>;
};
