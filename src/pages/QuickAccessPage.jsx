import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from '../components/animate-ui/icons/clipboard-list';
import { Calculator } from '../components/animate-ui/icons/calculator';
import { Clock } from '../components/animate-ui/icons/clock';
import { BookOpen } from '../components/animate-ui/icons/book-open';
import { Bell } from '../components/animate-ui/icons/bell';
import { FileText } from '../components/animate-ui/icons/file-text';

const tools = [
  { label: 'Lecture Notes', description: 'Open and download published lecture notes.', path: '/dashboard/lecture-notes', icon: BookOpen },
  { label: 'Past Questions', description: 'Search past exam papers by course and level.', path: '/dashboard/past-questions', icon: ClipboardList },
  { label: 'GPA Calculator', description: 'Calculate your GPA on a 5-point scale.', path: '/dashboard/gpa-calculator', icon: Calculator },
  { label: 'Timetable', description: 'Build your weekly class schedule.', path: '/dashboard/timetable', icon: Clock },
  { label: 'Notices', description: 'Read announcements and student updates.', path: '/dashboard/announcements', icon: Bell },
  { label: 'All Resources', description: 'Browse published academic resources.', path: '/dashboard/resources', icon: FileText },
];

export const QuickAccessPage = () => <div className="mx-auto w-full max-w-5xl pb-10 text-left">
  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Access</h1>
  <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">Open the student tools you use most.</p>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(({ label, description, path, icon: Icon }) => <Link key={path} to={path} className="group rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"><Icon className="h-5 w-5" /></div><h2 className="font-bold text-slate-900 dark:text-white">{label}</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p><span className="mt-4 inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400">Open →</span></Link>)}</div>
</div>;
