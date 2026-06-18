import React, { useState } from 'react';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';
import { Sparkles } from '../components/animate-ui/icons/sparkles';

export const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;
        setSubmitted(true);
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 text-left">
            {/* Header section */}
            <div className="max-w-3xl mb-12">
                <AnimateIn direction="down" delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-905/30 border border-indigo-100 dark:border-indigo-900 rounded-full text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" animateOnHover={true} />
                        Get In Touch
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <AnimatedText text="Contact FOSSA Office" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg leading-relaxed font-semibold">
                        Have question reports, sponsorship proposals, or technical inquiries about academic outlines? Fill the portal ticket or call the administrative officers.
                    </p>
                </AnimateIn>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
                {/* Form column */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
                    <AnimateIn direction="up" delay={0.1}>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">Send Administrative Message</h2>
                        
                        {submitted ? (
                            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-250 dark:border-emerald-900 rounded-3xl text-emerald-800 dark:text-emerald-400">
                                <h3 className="font-extrabold text-base mb-1">✓ Inquiry Broadcasted!</h3>
                                <p className="text-xs font-semibold">Your portal message has been securely submitted. A FOSSA representative will correspond shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Samuel Ade"
                                            required
                                            className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-901 dark:text-white text-xs rounded-xl block w-full px-4 py-3.5 focus:outline-none focus:border-indigo-500/20 font-semibold text-left"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="e.g. sam@adeleke.edu.ng"
                                            required
                                            className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-901 dark:text-white text-xs rounded-xl block w-full px-4 py-3.5 focus:outline-none focus:border-indigo-500/20 font-semibold text-left"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Inquiry / Message Notes</label>
                                    <textarea 
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Outline description of your question, suggestion, or ticket inquiry..."
                                        required
                                        className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-901 dark:text-white text-xs rounded-xl block w-full px-4 py-3.5 focus:outline-none focus:border-indigo-500/20 font-semibold text-left"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-4 bg-indigo-600 hover:bg-slate-900 dark:hover:bg-indigo-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-md"
                                >
                                    Transmit Portal Message
                                </button>
                            </form>
                        )}
                    </AnimateIn>
                </div>

                {/* Info column */}
                <div className="lg:col-span-5 space-y-6">
                    <AnimateIn direction="up" delay={0.15}>
                        <div className="p-6 md:p-8 bg-slate-100 dark:bg-slate-905/30 border border-slate-150 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase mb-4">Secretariat Address</h3>
                            <ul className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-500 flex-shrink-0">📍</span>
                                    <span>Faculty of Science Hub Block B, Room 102, Adeleke University, Ede, Osun State, Nigeria.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-500 flex-shrink-0">📧</span>
                                    <span>support@fossa-au.edu.ng</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-500 flex-shrink-0">📞</span>
                                    <span>+234 (0) 805 FOSSA ADMIN</span>
                                </li>
                            </ul>
                        </div>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.2}>
                        <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] text-left">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase mb-4">Student Association Executives</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-[#2e1065] flex-shrink-0">
                                        P
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">FOSSA President</h4>
                                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase mt-0.5">Faculty Executive Office</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-[#2e1065] flex-shrink-0">
                                        O
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-800 dark:text-white">Admin Officer / Secretary</h4>
                                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase mt-0.5">Communications & Syllabi Updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
};
