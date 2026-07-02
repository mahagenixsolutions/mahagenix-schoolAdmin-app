import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import AIContextProvider from './context/AIContextProvider';
import BusTrackingFAB from './features/bus-tracking/BusTrackingFAB';

// Lazy-loaded feature pages
import { lazy, Suspense } from 'react';
const ChatWidget = lazy(() => import('./components/ai/ChatWidget'));
const SchoolActivityPage = lazy(() => import('./features/activity/SchoolActivityPage'));
const QuickActionsPage = lazy(() => import('./features/workspace/QuickActionsPage'));


const StudentsPage = lazy(() => import('./features/students/StudentsPage'));
const StudentDetailPage = lazy(() => import('./features/students/StudentDetailPage'));
const AttendancePage = lazy(() => import('./features/attendance/AttendancePage'));
const MarksPage = lazy(() => import('./features/marks/MarksPage'));
const ProgressPage = lazy(() => import('./features/progress/ProgressPage'));
const ClassesPage = lazy(() => import('./features/classes/ClassesPage'));
const ClassDetailPage = lazy(() => import('./features/classes/ClassDetailPage'));
const SubjectsPage = lazy(() => import('./features/subjects/SubjectsPage'));
const SubjectDetailDashboard = lazy(() => import('./features/subjects/SubjectDetailDashboard'));
const UsersPage = lazy(() => import('./features/users/UsersPage'));
const AcademicYearsPage = lazy(() => import('./features/academic-years/AcademicYearsPage'));
const AcademicYearDetailDashboard = lazy(() => import('./features/academic-years/AcademicYearDetailDashboard'));
const NotificationsPage = lazy(() => import('./features/notifications/NotificationsPage'));
const AuditLogsPage = lazy(() => import('./features/audit/AuditLogsPage'));
const AnalyticsPage = lazy(() => import('./features/analytics/AnalyticsPage'));
const ParticipationPage = lazy(() => import('./features/participation/ParticipationPage'));
const EventsPage = lazy(() => import('./features/events/EventsPage'));
const ReportsPage = lazy(() => import('./features/reports/ReportsPage'));

// Parent Portal Subpages
const ParentTimelinePage = lazy(() => import('./features/parent/ParentTimelinePage'));
const ParentMessagingPage = lazy(() => import('./features/parent/ParentMessagingPage'));
const ParentPersonalDetailsPage = lazy(() => import('./features/parent/ParentPersonalDetailsPage'));
const ParentGalleryPage = lazy(() => import('./features/parent/ParentGalleryPage'));
const PuzzlesPage = lazy(() => import('./features/puzzles/PuzzlesPage'));

// Teacher Pages
const LeaveApplicationPage = lazy(() => import('./features/teachers/LeaveApplicationPage'));

