// Local persistence for user-created content only. No seeded/demo records are created.
const KEY_ANNOUNCEMENTS = 'fossa_announcements';
const KEY_EVENTS = 'fossa_events';
const KEY_NOTES = 'fossa_lecture_notes';
const KEY_OUTLINES = 'fossa_course_outlines';

const legacyDemoTitles = new Set([
  'Mid-Semester Exams Timetable Released',
  'Science Week 2026 Registration Opens',
  'Laboratory Safety Training',
  'New Lecture Notes Uploaded',
  'Science Week 2026',
  'Hackathon 5.0',
  'Seminar: Future of AI',
  'Introduction to Programming',
  'Discrete Mathematics',
  'Data Structures & Algorithms',
  'General Physics I',
  'Quantum Mechanics',
  'Organic Chemistry I',
  'General Microbiology',
  'Calculus & Real Analysis',
]);

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Remove known seeded demo entries left in browsers by older versions.
    const clean = parsed.filter((item) => !legacyDemoTitles.has(item?.title));
    if (clean.length !== parsed.length) localStorage.setItem(key, JSON.stringify(clean));
    return clean;
  } catch {
    return [];
  }
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(Array.isArray(list) ? list : []));
  window.dispatchEvent(new Event('fossa_store_update'));
}

export const getAnnouncements = () => readList(KEY_ANNOUNCEMENTS);
export const saveAnnouncements = (list) => saveList(KEY_ANNOUNCEMENTS, list);
export const getEvents = () => readList(KEY_EVENTS);
export const saveEvents = (list) => saveList(KEY_EVENTS, list);
export const getLectureNotes = () => readList(KEY_NOTES);
export const saveLectureNotes = (list) => saveList(KEY_NOTES, list);
export const getCourseOutlines = () => readList(KEY_OUTLINES);
export const saveCourseOutlines = (list) => saveList(KEY_OUTLINES, list);
