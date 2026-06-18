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
    <motion.section 
      ref={ref} 
      style={{ y, opacity }} 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/day.png" 
          alt="Day Background" 
          className="w-full h-full object-cover dark:hidden"
        />
        <img 
          src="/night.png" 
          alt="Night Background" 
          className="w-full h-full object-cover hidden dark:block"
        />
        <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/20 transition-all">
             <img src="/logo.png" alt="FOSSA Logo" className="w-12 h-12 object-contain" />
          </div>
          <div>
              <h2 className="text-2xl font-black text-indigo-950 dark:text-white leading-tight drop-shadow-sm transition-colors">FOSSA</h2>
              <p className="text-xs font-bold text-indigo-600 dark:text-indigo-300 tracking-[0.2em] uppercase transition-colors">Faculty of Science Students Association</p>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-slate-950 dark:text-white leading-[1.1] max-w-4xl drop-shadow-md transition-colors">
          Empowering Minds.<br/>
          <span className="text-indigo-600 dark:text-indigo-400">Building</span> the Future.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-10 max-w-2xl leading-relaxed font-medium drop-shadow-sm transition-colors">
          The official platform of the Faculty of Science Students Association. Together, we inspire academic excellence and innovation.
        </p>
        
        <div className="flex flex-wrap gap-5">
          <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.03] active:scale-[0.98]">
            Join FOSSA
          </button>
          <Link 
            to="/departments" 
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-[0.98]"
          >
            Explore Departments
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
