/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const lazyNamed = (loader, name) => lazy(() => loader().then(module => ({ default: module[name] })));
const DashboardLayout = lazyNamed(() => import('./layout/DashboardLayout'), 'DashboardLayout');
const PublicLayout = lazyNamed(() => import('./layout/PublicLayout'), 'PublicLayout');
const DashboardPage = lazyNamed(() => import('./pages/DashboardPage'), 'DashboardPage');
const AboutPage = lazyNamed(() => import('./pages/AboutPage'), 'AboutPage');
const HomePage = lazyNamed(() => import('./pages/HomePage'), 'HomePage');
const ResourcesPage = lazyNamed(() => import('./pages/ResourcesPage'), 'ResourcesPage');
const GPACalculatorPage = lazyNamed(() => import('./pages/GPACalculatorPage'), 'GPACalculatorPage');
const EventsPage = lazyNamed(() => import('./pages/EventsPage'), 'EventsPage');
const AnnouncementsPage = lazyNamed(() => import('./pages/AnnouncementsPage'), 'AnnouncementsPage');
const PastQuestionsPage = lazyNamed(() => import('./pages/PastQuestionsPage'), 'PastQuestionsPage');
const ProfilePage = lazyNamed(() => import('./pages/ProfilePage'), 'ProfilePage');
const SettingsPage = lazyNamed(() => import('./pages/SettingsPage'), 'SettingsPage');
const MorePage = lazyNamed(() => import('./pages/MorePage'), 'MorePage');
const HelpPage = lazyNamed(() => import('./pages/HelpPage'), 'HelpPage');
const LectureNotesPage = lazyNamed(() => import('./pages/LectureNotesPage'), 'LectureNotesPage');
const CourseOutlinesPage = lazyNamed(() => import('./pages/CourseOutlinesPage'), 'CourseOutlinesPage');
const AdminPage = lazyNamed(() => import('./pages/AdminPage'), 'AdminPage');
const LoginPage = lazyNamed(() => import('./pages/AuthPages'), 'LoginPage');
const SignupPage = lazyNamed(() => import('./pages/AuthPages'), 'SignupPage');
const LevelAdvisorPage = lazy(() => import('./pages/LevelAdvisorPage'));
const AcademicAdminPage = lazy(() => import('./pages/AcademicAdminPage'));
const AcademicRecordsPage = lazy(() => import('./pages/AcademicRecordsPage'));
const DepartmentsPage = lazyNamed(() => import('./pages/DepartmentsPage'), 'DepartmentsPage');
const ExecutivesPage = lazyNamed(() => import('./pages/ExecutivesPage'), 'ExecutivesPage');
const PublicEventsPage = lazyNamed(() => import('./pages/PublicEventsPage'), 'PublicEventsPage');
const GalleryPage = lazyNamed(() => import('./pages/GalleryPage'), 'GalleryPage');
const ContactPage = lazyNamed(() => import('./pages/ContactPage'), 'ContactPage');
const NotFoundPage = lazyNamed(() => import('./pages/NotFoundPage'), 'NotFoundPage');
const ElectionsPage = lazy(() => import('./pages/ElectionsPage'));
const TimetablePage = lazyNamed(() => import('./pages/TimetablePage'), 'TimetablePage');
const QuickAccessPage = lazyNamed(() => import('./pages/QuickAccessPage'), 'QuickAccessPage');
const LecturerDashboardPage = lazy(() => import('./pages/LecturerDashboardPage'));
const BubbleBackground = lazyNamed(() => import('./components/animate-ui/components/backgrounds/bubble'), 'BubbleBackground');

function RouteLoading() {
  return <main className="flex min-h-[60vh] items-center justify-center px-5"><div role="status" className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Loading FOSSA…</div></main>;
}

function GlobalBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const darkColors = { first: '49, 46, 129', second: '99, 102, 241', third: '225, 29, 72', fourth: '30, 41, 59', fifth: '15, 23, 42', sixth: '99, 102, 241' };
  const lightColors = { first: '224, 231, 255', second: '243, 232, 252', third: '255, 228, 230', fourth: '241, 245, 249', fifth: '224, 242, 254', sixth: '254, 243, 199' };
  return <div className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-50"><Suspense fallback={null}><BubbleBackground className={`w-full h-full bg-none ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`} colors={isDark ? darkColors : lightColors} /></Suspense></div>;
}

export default function App() {
  return <ThemeProvider><GlobalBackground /><BrowserRouter><Suspense fallback={<RouteLoading />}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/academic" element={<AcademicAdminPage />} />
      <Route path="/admin/academic/students" element={<AcademicRecordsPage />} />
      <Route path="/elections" element={<ElectionsPage />} />
      <Route path="/elections/:electionId" element={<ElectionsPage />} />
      <Route path="/level-advisor" element={<LevelAdvisorPage />} />
      <Route path="/lecturer" element={<LecturerDashboardPage />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="executives" element={<ExecutivesPage />} />
        <Route path="events" element={<PublicEventsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="quick-access" element={<QuickAccessPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="past-questions" element={<PastQuestionsPage />} />
        <Route path="lecture-notes" element={<LectureNotesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="course-outlines" element={<CourseOutlinesPage />} />
        <Route path="gpa-calculator" element={<GPACalculatorPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="more" element={<MorePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense></BrowserRouter></ThemeProvider>;
}
