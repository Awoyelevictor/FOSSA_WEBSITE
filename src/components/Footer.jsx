import React from 'react';
import { Link } from 'react-router-dom';

import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { PhoneCall as Phone } from "./animate-ui/icons/phone-call";

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-16 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-slate-600 dark:text-slate-400">
                
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/logo.png" alt="FOSSA Logo" className="w-10 h-10 object-contain rounded-full" />
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tighter text-indigo-950 dark:text-indigo-400">FOSSA</span>
                            <span className="text-[0.65rem] font-medium leading-tight">Faculty of Science<br/>Students Association</span>
                        </div>
                    </div>
                    <p className="text-sm">Empowering science students through excellence, innovation and community.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link></li>
                        <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</Link></li>
                        <li><Link to="/departments" className="hover:text-indigo-600 dark:hover:text-indigo-400">Departments</Link></li>
                        <li><Link to="/events" className="hover:text-indigo-600 dark:hover:text-indigo-400">Events</Link></li>
                        <li><Link to="/gallery" className="hover:text-indigo-600 dark:hover:text-indigo-400">Gallery</Link></li>
                        <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/dashboard/past-questions" className="hover:text-indigo-600 dark:hover:text-indigo-400">Past Questions</Link></li>
                        <li><Link to="/dashboard/lecture-notes" className="hover:text-indigo-600 dark:hover:text-indigo-400">Lecture Notes</Link></li>
                        <li><Link to="/dashboard/course-outlines" className="hover:text-indigo-600 dark:hover:text-indigo-400">Course Outlines</Link></li>
                        <li><Link to="/dashboard/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400">GPA Calculator</Link></li>
                        <li><Link to="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Faculty Handbook</Link></li>
                    </ul>
                </div>

                {/* Connect */}
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect With Us</h3>
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-indigo-700 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4" />
                            <span>fossa@adelekeuniversity.edu.ng</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4" animateOnHover={true} animateOnTap={true} />
                            <span>+234 800 123 4567</span>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="text-center text-sm text-slate-500 dark:text-slate-500 pt-8 border-t border-slate-200 dark:border-slate-800 max-w-7xl mx-auto px-6">
                © 2025 FOSSA, Adeleke University. All rights reserved.
            </div>
        </footer>
    );
};