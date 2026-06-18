import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from '../components/animate-ui/icons/sparkles';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { Trash2 } from '../components/animate-ui/icons/trash-2';
import { BadgeCheck } from '../components/animate-ui/icons/badge-check';
import { Megaphone, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import {
    getAnnouncements,
    saveAnnouncements,
    getEvents,
    saveEvents,
    getLectureNotes,
    saveLectureNotes,
    getCourseOutlines,
    saveCourseOutlines
} from '../utils/store';

export const AdminPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('announcements');

    // Store states
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [lectureNotes, setLectureNotes] = useState([]);
    const [outlines, setOutlines] = useState([]);

    // Form inputs: Announcement
    const [annTitle, setAnnTitle] = useState('');
    const [annDesc, setAnnDesc] = useState('');
    const [annType, setAnnType] = useState('important');

    // Form inputs: Event
    const [evtTitle, setEvtTitle] = useState('');
    const [evtDesc, setEvtDesc] = useState('');
    const [evtImage, setEvtImage] = useState('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=300&q=80');

    // Form inputs: Academic Notes
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDept, setNoteDept] = useState('Computer Science');
    const [noteLevel, setNoteLevel] = useState('300 Level');
    const [noteAuthor, setNoteAuthor] = useState('');
    const [noteSize, setNoteSize] = useState('1.8 MB');

    // Form inputs: Course Outline
    const [outCode, setOutCode] = useState('');
    const [outTitle, setOutTitle] = useState('');
    const [outDept, setOutDept] = useState('Computer Science');
    const [outLevel, setOutLevel] = useState('100 Level');
    const [outUnits, setOutUnits] = useState(3);
    const [outTopicInput, setOutTopicInput] = useState('');

    // Load initial data
    const reloadAll = () => {
        setAnnouncements(getAnnouncements());
        setEvents(getEvents());
        setLectureNotes(getLectureNotes());
        setOutlines(getCourseOutlines());
    };

    useEffect(() => {
        reloadAll();
        // Check if already authenticated in this session
        const sessionAuth = sessionStorage.getItem('fossa_admin_auth');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const cleaned = password.trim().toLowerCase();
        // Support common variants for ultimate convenience
        if (cleaned === 'admin' || cleaned === 'fossa2026' || cleaned === 'fossaadmin') {
            setIsAuthenticated(true);
            sessionStorage.setItem('fossa_admin_auth', 'true');
            setError('');
        } else {
            setError('Invalid credentials. Hint: Default is "admin"');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('fossa_admin_auth');
        setPassword('');
    };

    // Announcement Actions
    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        if (!annTitle || !annDesc) return;
        const newAnn = {
            id: Date.now(),
            title: annTitle,
            description: annDesc,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: annType,
            isNew: true,
            icon: annType === 'important' ? 'text-red-500 bg-red-50 dark:bg-red-900/30' : 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
        };
        const updated = [newAnn, ...announcements];
        setAnnouncements(updated);
        saveAnnouncements(updated);
        setAnnTitle('');
        setAnnDesc('');
    };

    const handleDeleteAnnouncement = (id) => {
        const updated = announcements.filter((a) => a.id !== id);
        setAnnouncements(updated);
        saveAnnouncements(updated);
    };

    // Event Actions
    const handleAddEvent = (e) => {
        e.preventDefault();
        if (!evtTitle || !evtDesc) return;
        const newEvt = {
            id: Date.now(),
            title: evtTitle,
            description: evtDesc,
            image: evtImage,
            registered: false
        };
        const updated = [newEvt, ...events];
        setEvents(updated);
        saveEvents(updated);
        setEvtTitle('');
        setEvtDesc('');
    };

    const handleDeleteEvent = (id) => {
        const updated = events.filter((e) => e.id !== id);
        setEvents(updated);
        saveEvents(updated);
    };

    // Material Actions
    const handleAddNote = (e) => {
        e.preventDefault();
        if (!noteTitle || !noteAuthor) return;
        const newNote = {
            id: Date.now(),
            title: noteTitle,
            department: noteDept,
            level: noteLevel,
            size: noteSize,
            author: noteAuthor
        };
        const updated = [newNote, ...lectureNotes];
        setLectureNotes(updated);
        saveLectureNotes(updated);
        setNoteTitle('');
        setNoteAuthor('');
    };

    const handleDeleteNote = (id) => {
        const updated = lectureNotes.filter((n) => n.id !== id);
        setLectureNotes(updated);
        saveLectureNotes(updated);
    };

    // Outline Actions
    const handleAddOutline = (e) => {
        e.preventDefault();;
        if (!outCode || !outTitle) return;
        
        // Parse simple comma-separated topics
        const topicList = outTopicInput
            ? outTopicInput.split(',').map(s => s.trim()).filter(Boolean)
            : ['Core Syllabus Introductions', 'Experimental Research Systems', 'Analytical Course Assessments'];

        const newOutline = {
            id: Date.now(),
            code: outCode.toUpperCase(),
            title: outTitle,
            department: outDept,
            level: outLevel,
            units: Number(outUnits),
            topics: topicList,
            materials: [`"Standard Bibliography Reference for ${outTitle}"`]
        };
        const updated = [newOutline, ...outlines];
        setOutlines(updated);
        saveCourseOutlines(updated);
        setOutCode('');
        setOutTitle('');
        setOutTopicInput('');
    };

    const handleDeleteOutline = (id) => {
        const updated = outlines.filter((o) => o.id !== id);
        setOutlines(updated);
        saveCourseOutlines(updated);
    };

    // Default simulated student rosters
    const rosters = [
        { name: 'Goodluck', dept: 'Computer Science', level: '300 Level', targetGpa: '4.85', color: 'bg-indigo-500' },
        { name: 'Emmanuel Awoyele', dept: 'Biochemistry', level: '400 Level', targetGpa: '4.91', color: 'bg-emerald-500' },
        { name: 'Dr. Johnson Alabi', dept: 'Computer Science', level: 'Faculty Officer', targetGpa: 'N/A', color: 'bg-purple-500' },
        { name: 'Ibrahim Bello', dept: 'Physics', level: '200 Level', targetGpa: '4.67', color: 'bg-amber-500' },
        { name: 'Susan Thomas', dept: 'Mathematics', level: '100 Level', targetGpa: '4.20', color: 'bg-rose-500' }
    ];

    // Gate Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 text-left">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-colors duration-200">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12. 1.5a1.5 1.5 0 00-3 0v4.207a5.503 5.503 0 00-4 5.659V14a1.5 1.5 0 003 0v-2.634A3.5 3.5 0 0110 8v5.5a1.5 1.5 0 003 0V8a3.5 3.5 0 012-3.134V14a1.5 1.5 0 003 0v-.634a5.503 5.503 0 00-4-5.659V1.5z" clipRule="evenodd" /></svg>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
                            <span className="font-serif">AU</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight">FOSSA Root Access</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Administration Console</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Administrative Security Key</label>
                            <input 
                                type="password" 
                                placeholder="Enter secret password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/30 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 dark:text-red-400 font-bold ml-1 animate-pulse">
                                ⚠ {error}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-lg shadow-indigo-600/10"
                        >
                            Authorize Terminal
                        </button>

                        <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                                DEFAULT PASSWORD IS <span className="text-indigo-600 dark:text-indigo-400">admin</span>
                            </p>
                        </div>
                    </form>
                </div>
                
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="mt-6 text-xs text-slate-400 dark:text-slate-500 font-bold hover:text-indigo-500 transition-colors"
                >
                    ← Back to Student Dashboard
                </button>
            </div>
        );
    }

    // Work Station Screen
    return (
        <div className="max-w-6xl mx-auto w-full pb-16 text-left">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-950 rounded-2xl flex items-center justify-center text-white border border-indigo-800 shadow-md">
                        <span className="font-serif font-black text-lg text-indigo-400">AD</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white">FOSSA System Control</h1>
                            <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase rounded bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-450 animate-pulse">Root</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Orchestrate resources, events, announcements and academic records dynamically.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors hover:bg-slate-200"
                    >
                        Student Dashboard
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                        De-authorize
                    </button>
                </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm transition-colors duration-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Broadcasting Notices</span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{announcements.length} Published</h3>
                </div>
                <div className="bg-white dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm transition-colors duration-200">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Calendar Seminars</span>
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{events.length} Upcoming</h3>
                </div>
                <div className="bg-white dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm transition-colors duration-200">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span>Reference Syllabi</span>
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">{lectureNotes.length + outlines.length} Files</h3>
                </div>
                <div className="bg-white dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm transition-colors duration-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">System Endpoint</span>
                    <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 block break-all uppercase">Local Secured Context</h3>
                </div>
            </div>

            {/* Sub-Workspaces Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Horizontal Navigation on Desktop / Sidebar Menu */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm space-y-1">
                    <button 
                        onClick={() => setActiveTab('announcements')}
                        className={`w-full flex items-center gap-2.5 text-left px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'announcements' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <Megaphone className="w-4 h-4 flex-shrink-0" />
                        <span>Notice Broadcasts</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('events')}
                        className={`w-full flex items-center gap-2.5 text-left px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'events' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>Calendar Seminars</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('materials')}
                        className={`w-full flex items-center gap-2.5 text-left px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'materials' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <BookOpen className="w-4 h-4 flex-shrink-0" />
                        <span>academic syllabi</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('rosters')}
                        className={`w-full flex items-center gap-2.5 text-left px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'rosters' 
                                ? 'bg-indigo-600 text-white' 
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <GraduationCap className="w-4 h-4 flex-shrink-0" />
                        <span>Student Roster</span>
                    </button>
                </div>

                {/* Sub-view Area */}
                <div className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                    {/* Notice Broadcasts */}
                    {activeTab === 'announcements' && (
                        <div>
                            <h2 className="flex items-center gap-2 text-[1.1rem] md:text-xl font-bold text-slate-800 dark:text-white mb-6">
                                <Megaphone className="w-5 h-5 text-indigo-500" />
                                <span>Manage Notice Board</span>
                            </h2>
                            
                            {/* Create Form */}
                            <form onSubmit={handleAddAnnouncement} className="space-y-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Interschool Debate Prelims"
                                            value={annTitle}
                                            onChange={(e) => setAnnTitle(e.target.value)}
                                            required
                                            className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Category</label>
                                        <div className="relative">
                                            <select 
                                                value={annType}
                                                onChange={(e) => setAnnType(e.target.value)}
                                                className="appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full pl-3 pr-10 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold cursor-pointer"
                                            >
                                                <option value="important">🔴 Important Notice</option>
                                                <option value="general">🔵 General Notice</option>
                                                <option value="academic">🟢 Academic Announcement</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-450">
                                                <ChevronDown className="h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Notice Description</label>
                                    <textarea 
                                        rows={3}
                                        placeholder="Full details of notice, locations, dates..."
                                        value={annDesc}
                                        onChange={(e) => setAnnDesc(e.target.value)}
                                        required
                                        className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="submit"
                                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
                                    >
                                        Broadcast announcement
                                    </button>
                                </div>
                            </form>

                            {/* List with Delete control */}
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Currently Broadcasting</h3>
                            <div className="space-y-3">
                                {announcements.map((a) => (
                                    <div key={a.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 gap-4">
                                        <div className="min-w-0 flex-grow text-left">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 text-[0.55rem] font-bold uppercase rounded ${
                                                    a.type === 'important' ? 'bg-red-100 text-red-750 dark:bg-red-950/35 dark:text-red-400' : 'bg-indigo-100 text-indigo-750 dark:bg-indigo-950/35 dark:text-indigo-400'
                                                }`}>
                                                    {a.type}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-bold">{a.date}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">{a.title}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{a.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteAnnouncement(a.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all flex-shrink-0"
                                            title="Delete Notice"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Calendar Seminars */}
                    {activeTab === 'events' && (
                        <div>
                            <h2 className="flex items-center gap-2 text-[1.1rem] md:text-xl font-bold text-slate-800 dark:text-white mb-6">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                <span>Manage Campus Events Calendar</span>
                            </h2>
                            
                            {/* Create Form */}
                            <form onSubmit={handleAddEvent} className="space-y-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Event Title</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Science Fair Dinner"
                                            value={evtTitle}
                                            onChange={(e) => setEvtTitle(e.target.value)}
                                            required
                                            className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Cover Image Source</label>
                                        <input 
                                            type="text" 
                                            placeholder="URL of cover photo..."
                                            value={evtImage}
                                            onChange={(e) => setEvtImage(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Calendar Event Description</label>
                                    <textarea 
                                        rows={3}
                                        placeholder="Outline description of timing, entry protocol, requirements..."
                                        value={evtDesc}
                                        onChange={(e) => setEvtDesc(e.target.value)}
                                        required
                                        className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-905 dark:text-white text-xs rounded-xl block w-full px-3 py-2.5 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="submit"
                                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
                                    >
                                        Publish Event Post
                                    </button>
                                </div>
                            </form>

                            {/* List with Delete control */}
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Active Calendar Lists</h3>
                            <div className="space-y-3">
                                {events.map((e) => (
                                    <div key={e.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 gap-4">
                                        <div className="flex items-center gap-3 min-w-0 flex-grow text-left">
                                            <img src={e.image} alt="Event Cover" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{e.title}</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{e.description}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteEvent(e.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all flex-shrink-0"
                                            title="Delete Event"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic Syllabi and notes */}
                    {activeTab === 'materials' && (
                        <div>
                            <h2 className="flex items-center gap-2 text-[1.1rem] md:text-xl font-bold text-slate-800 dark:text-white mb-6">
                                <BookOpen className="w-5 h-5 text-indigo-500" />
                                <span>Manage Lecture Notes & Syllabi</span>
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                                {/* Add Lecture Notes */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2 border-b pb-1">
                                        <BookOpen className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                        <span>Upload Lecture Notes Handout</span>
                                    </h3>
                                    <form onSubmit={handleAddNote} className="space-y-3">
                                        <div>
                                            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Document Title</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Intro to Cytology Lecturenotes"
                                                value={noteTitle}
                                                onChange={(e) => setNoteTitle(e.target.value)}
                                                required
                                                className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Department</label>
                                                <select 
                                                    value={noteDept}
                                                    onChange={(e) => setNoteDept(e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none font-semibold cursor-pointer"
                                                >
                                                    <option>Computer Science</option>
                                                    <option>Physics</option>
                                                    <option>Biochemistry</option>
                                                    <option>Mathematics</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Level</label>
                                                <select 
                                                    value={noteLevel}
                                                    onChange={(e) => setNoteLevel(e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none font-semibold cursor-pointer"
                                                >
                                                    <option>100 Level</option>
                                                    <option>200 Level</option>
                                                    <option>300 Level</option>
                                                    <option>400 Level</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Instructor / Lecturer</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Prof. Adeleke"
                                                    value={noteAuthor}
                                                    onChange={(e) => setNoteAuthor(e.target.value)}
                                                    required
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Simulated File Size</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="2.5 MB"
                                                    value={noteSize}
                                                    onChange={(e) => setNoteSize(e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                                />
                                            </div>
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                                        >
                                            Publish Lecture Handout + Size list
                                        </button>
                                    </form>
                                </div>

                                {/* Add Course Outline */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2 border-b pb-1">
                                        <BookOpen className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                                        <span>Add New Course Outline Syllabus</span>
                                    </h3>
                                    <form onSubmit={handleAddOutline} className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-1">
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Course Code</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="CSC 305"
                                                    value={outCode}
                                                    onChange={(e) => setOutCode(e.target.value)}
                                                    required
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold uppercase font-mono"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Course Title</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Operating Systems Design"
                                                    value={outTitle}
                                                    onChange={(e) => setOutTitle(e.target.value)}
                                                    required
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-1">
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Unit Credits</label>
                                                <input 
                                                    type="number" 
                                                    min={1} 
                                                    max={6}
                                                    value={outUnits}
                                                    onChange={(e) => setOutUnits(Number(e.target.value))}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Department</label>
                                                <select 
                                                    value={outDept}
                                                    onChange={(e) => setOutDept(e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none font-semibold cursor-pointer"
                                                >
                                                    <option>Computer Science</option>
                                                    <option>Physics</option>
                                                    <option>Biochemistry</option>
                                                    <option>Mathematics</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Level</label>
                                                <select 
                                                    value={outLevel}
                                                    onChange={(e) => setOutLevel(e.target.value)}
                                                    className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none font-semibold cursor-pointer"
                                                >
                                                    <option>100 Level</option>
                                                    <option>200 Level</option>
                                                    <option>300 Level</option>
                                                    <option>400 Level</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-0.5">Syllabus Topics</label>
                                            <span className="text-[9px] text-slate-400 mb-1 block">Comma-separated topics (e.g. Process Sync, Deadlocks, Virtual Memory)</span>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Process scheduler, Semaphore models, Paging"
                                                value={outTopicInput}
                                                onChange={(e) => setOutTopicInput(e.target.value)}
                                                className="bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-900 dark:text-white text-xs rounded-xl block w-full px-3 py-2 focus:outline-none focus:border-indigo-500/20 font-semibold"
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            className="w-full py-2 bg-indigo-600 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                                        >
                                            Construct Course Syllabus
                                        </button>
                                    </form>
                                </div>
                            </div>
                            
                            {/* Materials List Tables */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Lecture Notes files</h4>
                                    <div className="space-y-2 max-h-[18rem] overflow-y-auto">
                                        {lectureNotes.map((n) => (
                                            <div key={n.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                                                <div className="min-w-0 flex-grow text-left">
                                                    <p className="font-bold text-slate-900 dark:text-white truncate">{n.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-semibold truncate">{n.department} &bull; {n.level} &bull; {n.author}</p>
                                                </div>
                                                <button onClick={() => handleDeleteNote(n.id)} className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg flex-shrink-0">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Course outlines</h4>
                                    <div className="space-y-2 max-h-[18rem] overflow-y-auto">
                                        {outlines.map((o) => (
                                            <div key={o.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                                                <div className="min-w-0 flex-grow text-left">
                                                    <p className="font-bold text-slate-900 dark:text-white truncate"><span className="text-indigo-600 dark:text-indigo-400">[{o.code}]</span> {o.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-semibold truncate">{o.department} &bull; {o.level} &bull; {o.units} Units</p>
                                                </div>
                                                <button onClick={() => handleDeleteOutline(o.id)} className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg flex-shrink-0">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Student Rosters */}
                    {activeTab === 'rosters' && (
                        <div>
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <h2 className="flex items-center gap-2 text-[1.1rem] md:text-xl font-bold text-slate-800 dark:text-white">
                                    <GraduationCap className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                    <span>Adeleke University FOSSA Registered Students</span>
                                </h2>
                                <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                    All Active Term Profiles
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="py-3 px-4 text-xs font-extrabold uppercase text-slate-400 tracking-wider">Student Name</th>
                                            <th className="py-3 px-4 text-xs font-extrabold uppercase text-slate-400 tracking-wider">Department</th>
                                            <th className="py-3 px-4 text-xs font-extrabold uppercase text-slate-400 tracking-wider">Study Level</th>
                                            <th className="py-3 px-4 text-xs font-extrabold uppercase text-slate-400 tracking-wider">GPA Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-xs text-slate-705 dark:text-slate-300">
                                        {rosters.map((student, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="py-3.5 px-4 flex items-center gap-2.5">
                                                    <div className={`w-8 h-8 rounded-full ${student.color} flex items-center justify-center text-white font-bold`}>
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white">{student.name}</span>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{student.dept}</td>
                                                <td className="py-3.5 px-4">
                                                    <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                                                        {student.level}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-white">{student.targetGpa}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
