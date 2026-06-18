import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

export const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.section ref={ref} style={{ y, opacity }} className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/20 border border-indigo-800">
           <span className="font-serif text-sm">AU</span>
        </div>
        <div>
            <h2 className="text-xl font-extrabold text-indigo-950 dark:text-indigo-300 leading-tight">FOSSA</h2>
            <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Faculty of Science Students' Association</p>
        </div>
      </div>
      <h1 className="text-6xl font-extrabold tracking-tighter mb-6 text-slate-950 dark:text-white leading-tight">Empowering Minds.<br/>Building the Future.</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">The official platform of the Faculty of Science Students' Association. Together, we inspire academic excellence and innovation.</p>
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors">Join FOSSA</button>
        <Link to="/departments" className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Explore Departments</Link>
      </div>
    </motion.section>
  );
};
