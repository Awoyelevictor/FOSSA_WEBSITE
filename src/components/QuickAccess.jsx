import React from 'react';
import { ClipboardList as FileText } from './animate-ui/icons/clipboard-list';
import { ClipboardList as BookOpen } from './animate-ui/icons/clipboard-list';
import { LayoutDashboard as Calculator } from './animate-ui/icons/layout-dashboard'; // using dashboard for calc for now
import { Clock as Calendar } from './animate-ui/icons/clock';
import { Link } from 'react-router-dom';

export const QuickAccess = () => {
  const tools = [
    { icon: FileText, label: 'Past Questions', path: '/dashboard/past-questions' },
    { icon: BookOpen, label: 'Lecture Notes', path: '/dashboard/lecture-notes' },
    { icon: Calculator, label: 'GPA Calculator', path: '/dashboard/gpa-calculator' },
    { icon: Calendar, label: 'Timetable', path: '/dashboard/timetable' },
  ];
  return (
    <section className="bg-transparent h-full transition-colors duration-200 flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-[1.05rem] font-bold text-slate-900 dark:text-white">Quick Access</h2>
        <Link to="/dashboard/quick-access" className="text-xs font-bold text-indigo-600 dark:text-indigo-400">View All</Link>
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4 flex-grow">
        {tools.map((tool, i) => (
          <Link to={tool.path} key={i} className="flex flex-col items-center justify-start gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-200 group">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shadow-sm">
                <tool.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
            </div>
            <span className="text-[0.6rem] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">{tool.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
