import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun } from "../components/animate-ui/icons/sun";
import { Moon } from "../components/animate-ui/icons/moon";
import { Menu } from "../components/animate-ui/icons/menu";
import { X } from "../components/animate-ui/icons/x";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto w-full relative z-50 bg-white md:bg-transparent dark:bg-slate-950 md:dark:bg-transparent">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold opacity-90 shadow-sm border border-indigo-800">
            <span className="font-serif">AU</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl tracking-tighter text-indigo-950 dark:text-indigo-400 leading-none">FOSSA</span>
            <span className="text-[0.65rem] font-medium leading-tight text-slate-600 dark:text-slate-400 hidden sm:block">Faculty of Science<br/>Students' Association</span>
        </div>
      </Link>
      <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <Link to="/" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">About</Link>
        <Link to="/executives" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Executives</Link>
        <Link to="/departments" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Departments</Link>
        <Link to="/events" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Events</Link>
        <Link to="/gallery" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Gallery</Link>
        <Link to="/contact" className="hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Contact</Link>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden md:block">
            {theme === 'dark' ? <Sun className="w-5 h-5" animateOnHover={true} animateOnTap={true} /> : <Moon className="w-5 h-5" animateOnHover={true} animateOnTap={true} />}
        </button>
        <Link to="/dashboard" className="hidden md:inline-flex px-5 py-2 text-sm font-semibold text-indigo-900 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors">Login</Link>
        <button className="hidden md:inline-flex px-5 py-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-lg transition-colors">Join FOSSA</button>
        
        <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400">
                {theme === 'dark' ? <Sun className="w-5 h-5" animateOnHover={true} animateOnTap={true} /> : <Moon className="w-5 h-5" animateOnHover={true} animateOnTap={true} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-400">
                {mobileMenuOpen ? <X className="w-6 h-6" animateOnHover={true} animateOnTap={true} /> : <Menu className="w-6 h-6" animateOnHover={true} animateOnTap={true} />}
            </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 shadow-lg md:hidden flex flex-col gap-4">
             <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">Home</Link>
             <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">About</Link>
             <Link to="/executives" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">Executives</Link>
             <Link to="/departments" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">Departments</Link>
             <Link to="/events" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">Events</Link>
             <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-50 dark:border-slate-800">Contact</Link>
        </div>
      )}
    </nav>
  );
};