// New ERP Pages
const TeachersPage = lazy(() => import('./features/teachers/TeachersPage'));
const ParentsPage = lazy(() => import('./features/parent/ParentsPage'));
const AdmissionsPage = lazy(() => import('./features/admissions/AdmissionsPage'));
const AcademicPage = lazy(() => import('./features/academic/AcademicPage'));
const ExamsPage = lazy(() => import('./features/exams/ExamsPage'));
const FeesPage = lazy(() => import('./features/fees/FeesPage'));
const LibraryPage = lazy(() => import('./features/library/LibraryPage'));
const TransportPage = lazy(() => import('./features/transport/TransportPage'));
const HRPage = lazy(() => import('./features/hr/HRPage'));
const InventoryPage = lazy(() => import('./features/inventory/InventoryPage'));
const CommunicationPage = lazy(() => import('./features/communication/CommunicationPage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));


const PageLoader = () => (
  <div className="flex-center" style={{ height: 400 }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid var(--border-color)',
      borderTopColor: 'var(--color-primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }}/>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default function App() {
  const is_authenticated = useSelector((s: RootState) => s.auth.is_authenticated);
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <BrowserRouter>
      <AIContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          is_authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="activity" element={
              <Suspense fallback={<PageLoader />}><SchoolActivityPage /></Suspense>
            } />
            <Route path="quick-actions" element={
              <Suspense fallback={<PageLoader />}><QuickActionsPage /></Suspense>
            } />


            <Route path="students" element={
              <Suspense fallback={<PageLoader />}><StudentsPage /></Suspense>
            } />
            <Route path="students/:id" element={
              <Suspense fallback={<PageLoader />}><StudentDetailPage /></Suspense>
            } />
            <Route path="attendance" element={
              <Suspense fallback={<PageLoader />}><AttendancePage /></Suspense>
            } />
            <Route path="marks" element={
              <Suspense fallback={<PageLoader />}><MarksPage /></Suspense>
            } />
            <Route path="progress" element={
              <Suspense fallback={<PageLoader />}><ProgressPage /></Suspense>
            } />
            <Route path="classes" element={
              <Suspense fallback={<PageLoader />}><ClassesPage /></Suspense>
            } />
            <Route path="classes/:classId" element={
              <Suspense fallback={<PageLoader />}><ClassDetailPage /></Suspense>
            } />
            <Route path="subjects" element={
              <Suspense fallback={<PageLoader />}><SubjectsPage /></Suspense>
            } />
            <Route path="subjects/:id" element={
              <Suspense fallback={<PageLoader />}><SubjectDetailDashboard /></Suspense>
            } />
            <Route path="users" element={
              <Suspense fallback={<PageLoader />}><UsersPage /></Suspense>
            } />
            <Route path="academic-years" element={
              <Suspense fallback={<PageLoader />}><AcademicYearsPage /></Suspense>
            } />
            <Route path="academic-years/:id" element={
              <Suspense fallback={<PageLoader />}><AcademicYearDetailDashboard /></Suspense>
            } />
            <Route path="notifications" element={
              <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense>
            } />
            <Route path="audit-logs" element={
              <Suspense fallback={<PageLoader />}><AuditLogsPage /></Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<PageLoader />}><AnalyticsPage /></Suspense>
            } />
            <Route path="participation" element={
              <Suspense fallback={<PageLoader />}><ParticipationPage /></Suspense>
            } />
            <Route path="events" element={
              <Suspense fallback={<PageLoader />}><EventsPage /></Suspense>
            } />
            <Route path="reports" element={
              <Suspense fallback={<PageLoader />}><ReportsPage /></Suspense>
            } />
             <Route path="leave-application" element={
              <Suspense fallback={<PageLoader />}><LeaveApplicationPage /></Suspense>
            } />
            
            {/* Newly added ERP routes */}
            <Route path="teachers" element={
              <Suspense fallback={<PageLoader />}><TeachersPage /></Suspense>
            } />
            <Route path="parents" element={
              <Suspense fallback={<PageLoader />}><ParentsPage /></Suspense>
            } />
            <Route path="admissions" element={
              <Suspense fallback={<PageLoader />}><AdmissionsPage /></Suspense>
            } />
            <Route path="academic" element={
              <Suspense fallback={<PageLoader />}><AcademicPage /></Suspense>
            } />
            <Route path="exams" element={
              <Suspense fallback={<PageLoader />}><ExamsPage /></Suspense>
            } />
            <Route path="fees" element={
              <Suspense fallback={<PageLoader />}><FeesPage /></Suspense>
            } />
            <Route path="library" element={
              <Suspense fallback={<PageLoader />}><LibraryPage /></Suspense>
            } />
            <Route path="transport" element={
              <Suspense fallback={<PageLoader />}><TransportPage /></Suspense>
            } />
            <Route path="hr" element={
              <Suspense fallback={<PageLoader />}><HRPage /></Suspense>
            } />
            <Route path="inventory" element={
              <Suspense fallback={<PageLoader />}><InventoryPage /></Suspense>
            } />
            <Route path="communication" element={
              <Suspense fallback={<PageLoader />}><CommunicationPage /></Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>
            } />
            
            {/* Parent-Only Routes */}
            <Route path="timeline" element={
              <Suspense fallback={<PageLoader />}><ParentTimelinePage /></Suspense>
            } />
            <Route path="messages" element={
              <Suspense fallback={<PageLoader />}><ParentMessagingPage /></Suspense>
            } />
            <Route path="profile" element={
              <Suspense fallback={<PageLoader />}><ParentPersonalDetailsPage /></Suspense>
            } />
            <Route path="gallery" element={
              <Suspense fallback={<PageLoader />}><ParentGalleryPage /></Suspense>
            } />
            <Route path="puzzles" element={
              <Suspense fallback={<PageLoader />}><PuzzlesPage /></Suspense>
            } />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Global AI Chat Widget */}
      {is_authenticated && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}

      {/* Global Bus Tracking Widget */}
      {is_authenticated && (
        <BusTrackingFAB role={user?.role === 'PARENT' ? 'PARENT' : 'ADMIN'} />
      )}
      </AIContextProvider>
    </BrowserRouter>
  );
}
