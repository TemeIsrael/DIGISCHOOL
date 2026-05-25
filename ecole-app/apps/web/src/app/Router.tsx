import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { RequireAuth } from '../shared/components/RequireAuth';
import { RequireRole } from '../shared/components/RequireRole';

// Layouts
import { SidebarLayout } from '../shared/components/layout/SidebarLayout';
import { TopnavLayout } from '../shared/components/layout/TopnavLayout';

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
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LibraryPage = lazy(() => import('../pages/LibraryPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('../features/auth/pages/ChangePasswordPage'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Forbidden = lazy(() => import('../pages/Forbidden'));
const Maintenance = lazy(() => import('../pages/Maintenance'));

// ─── Lazy-loaded Dashboards ────────────────────────────────────────
const DashboardRoot = lazy(() => import('../features/dashboards/DashboardRoot'));
const DashboardAdmin = lazy(() => import('../features/dashboards/DashboardAdmin'));
const DashboardScolarite = lazy(() => import('../features/dashboards/DashboardScolarite'));
const DashboardFondateur = lazy(() => import('../features/dashboards/DashboardFondateur'));
const DashboardDirecteur = lazy(() => import('../features/dashboards/DashboardDirecteur'));
const DashboardAuditeur = lazy(() => import('../features/dashboards/DashboardAuditeur'));
const DashboardEnseignant = lazy(() => import('../features/dashboards/DashboardEnseignant'));
const DashboardParent = lazy(() => import('../features/dashboards/DashboardParent'));

// ─── Lazy-loaded Feature Pages ─────────────────────────────────────
const StudentListPage = lazy(() => import('../features/students/pages/StudentListPage'));
const StudentNewPage = lazy(() => import('../features/students/pages/StudentNewPage'));
const StudentDetailPage = lazy(() => import('../features/students/pages/StudentDetailPage'));
const StudentEditPage = lazy(() => import('../features/students/pages/StudentEditPage'));
const StudentAssignPage = lazy(() => import('../features/students/pages/StudentAssignPage'));
const StudentParentsPage = lazy(() => import('../features/students/pages/StudentParentsPage'));
const PersonnelListPage = lazy(() => import('../features/personnel/pages/PersonnelListPage'));
const PaymentListPage = lazy(() => import('../features/payments/pages/PaymentListPage'));
const GradeEntryPage = lazy(() => import('../features/grades/pages/GradeEntryPage'));
const BulletinPage = lazy(() => import('../features/grades/pages/BulletinPage'));
const MessageListPage = lazy(() => import('../features/messages/pages/MessageListPage'));
const DisciplinePage = lazy(() => import('../features/discipline/pages/DisciplinePage'));
const AcademicConfigPage = lazy(() => import('../features/academic/pages/AcademicConfigPage'));
const LibraryManagePage = lazy(() => import('../features/library/pages/LibraryManagePage'));
const AuditLogPage = lazy(() => import('../features/audit/pages/AuditLogPage'));
const StatsPage = lazy(() => import('../features/stats/pages/StatsPage'));
const SchedulePage = lazy(() => import('../features/schedules/pages/SchedulePage'));

// ─── Sidebar Admin Wrapper ──────────────────────────────────────────
const AdminLayoutWrapper: React.FC = () => (
  <SidebarLayout>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </SidebarLayout>
);

// ─── Topnav Teacher/Parent Wrapper ─────────────────────────────────
const TopnavLayoutWrapper: React.FC = () => (
  <TopnavLayout>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </TopnavLayout>
);

// ─── Role-based Dashboard Redirect ─────────────────────────────────
const DashboardRedirect: React.FC = () => {
  const { user } = useAuthStore();
  const typeAdmin = user?.typeAdmin;

  if (user?.role === 'TEACHER') return <DashboardEnseignant />;
  if (user?.role === 'PARENT') return <DashboardParent />;

  // Admin sub-types
  switch (typeAdmin) {
    case 0: return <DashboardRoot />;
    case 1: return <DashboardAdmin />;
    case 2: return <DashboardScolarite />;
    case 3: return <DashboardFondateur />;
    case 4: return <DashboardDirecteur />;
    case 5: return <DashboardAuditeur />;
    default: return <DashboardAdmin />;
  }
};

// ─── Main Router ────────────────────────────────────────────────────
export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ═══ Public Routes ═══ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/livres" element={<LibraryPage />} />
          <Route path="/s-inscrire" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/about" element={<Navigate to="/a-propos" replace />} />

          {/* ═══ Admin Routes (Sidebar Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <AdminLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/students" element={<StudentListPage />} />
            <Route path="/students/new" element={<StudentNewPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/students/:id/edit" element={<StudentEditPage />} />
            <Route path="/students/:id/assign" element={<StudentAssignPage />} />
            <Route path="/students/:id/parents" element={<StudentParentsPage />} />
            <Route path="/personnel" element={<PersonnelListPage />} />
            <Route path="/payments" element={<PaymentListPage />} />
            <Route path="/grades" element={<GradeEntryPage />} />
            <Route path="/bulletins" element={<BulletinPage />} />
            <Route path="/messages" element={<MessageListPage />} />
            <Route path="/discipline" element={<DisciplinePage />} />
            <Route path="/academic" element={<AcademicConfigPage />} />
            <Route path="/library" element={<LibraryManagePage />} />
            <Route path="/audit" element={<AuditLogPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/schedules" element={<SchedulePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Teacher Routes (Topnav Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['TEACHER']}>
                  <TopnavLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/teacher/dashboard" element={<DashboardEnseignant />} />
            <Route path="/teacher/grades" element={<GradeEntryPage />} />
            <Route path="/teacher/schedules" element={<SchedulePage />} />
            <Route path="/teacher/messages" element={<MessageListPage />} />
            <Route path="/teacher/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Parent Routes (Topnav Layout) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['PARENT']}>
                  <TopnavLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/parent/dashboard" element={<DashboardParent />} />
            <Route path="/parent/bulletins" element={<BulletinPage />} />
            <Route path="/parent/payments" element={<PaymentListPage />} />
            <Route path="/parent/messages" element={<MessageListPage />} />
            <Route path="/parent/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Global Error Boundaries ═══ */}
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default Router;
