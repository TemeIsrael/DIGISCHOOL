import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { RequireAuth } from '../shared/components/RequireAuth';
import { RequireRole } from '../shared/components/RequireRole';
import { RequireAdminType } from '../shared/components/RequireAdminType';

// Layouts
import { SidebarLayout } from '../shared/components/layout/SidebarLayout';

// ─── Loading Spinner ────────────────────────────────────────────────
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-digi-purple border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-semibold text-slate-400">Chargement…</span>
    </div>
  </div>
);

// ─── Lazy-loaded Public Pages ───────────────────────────────────────
const LandingPage        = lazy(() => import('../pages/LandingPage'));
const LibraryPage        = lazy(() => import('../pages/LibraryPage'));
const HelpPage           = lazy(() => import('../pages/HelpPage'));
const ContactPage        = lazy(() => import('../pages/ContactPage'));
const LoginPage          = lazy(() => import('../features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('../features/auth/pages/ChangePasswordPage'));
const About              = lazy(() => import('../pages/About'));
const NotFound           = lazy(() => import('../pages/NotFound'));
const Forbidden          = lazy(() => import('../pages/Forbidden'));
const Maintenance        = lazy(() => import('../pages/Maintenance'));

const ProfilePage = lazy(() => import('../features/profile/pages/ProfilePage'));

// ─── Loading Fallback ──────────────────────────────────────────────
const DashboardRoot       = lazy(() => import('../features/dashboards/DashboardRoot'));
const DashboardAdmin      = lazy(() => import('../features/dashboards/DashboardAdmin'));
const DashboardScolarite  = lazy(() => import('../features/dashboards/DashboardScolarite'));
const DashboardFondateur  = lazy(() => import('../features/dashboards/DashboardFondateur'));
const DashboardDirecteur  = lazy(() => import('../features/dashboards/DashboardDirecteur'));
const DashboardEnseignant = lazy(() => import('../features/dashboards/DashboardEnseignant'));
const DashboardParent     = lazy(() => import('../features/dashboards/DashboardParent'));

// ─── Lazy-loaded Feature Pages ─────────────────────────────────────
const StudentListPage         = lazy(() => import('../features/students/pages/StudentListPage'));
const StudentNewPage          = lazy(() => import('../features/students/pages/StudentNewPage'));
const StudentDetailPage       = lazy(() => import('../features/students/pages/StudentDetailPage'));
const StudentEditPage         = lazy(() => import('../features/students/pages/StudentEditPage'));
const StudentAssignPage       = lazy(() => import('../features/students/pages/StudentAssignPage'));
const StudentParentsPage      = lazy(() => import('../features/students/pages/StudentParentsPage'));
// const PreRegistrationPage     = lazy(() => import('../features/students/pages/PreRegistrationPage'));
const PreRegistrationListPage = lazy(() => import('../features/students/pages/PreRegistrationListPage'));
const PersonnelListPage       = lazy(() => import('../features/personnel/pages/PersonnelListPage'));
const PaymentListPage         = lazy(() => import('../features/payments/pages/PaymentListPage'));
const PaymentEntryPage        = lazy(() => import('../features/payments/pages/PaymentEntryPage'));
const GradeEntryPage          = lazy(() => import('../features/grades/pages/GradeEntryPage'));
const BulletinPage            = lazy(() => import('../features/grades/pages/BulletinPage'));
const MessageListPage         = lazy(() => import('../features/messages/pages/MessageListPage'));
const DisciplinePage          = lazy(() => import('../features/discipline/pages/DisciplinePage'));
const AcademicConfigPage      = lazy(() => import('../features/academic/pages/AcademicConfigPage'));
const LibraryManagePage       = lazy(() => import('../features/library/pages/LibraryManagePage'));
const StatsPage               = lazy(() => import('../features/stats/pages/StatsPage'));
const SchedulePage            = lazy(() => import('../features/schedules/pages/SchedulePage'));
const NotificationsPage = lazy(() => import('../features/notifications/pages/NotificationsPage'));
const NotificationDetailPage = lazy(() => import('../features/notifications/pages/NotificationDetailPage'));

const TeacherStudentsPage     = lazy(() => import('../features/teacher/pages/TeacherStudentsPage'));
const TeacherBulletinPage     = lazy(() => import('../features/teacher/pages/TeacherBulletinPage'));
const TeacherDisciplinePage   = lazy(() => import('../features/teacher/pages/TeacherDisciplinePage'));
const TeacherHomeworkPage     = lazy(() => import('../features/teacher/pages/TeacherHomeworkPage'));
const ParentBulletinPage      = lazy(() => import('../features/parent/pages/ParentBulletinPage'));
const ParentPaymentsPage      = lazy(() => import('../features/parent/pages/ParentPaymentsPage'));
const ParentSchedulePage      = lazy(() => import('../features/parent/pages/ParentSchedulePage'));
const ParentHomeworkPage      = lazy(() => import('../features/parent/pages/ParentHomeworkPage'));
const ParentLibraryPage       = lazy(() => import('../features/parent/pages/ParentLibraryPage'));

// ─── Sidebar Admin Wrapper ──────────────────────────────────────────
const AdminLayoutWrapper: React.FC = () => (
  <SidebarLayout>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </SidebarLayout>
);

// ─── Topnav Teacher/Parent Wrapper ─────────────────────────────────// Topnav layout for public routes
// const TopnavLayoutWrapper: React.FC = () => (
//   <TopnavLayout>
//     <Suspense fallback={<PageLoader />}>
//       <Outlet />
//     </Suspense>
//   </TopnavLayout>
// );

// ─── Role-based Dashboard Redirect ─────────────────────────────────
const DashboardRedirect: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  // Teachers and Parents have their own dedicated routes
  if (user.role === 'TEACHER') return <DashboardEnseignant />;
  if (user.role === 'PARENT') return <DashboardParent />;

  // Admin roles – render the specific dashboard component for each role
  switch (user.role) {
    case 'ROOT':
      return <DashboardRoot />;
    case 'ADMIN_ROOT':
      return <DashboardAdmin />;
    case 'ADMIN_INSCRIPTIONS':
      return <DashboardAdmin />;
    case 'ADMIN_SCOLARITE':
      return <DashboardScolarite />;
    case 'FONDATEUR':
      return <DashboardFondateur />;
    case 'DIRECTEUR':
      return <DashboardDirecteur />;
    default:
      // Fallback to a generic admin dashboard if role is unrecognized
      return <DashboardAdmin />;
  }
};

// ─── Main Router ────────────────────────────────────────────────────
export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ═══ Public Routes ═══ */}
          <Route path="/"               element={<LandingPage />} />
          <Route path="/livres"         element={<LibraryPage />} />
          <Route path="/aide"           element={<HelpPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/a-propos"       element={<About />} />
          <Route path="/about"          element={<Navigate to="/a-propos" replace />} />
          {/* Registration disabled — redirect to login */}
          <Route path="/s-inscrire"     element={<Navigate to="/login" replace />} />

          {/* ═══ Admin Routes (Sidebar Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN']}>
                  <AdminLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* ── Students — Secretary(1), Director(4) ── */}
            <Route path="/students"                  element={<RequireAdminType allowedTypes={[1,4]}><StudentListPage /></RequireAdminType>} />
            <Route path="/students/new"              element={<RequireAdminType allowedTypes={[1,4]}><StudentNewPage /></RequireAdminType>} />
            <Route path="/students/pre-registrations" element={<RequireAdminType allowedTypes={[1,4]}><PreRegistrationListPage /></RequireAdminType>} />
            <Route path="/students/:id"              element={<RequireAdminType allowedTypes={[1,4]}><StudentDetailPage /></RequireAdminType>} />
            <Route path="/students/:id/edit"         element={<RequireAdminType allowedTypes={[1,4]}><StudentEditPage /></RequireAdminType>} />
            <Route path="/students/:id/assign"       element={<RequireAdminType allowedTypes={[1,4]}><StudentAssignPage /></RequireAdminType>} />
            <Route path="/students/:id/parents"      element={<RequireAdminType allowedTypes={[1,4]}><StudentParentsPage /></RequireAdminType>} />

            {/* ── Personnel — Secretary(1), Director(4) ── */}
            <Route path="/personnel" element={<RequireAdminType allowedTypes={[1,4]}><PersonnelListPage /></RequireAdminType>} />

            {/* ── Payments — Secretary(1), Scolarite(2), Founder(3), Director(4) ── */}
            <Route path="/payments" element={<RequireAdminType allowedTypes={[1,2,3,4]}><PaymentListPage /></RequireAdminType>} />
            <Route path="/payments/new" element={<RequireAdminType allowedTypes={[1,2,3,4]}><PaymentEntryPage /></RequireAdminType>} />

            {/* ── Messages — All Admin types ── */}
            <Route path="/messages" element={<MessageListPage />} />

            {/* ── Academic — Registrar(2), Director(4) ── */}
            <Route path="/academic"   element={<RequireAdminType allowedTypes={[2,4]}><AcademicConfigPage /></RequireAdminType>} />
            <Route path="/schedules"  element={<RequireAdminType allowedTypes={[2,4]}><SchedulePage /></RequireAdminType>} />
            <Route path="/grades"     element={<RequireAdminType allowedTypes={[2,4]}><GradeEntryPage /></RequireAdminType>} />
            <Route path="/bulletins"  element={<RequireAdminType allowedTypes={[2,4]}><BulletinPage /></RequireAdminType>} />
            <Route path="/discipline" element={<RequireAdminType allowedTypes={[2,4]}><DisciplinePage /></RequireAdminType>} />

            {/* ── Library — all except Root(0) ── */}
            <Route path="/library" element={<RequireAdminType allowedTypes={[1,2,3,4]}><LibraryManagePage /></RequireAdminType>} />

            {/* ── Stats — Founder(3), Director(4) ── */}
            <Route path="/stats" element={<RequireAdminType allowedTypes={[3,4]}><StatsPage /></RequireAdminType>} />

            {/* Password change — all admins route removed; merged into profile page */}
          </Route>

          {/* ═══ Shared Authenticated Routes (All roles) ═══ */}
          <Route element={<RequireAuth><AdminLayoutWrapper /></RequireAuth>}>
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notifications/:id" element={<NotificationDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/change-password" element={<Navigate to="/profile" replace />} />
          </Route>

          {/* ═══ Teacher Routes (Sidebar Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['TEACHER']}>
                  <AdminLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/teacher/dashboard"       element={<DashboardEnseignant />} />
            <Route path="/teacher/students"        element={<TeacherStudentsPage />} />
            <Route path="/teacher/grades"          element={<GradeEntryPage />} />
            <Route path="/teacher/bulletins"       element={<TeacherBulletinPage />} />
            <Route path="/teacher/schedules"       element={<SchedulePage />} />
            <Route path="/teacher/discipline"      element={<TeacherDisciplinePage />} />
            <Route path="/teacher/messages"        element={<MessageListPage />} />
            <Route path="/teacher/homeworks"       element={<TeacherHomeworkPage />} />
            <Route path="/teacher/change-password" element={<Navigate to="/profile" replace />} />
          </Route>

          {/* ═══ Parent Routes (Sidebar Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['PARENT']}>
                  <AdminLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/parent/dashboard"        element={<DashboardParent />} />
            <Route path="/parent/schedule"         element={<ParentSchedulePage />} />
            <Route path="/parent/bulletins"        element={<ParentBulletinPage />} />
            <Route path="/parent/payments"         element={<ParentPaymentsPage />} />
            <Route path="/parent/messages"         element={<MessageListPage />} />
            <Route path="/parent/homeworks"        element={<ParentHomeworkPage />} />
            <Route path="/parent/library"          element={<ParentLibraryPage />} />
            <Route path="/parent/change-password"  element={<Navigate to="/profile" replace />} />
          </Route>

          {/* ═══ Global Error Boundaries ═══ */}
          <Route path="/forbidden"   element={<Forbidden />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/404"         element={<NotFound />} />
          <Route path="*"            element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default Router;
