import React, { useState } from 'react';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';
import { Sparkles } from '../components/animate-ui/icons/sparkles';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { Calendar, Clock, User, MapPin, Search } from 'lucide-react';

export const PublicEventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [registeredEvents, setRegisteredEvents] = useState([]);
    
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

    const handleRegister = (id) => {
        if (registeredEvents.includes(id)) {
            setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
        } else {
            setRegisteredEvents([...registeredEvents, id]);
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto w-full pb-16 px-4 md:px-0">
            {/* Hero Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-10 text-left pt-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 text-[0.65rem] font-bold uppercase rounded-full tracking-widest">Global Seminars</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <span className="text-slate-400 dark:text-slate-500 text-[0.65rem] font-bold uppercase tracking-widest">Academic Year 2026</span>
                        </div>
                        <h1 className="text-3xl md:text-[2.5rem] font-black text-slate-900 dark:text-white leading-tight">
                            <AnimatedText text="Campus Events" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mt-2 font-medium">Explore premier scientific gatherings, engineering hackathons, and social induction galas organized by FOSSA.</p>
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find events or workshops..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500/20 text-slate-900 dark:text-white text-sm rounded-2xl block w-full pl-11 pr-4 py-3.5 focus:outline-none transition-all font-semibold shadow-sm"
                        />
                    </div>
                </div>
            </AnimateIn>

            {/* Event Grid */}
            <AnimateStaggerContainer delay={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEvents.map((event) => {
                    const isRegistered = registeredEvents.includes(event.id);
                    return (
                        <AnimateStaggerItem key={event.id}>
                            <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group text-left h-full border-b-[6px] border-b-slate-100 dark:border-b-indigo-900/20">
                                {/* Thumbnail */}
                                <div className="relative h-60 overflow-hidden">
                                    <img 
                                        src={event.image} 
                                        alt={event.title} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[0.6rem] font-black uppercase rounded-xl tracking-wider shadow-sm border border-white/20">
                                            {event.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 opacity-80" />
                                            <span className="text-xs font-bold tracking-tight">{event.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{event.time}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                        {event.description}
                                    </p>

                                    {/* Event Meta */}
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{event.venue}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <User className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <div className="flex flex-wrap gap-x-2">
                                                {event.speakers.map((speaker, i) => (
                                                    <span key={i} className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                                        {speaker}{i < event.speakers.length - 1 ? ',' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <button 
                                            onClick={() => handleRegister(event.id)}
                                            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                                                isRegistered 
                                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50' 
                                                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10'
                                            }`}
                                        >
                                            {isRegistered ? 'Successfully Secured' : 'Secure my Spot'}
                                        </button>
                                        <button className="p-3 text-slate-400 hover:text-indigo-500 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800 rounded-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimateStaggerItem>
                    );
                })}
            </AnimateStaggerContainer>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                    <Search className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-4" />
                    <h3 className="text-lg font-bold text-slate-400">No events matched your search</h3>
                    <button onClick={() => setSearchTerm('')} className="mt-4 text-xs font-black text-indigo-500 uppercase tracking-widest hover:underline">Clear all filters</button>
                </div>
            )}
        </div>
    );
};
