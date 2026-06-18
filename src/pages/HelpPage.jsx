import React, { useState } from 'react';
import { MessageCircleQuestion } from '../components/animate-ui/icons/message-circle-question';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { MessageSquareText } from '../components/animate-ui/icons/message-square-text';
import { Sparkles } from '../components/animate-ui/icons/sparkles';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const HelpPage = () => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [ticketCategory, setTicketCategory] = useState('General Inquiry');
    const [ticketName, setTicketName] = useState('');
    const [ticketEmail, setTicketEmail] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');
    const [ticketSubmitted, setTicketSubmitted] = useState(false);

    const faqs = [
        {
            id: 1,
            question: "How do I calculate or reference my GPA on FOSSA?",
            answer: "Go to the GPA Calculator in the sidebar menu. You can enter course codes, unit values, and letter grades. The portal automatically computes your GPA on a 5.0 scale using local industry-standard grade values."
        },
        {
            id: 2,
            question: "Why are some past questions marked with a Lock icon?",
            answer: "Lock icons indicate verified premium past papers issued by oficers. They are unlocked when you are registered and logged in as an active member of FOSSA (Faculty of Science Student Association)."
        },
        {
            id: 3,
            question: "How do I download lecture notes or course outlines?",
            answer: "Under 'Academic Materials', select 'Lecture Notes' or 'Course Outlines'. Choose your department or course level from the filter dropdowns and click 'Download' or 'View'."
        },
        {
            id: 4,
            question: "Who should I contact if I notice incorrect material details?",
            answer: "Please use the 'Submit a Ticket' form on this page or send an email containing the course code to portal-ops@fossa-au.edu.ng."
        },
    ];

    const handleSubmitTicket = (e) => {
        e.preventDefault();
        setTicketSubmitted(true);
        setTimeout(() => {
            setTicketSubmitted(false);
            setTicketName('');
            setTicketEmail('');
            setTicketMessage('');
        }, 3500);
    };

    return (
        <div className="max-w-4xl mx-auto w-full pb-16 text-left">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden lg:block">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="Help & Support" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Need help? We're here to assist you.</p>
                    </div>
                </div>
            </AnimateIn>

            {/* Quick Contacts */}
            <AnimateStaggerContainer delay={0.05} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <AnimateStaggerItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-left h-full">
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Email Support</h3>
                        <p className="text-base font-bold text-slate-900 dark:text-white mb-2">support@fossa-au.net</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Response within 24 business hours.</p>
                    </div>
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-left h-full">
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Office Location</h3>
                        <p className="text-base font-bold text-slate-900 dark:text-white mb-2">Block C, Faculty of Science Suite</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Adeleke University Campus.</p>
                    </div>
                </AnimateStaggerItem>
                <AnimateStaggerItem>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm text-left h-full">
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Support Hours</h3>
                        <p className="text-base font-bold text-slate-900 dark:text-white mb-2">09:00 AM - 04:00 PM</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Monday to Friday (Closed Holidays).</p>
                    </div>
                </AnimateStaggerItem>
            </AnimateStaggerContainer>

            {/* FAQ Accordion */}
            <AnimateIn direction="up" delay={0.15} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm mb-10 text-left">
                <div className="flex items-center gap-3 mb-6">
                    <MessageCircleQuestion className="w-6 h-6 text-indigo-600 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const isExpanded = expandedFaq === faq.id;
                        return (
                            <div key={faq.id} className="border-b border-slate-100 dark:border-slate-800 pb-4 last:border-b-0 last:pb-0">
                                <button 
                                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                                    className="w-full flex justify-between items-center text-left py-2 font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    <span className="text-sm md:text-base pr-4">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
                                </button>
                                {isExpanded && (
                                    <div className="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed pr-6 pl-1 animate-fade-in">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </AnimateIn>

            {/* Submit Support Ticket */}
            <AnimateIn direction="up" delay={0.2} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm text-left">
                <div className="flex items-center gap-3 mb-6">
                    <MessageSquareText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Submit a Support Ticket</h2>
                </div>

                {ticketSubmitted ? (
                    <div className="py-8 text-center flex flex-col items-center justify-center animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ticket Submitted Successfully!</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">We received your request. A member of FOSSA team will respond via email shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitTicket} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Your Name</label>
                                <input 
                                    type="text" 
                                    value={ticketName}
                                    onChange={(e) => setTicketName(e.target.value)}
                                    required
                                    placeholder="e.g. Goodluck"
                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    value={ticketEmail}
                                    onChange={(e) => setTicketEmail(e.target.value)}
                                    required
                                    placeholder="your-email@example.com"
                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Category</label>
                            <div className="relative">
                                <select 
                                    value={ticketCategory} 
                                    onChange={(e) => setTicketCategory(e.target.value)}
                                    className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-white text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Lecture Notes Issue">Lecture Notes Issue</option>
                                    <option value="GPA Calculator Issue">GPA Calculator Issue</option>
                                    <option value="Past Questions Access">Past Questions Access</option>
                                    <option value="Event Registration Issue">Event Registration Issue</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                    <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Describe your request</label>
                            <textarea 
                                rows={4}
                                value={ticketMessage}
                                onChange={(e) => setTicketMessage(e.target.value)}
                                required
                                placeholder="Details about what you need assistance with..."
                                className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                            />
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button type="submit" className="w-full md:w-auto px-8 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                )}
            </AnimateIn>
        </div>
    );
};

