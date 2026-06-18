import React from 'react';
import { Users as GraduationCap } from "./animate-ui/icons/users";
import { Link } from 'react-router-dom';

export const GPAOverview = () => {
    return (
        <section className="p-5 md:p-6 bg-[#1a1558] dark:bg-slate-900 border border-transparent dark:border-slate-800 text-white rounded-[1.25rem] shadow-sm relative overflow-hidden transition-colors duration-200">
            {/* Watermark Icon */}
            <GraduationCap className="absolute right-4 top-4 w-28 h-28 text-indigo-400 opacity-20 pointer-events-none stroke-[1.5]" animateOnHover={true} animateOnTap={true} />
            
            <div className="relative z-10 flex flex-col w-full h-full">
                <h2 className="text-[0.75rem] font-bold text-white mb-2 pb-0.5">GPA Overview</h2>
                <p className="text-[0.65rem] text-indigo-200 font-bold mb-1">Current GPA</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-[2.25rem] font-black tracking-tight leading-none">3.68</p>
                    <p className="text-[0.8rem] font-bold text-indigo-100">/ 5.00</p>
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                    <p className="text-[0.65rem] font-medium text-indigo-200">Out of 5.00</p>
                    <Link to="/dashboard/gpa-calculator" className="px-4 py-2 bg-white text-[#1a1558] rounded-lg font-bold text-[0.65rem] hover:bg-slate-100 transition-colors shadow-sm ml-auto z-20 relative">
                        Open GPA Calculator
                    </Link>
                </div>
            </div>
        </section>
    );
};