import React from 'react';
import { Clock as Calendar } from "./animate-ui/icons/clock";
import { ClipboardList as FileText } from "./animate-ui/icons/clipboard-list";
import { Bell } from "./animate-ui/icons/bell";
import { Users } from "./animate-ui/icons/users";

export const StatsOverview = () => {
  const stats = [
    { label: 'Upcoming Events', value: '3', icon: Calendar, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'New Resources', value: '12', icon: FileText, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: 'Unread Notices', value: '2', icon: Bell, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30' },
    { label: 'Active Members', value: '150', icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  ];
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm flex items-center gap-4 transition-colors duration-200 hover:shadow-md">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 shadow-sm border border-white dark:border-transparent ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{stat.value}</p>
            <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 font-semibold">{stat.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
};