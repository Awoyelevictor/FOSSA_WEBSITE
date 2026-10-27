/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout';
import { PublicLayout } from './layout/PublicLayout';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { GPACalculatorPage } from './pages/GPACalculatorPage';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { PastQuestionsPage } from './pages/PastQuestionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { MorePage } from './pages/MorePage';
import { HelpPage } from './pages/HelpPage';
import { LectureNotesPage } from './pages/LectureNotesPage';
import { CourseOutlinesPage } from './pages/CourseOutlinesPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import LevelAdvisorPage from './pages/LevelAdvisorPage';
import AcademicAdminPage from './pages/AcademicAdminPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ExecutivesPage } from './pages/ExecutivesPage';
import { PublicEventsPage } from './pages/PublicEventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TimetablePage } from './pages/TimetablePage';
import { QuickAccessPage } from './pages/QuickAccessPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BubbleBackground } from './components/animate-ui/components/backgrounds/bubble';

function GlobalBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const darkColors = { first: '49, 46, 129', second: '99, 102, 241', third: '225, 29, 72', fourth: '30, 41, 59', fifth: '15, 23, 42', sixth: '99, 102, 241' };
  const lightColors = { first: '224, 231, 255', second: '243, 232, 255', third: '255, 228, 230', fourth: '241, 245, 249', fifth: '224, 242, 254', sixth: '254, 243, 199' };
  return <div className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-50"><BubbleBackground className={`w-full h-full bg-none ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`} colors={isDark ? darkColors : lightColors} /></div>;
}

export default function App() {
  return <ThemeProvider><GlobalBackground /><BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/academic" element={<AcademicAdminPage />} />
      <Route path="/level-advisor" element={<LevelAdvisorPage />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} />
        <Route path="departments" element={<DepartmentsPage />} /><Route path="executives" element={<ExecutivesPage />} />
        <Route path="events" element={<PublicEventsPage />} /><Route path="gallery" element={<GalleryPage />} /><Route path="contact" element={<ContactPage />} />
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
        <Route path="profile" element={<ProfilePage />} /><Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} /><Route path="more" element={<MorePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter></ThemeProvider>;
}
