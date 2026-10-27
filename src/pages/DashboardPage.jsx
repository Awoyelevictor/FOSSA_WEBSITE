import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/adminApi';
import { QuickAccess } from '../components/QuickAccess';
import { GPAOverview } from '../components/GPAOverview';
import { Announcements } from '../components/Announcements';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { RecentlyAddedResources } from '../components/RecentlyAddedResources';
import { Clock as Calendar } from '../components/animate-ui/icons/clock';
import { ClipboardList as FileText } from '../components/animate-ui/icons/clipboard-list';
import { Bell } from '../components/animate-ui/icons/bell';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    return () => data.subscription.unsubscribe();
  }, []);
  const metadata = user?.user_metadata || {};
  const displayName = metadata.display_name || metadata.full_name || metadata.name || user?.email?.split('@')[0] || 'Student';
  const firstName = displayName.trim().split(/\s+/)[0] || 'Student';
  const shortcuts = [
    { label: 'Events', path: '/dashboard/events', icon: Calendar, tone: 'indigo' },
    { label: 'Resources', path: '/dashboard/resources', icon: FileText, tone: 'emerald' },
    { label: 'Notices', path: '/dashboard/announcements', icon: Bell, tone: 'orange' },
    { label: 'Timetable', path: '/dashboard/timetable', icon: Calendar, tone: 'purple' },
  ];
  return <div className="mx-auto w-full max-w-7xl pb-10">
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <AnimateIn direction="down" delay={0.05}><p className="mb-0.5 text-sm font-bold text-slate-700 dark:text-slate-300">Welcome back, {firstName}!</p><h1 className="text-3xl font-black tracking-tight text-slate-900 transition-colors duration-200 dark:text-white"><AnimatedText text="Your FOSSA dashboard" /></h1>{user?.email && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>}</AnimateIn>
      <Link to="/dashboard/profile" className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300"><span aria-hidden="true">✎</span> Edit profile</Link>
    </div>
    <AnimateStaggerContainer delay={0.06} className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {shortcuts.map(({label,path,icon:Icon,tone}) => <AnimateStaggerItem key={path}><Link to={path} className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-indigo-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tone==='emerald'?'bg-emerald-50 dark:bg-emerald-900/30':tone==='orange'?'bg-orange-50 dark:bg-orange-900/30':tone==='purple'?'bg-purple-50 dark:bg-purple-900/30':'bg-indigo-50 dark:bg-indigo-900/30'}`}><Icon className={`h-5 w-5 ${tone==='emerald'?'text-emerald-600 dark:text-emerald-400':tone==='orange'?'text-orange-600 dark:text-orange-400':tone==='purple'?'text-purple-600 dark:text-purple-400':'text-indigo-600 dark:text-indigo-400'}`} /></div><span className="text-[0.7rem] font-bold text-slate-700 dark:text-slate-300">{label}</span></Link></AnimateStaggerItem>)}
    </AnimateStaggerContainer>
    <AnimateStaggerContainer delay={0.08} className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3"><AnimateStaggerItem className="lg:col-span-2"><QuickAccess /></AnimateStaggerItem><AnimateStaggerItem><GPAOverview /></AnimateStaggerItem></AnimateStaggerContainer>
    <AnimateStaggerContainer delay={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"><AnimateStaggerItem><Announcements /></AnimateStaggerItem><AnimateStaggerItem><UpcomingEvents /></AnimateStaggerItem><AnimateStaggerItem className="md:col-span-2 lg:col-span-1"><RecentlyAddedResources /></AnimateStaggerItem></AnimateStaggerContainer>
  </div>;
};
