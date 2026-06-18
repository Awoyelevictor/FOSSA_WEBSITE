import React, { useState } from 'react';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';
import { Sparkles } from '../components/animate-ui/icons/sparkles';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { Calendar, Clock, User, MapPin, Search } from 'lucide-react';

export const PublicEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
    
    const events = [
        {
            id: 1,
            title: "FOSSA Annual Hackathon 2026",
            date: "Nov 12, 2026",
            time: "09:00 AM - 05:55 PM",
            venue: "Adeleke University Amphitheatre",
            category: "Competition",
            description: "A premium 24-hour engineering challenge mapping software systems, database security, and AI integrations. Build prototypes side-by-side with industry experts.",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
            speakers: ["Prof. Adeleke J. O.", "Goodluck (Lead Dev)"],
        },
        {
            id: 2,
            title: "Molecular Biochemistry Seminar",
            date: "Oct 24, 2026",
            time: "11:00 AM - 02:00 PM",
            venue: "Block C Main Auditorium",
            category: "Academic Lecture",
            description: "An deep seminar reviewing metabolic disorders, biosafety standards, immunology mutations, and cancer diagnosis breakthrough arrays.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&h=350&auto=format&fit=crop",
            speakers: ["Dr. Evelyn Thompson", "Prof. Alabi J."],
        },
        {
            id: 3,
            title: "Freshmen Orientation & Induction Gala",
            date: "Nov 04, 2026",
            time: "04:00 PM - 08:30 PM",
            venue: "Faculty Suite Lawn Area",
            category: "Social Event",
            description: "FOSSA's formal welcome gala introducing first-year science students to departments, curriculum, administrative staff, and outstanding support networks.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
            speakers: ["Faculty President", "Dr. Mrs. Susan T."],
        },
        {
            id: 4,
            title: "Diagnostic Microbiology & Virology Labs",
            date: "Dec 02, 2026",
            time: "10:00 AM - 01:00 PM",
            venue: "Biosafety Level-3 Diagnostic lab",
            category: "Workshop",
            description: "Practical clinical isolation labs. Experience hands-on diagnostics, incubation arrays, and molecular DNA sequencing using advanced laboratory equipment.",
            image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
            speakers: ["Mr. Ibrahim Bello", "Dr. Evelyn T."],
        }
    ];

    const handleRegister = (id: number) => {
        if (registeredEvents.includes(id)) {
            setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
        } else {
            setRegisteredEvents([...registeredEvents, id]);
        }
    };

    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 text-left">
            {/* Header section */}
            <div className="max-w-3xl mb-12">
                <AnimateIn direction="down" delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-full text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" animateOnHover={true} />
                        Campus Life
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <AnimatedText text="FOSSA Events Calendar" />
                    </h1>
                    <p className="text-slate-550 dark:text-slate-400 mt-4 text-base md:text-lg leading-relaxed font-semibold">
                        Gain insights, connect with industry experts, and celebrate academic milestones. Find schedules, venues, and secure your event tickets.
                    </p>
                </AnimateIn>
            </div>

            {/* Filter Search */}
            <AnimateIn direction="up" delay={0.1} className="mb-8 max-w-xl">
                <div className="relative">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by keyword, speaker, or category (e.g. Hackathon)..."
                        className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-800 text-slate-900 dark:text-white text-sm rounded-xl block w-full pl-4 pr-12 py-3.5 focus:outline-none focus:border-indigo-500/30 font-semibold shadow-sm transition-all text-left"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 font-bold text-xs uppercase gap-1.5">
                        <Search className="w-4 h-4 text-slate-400" />
                        <span>Filter</span>
                    </div>
                </div>
            </AnimateIn>

            {/* Event List */}
            <AnimateStaggerContainer delay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEvents.map((evt) => {
                    const isRegistered = registeredEvents.includes(evt.id);
                    return (
                        <AnimateStaggerItem key={evt.id}>
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col h-full group hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300">
                                <div className="h-48 md:h-56 relative overflow-hidden flex-shrink-0">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                                        {evt.category}
                                    </div>
                                    <img 
                                        src={evt.image} 
                                        alt={evt.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        referrerPolicy="no-referrer"
                                    />
                                </div>

                                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                                    <div>
                                        <div className="flex gap-4 items-center text-xs text-slate-400 font-bold mb-3">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                                                <span>{evt.date}</span>
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                                                <span>{evt.time}</span>
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {evt.title}
                                        </h3>

                                        <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                            {evt.description}
                                        </p>

                                        <div className="border-t border-slate-50 dark:border-slate-800/60 pt-4 mb-6">
                                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Guest Lecturers:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {evt.speakers.map((spk, sIdx) => (
                                                    <span key={sIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-800/30 text-slate-650 dark:text-slate-400 text-[10px] font-bold rounded-lg border border-slate-100 dark:border-slate-800">
                                                        <User className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                                                        <span>{spk}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mt-auto pt-2">
                                        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide">
                                            <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                                            <span>Venue: {evt.venue}</span>
                                        </span>

                                        <button 
                                            onClick={() => handleRegister(evt.id)}
                                            className={`w-full sm:w-auto px-6 py-2.5 text-xs font-black rounded-lg transition-all border ${
                                                isRegistered 
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400' 
                                                    : 'bg-indigo-600 border-transparent text-white hover:bg-slate-900 dark:hover:bg-indigo-700 pointer-events-auto cursor-pointer'
                                            }`}
                                        >
                                            {isRegistered ? '✓ Registered' : 'Get Seat Ticket'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimateStaggerItem>
                    );
                })}
            </AnimateStaggerContainer>
        </div>
    );
};
