// Central storage utility using localStorage for FOSSA Dynamic Admin Data
const KEY_ANNOUNCEMENTS = 'fossa_announcements';
const KEY_EVENTS = 'fossa_events';
const KEY_NOTES = 'fossa_lecture_notes';
const KEY_OUTLINES = 'fossa_course_outlines';

const defaultAnnouncements = [
    {
        id: 1,
        title: 'Mid-Semester Exams Timetable Released',
        description: 'Check the full timetable on the resources page.',
        date: 'May 11, 2026',
        type: 'important',
        isNew: true,
        icon: 'text-red-500 bg-red-50 dark:bg-red-900/30'
    },
    {
        id: 2,
        title: 'Science Week 2026 Registration Opens',
        description: 'Register your team before registration closes.',
        date: 'May 9, 2026',
        type: 'general',
        isNew: true,
        icon: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
    },
    {
        id: 3,
        title: 'Laboratory Safety Training',
        description: 'All science students must attend.',
        date: 'May 7, 2026',
        type: 'important',
        isNew: true,
        icon: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30'
    },
    {
        id: 4,
        title: 'New Lecture Notes Uploaded',
        description: 'Check out the newly uploaded notes.',
        date: 'May 5, 2026',
        type: 'general',
        isNew: false,
        icon: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
    }
];

const defaultEvents = [
    {
        id: 1,
        title: 'Science Week 2026',
        description: 'A week of exciting scientific activities & competitions.',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=300&q=80',
        registered: false
    },
    {
        id: 2,
        title: 'Hackathon 5.0',
        description: 'Build, innovate and solve real world problems.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80',
        registered: false
    },
    {
        id: 3,
        title: 'Seminar: Future of AI',
        description: 'Exploring the impact of AI in our world.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80',
        registered: false
    },
    {
        id: 4,
        title: 'Laboratory Safety Training',
        description: 'All science students must attend.',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=300&q=80',
        registered: false
    }
];

const defaultNotes = [
    { id: 1, title: 'Introduction to Programming', department: 'Computer Science', level: '100 Level', size: '2.4 MB', author: 'Dr. Alabi' },
    { id: 2, title: 'Discrete Mathematics', department: 'Computer Science', level: '200 Level', size: '3.1 MB', author: 'Prof. Adeleke' },
    { id: 3, title: 'Data Structures & Algorithms', department: 'Computer Science', level: '200 Level', size: '4.5 MB', author: 'Dr. Johnson' },
    { id: 4, title: 'General Physics I', department: 'Physics', level: '100 Level', size: '1.9 MB', author: 'Dr. Olawale' },
    { id: 5, title: 'Quantum Mechanics', department: 'Physics', level: '300 Level', size: '3.8 MB', author: 'Prof. Bello' },
    { id: 6, title: 'Organic Chemistry I', department: 'Biochemistry', level: '200 Level', size: '2.7 MB', author: 'Dr. Mrs. Adeyemi' },
    { id: 7, title: 'General Microbiology', department: 'Biochemistry', level: '200 Level', size: '3.2 MB', author: 'Dr. Thomas' },
    { id: 8, title: 'Calculus & Real Analysis', department: 'Mathematics', level: '100 Level', size: '1.8 MB', author: 'Mr. Gabriel' },
];

const defaultOutlines = [
    { 
        id: 1, 
        code: 'CSC 101',
        title: 'Introduction to Programming', 
        department: 'Computer Science',
        level: '100 Level',
        units: 3,
        topics: [
            'Algorithm development and problem-solving concepts',
            'Variables, constants, expressions and assignments',
            'Control structures (if/else branching, nested select blocks)',
            'Iterative structures (while, do-while, and bounded simple loops)',
            'Introductory function declarations, scopes, and passing arguments'
        ],
        materials: ['"Starting Out with C++" by Tony Gaddis', '"Introduction to Python Programming" by Y. Daniel Liang']
    },
    { 
        id: 2, 
        code: 'CSC 201',
        title: 'Data Structures & Algorithms', 
        department: 'Computer Science',
        level: '200 Level',
        units: 3,
        topics: [
            'Abstract Data Types (ADTs) and static collections arrays',
            'Pointer-based structures: Single, doubly, and circular linked lists',
            'Recursive stack models, circular queues, and deque structures',
            'Trees: Search models, AVL indexes, and binary tree representations',
            'Complexity metrics (Big-O notation) and analytical sorting'
        ],
        materials: ['"Data Structures and Algorithms in Java" by Robert Lafore', '"Introduction to Algorithms" by CLRS']
    },
    { 
        id: 3, 
        code: 'MTH 101',
        title: 'Calculus I & Algebra', 
        department: 'Mathematics',
        level: '100 Level',
        units: 3,
        topics: [
            'Real number lines, mathematical induction, and set maps',
            'Analytical limits of complex algebraic and trigonometric series',
            'Rules of differentiation (product rule, quotient rule, chain rule)',
            'Implicit differentiation and rate of change scenarios',
            'Introduction to definite integrals and basic area curves'
        ],
        materials: ['"Thomas’ Calculus" by George B. Thomas', '"Pure Mathematics" by J.K. Backhouse']
    }
];

export const getAnnouncements = () => {
    const data = localStorage.getItem(KEY_ANNOUNCEMENTS);
    if (!data) {
        localStorage.setItem(KEY_ANNOUNCEMENTS, JSON.stringify(defaultAnnouncements));
        return defaultAnnouncements;
    }
    return JSON.parse(data);
};

export const saveAnnouncements = (list) => {
    localStorage.setItem(KEY_ANNOUNCEMENTS, JSON.stringify(list));
    // Trigger custom storage update dispatch to reload component locally
    window.dispatchEvent(new Event('fossa_store_update'));
};

export const getEvents = () => {
    const data = localStorage.getItem(KEY_EVENTS);
    if (!data) {
        localStorage.setItem(KEY_EVENTS, JSON.stringify(defaultEvents));
        return defaultEvents;
    }
    return JSON.parse(data);
};

export const saveEvents = (list) => {
    localStorage.setItem(KEY_EVENTS, JSON.stringify(list));
    window.dispatchEvent(new Event('fossa_store_update'));
};

export const getLectureNotes = () => {
    const data = localStorage.getItem(KEY_NOTES);
    if (!data) {
        localStorage.setItem(KEY_NOTES, JSON.stringify(defaultNotes));
        return defaultNotes;
    }
    return JSON.parse(data);
};

export const saveLectureNotes = (list) => {
    localStorage.setItem(KEY_NOTES, JSON.stringify(list));
    window.dispatchEvent(new Event('fossa_store_update'));
};

export const getCourseOutlines = () => {
    const data = localStorage.getItem(KEY_OUTLINES);
    if (!data) {
        localStorage.setItem(KEY_OUTLINES, JSON.stringify(defaultOutlines));
        return defaultOutlines;
    }
    return JSON.parse(data);
};

export const saveCourseOutlines = (list) => {
    localStorage.setItem(KEY_OUTLINES, JSON.stringify(list));
    window.dispatchEvent(new Event('fossa_store_update'));
};
