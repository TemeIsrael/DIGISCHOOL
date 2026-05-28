import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { RequireAuth } from '../shared/components/RequireAuth';
import { RequireRole } from '../shared/components/RequireRole';
import { RequireAdminType } from '../shared/components/RequireAdminType';

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

// ─── Existing Feature Pages ─────────────────────────────────────────
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
const AuditLogPage = lazy(() => import('../features/audit/pages/AuditLogPage'));
const SchedulePage = lazy(() => import('../features/schedules/pages/SchedulePage'));

// ─── Root Admin Pages ───────────────────────────────────────────────
const AdminListPage = lazy(() => import('../features/root/pages/AdminListPage'));
const AdminFormPage = lazy(() => import('../features/root/pages/AdminFormPage'));
const ParentListPage = lazy(() => import('../features/root/pages/ParentListPage'));
const CredentialSendPage = lazy(() => import('../features/root/pages/CredentialSendPage'));
const CycleManagePage = lazy(() => import('../features/root/pages/CycleManagePage'));
const ClassManagePage = lazy(() => import('../features/root/pages/ClassManagePage'));
const RoomManagePage = lazy(() => import('../features/root/pages/RoomManagePage'));
const YearManagePage = lazy(() => import('../features/root/pages/YearManagePage'));
const TermManagePage = lazy(() => import('../features/root/pages/TermManagePage'));
const ReferentialPage = lazy(() => import('../features/root/pages/ReferentialPage'));
const PersonnelFormPage = lazy(() => import('../features/root/pages/PersonnelFormPage'));

// ─── Scolarité Pages ────────────────────────────────────────────────
const PaymentNewPage = lazy(() => import('../features/scolarite/pages/PaymentNewPage'));
const PaymentDetailPage = lazy(() => import('../features/scolarite/pages/PaymentDetailPage'));
const StudentPaymentPage = lazy(() => import('../features/scolarite/pages/StudentPaymentPage'));
const OverdueListPage = lazy(() => import('../features/scolarite/pages/OverdueListPage'));
const ReminderPage = lazy(() => import('../features/scolarite/pages/ReminderPage'));
const FinancialReportPage = lazy(() => import('../features/scolarite/pages/FinancialReportPage'));
const PaymentByModePage = lazy(() => import('../features/scolarite/pages/PaymentByModePage'));
const PaymentModesPage = lazy(() => import('../features/scolarite/pages/PaymentModesPage'));
const AccountingExportPage = lazy(() => import('../features/scolarite/pages/AccountingExportPage'));

// ─── Fondateur Pages ────────────────────────────────────────────────
const TuitionListPage = lazy(() => import('../features/fondateur/pages/TuitionListPage'));
const TuitionFormPage = lazy(() => import('../features/fondateur/pages/TuitionFormPage'));
const TranchePage = lazy(() => import('../features/fondateur/pages/TranchePage'));
const FondateurPaymentModesPage = lazy(() => import('../features/fondateur/pages/FondateurPaymentModesPage'));
const AnnualBalancePage = lazy(() => import('../features/fondateur/pages/AnnualBalancePage'));
const YearComparePage = lazy(() => import('../features/fondateur/pages/YearComparePage'));
const ExplorerPage = lazy(() => import('../features/fondateur/pages/ExplorerPage'));

// ─── Directeur Pages ────────────────────────────────────────────────
const PerfClassesPage = lazy(() => import('../features/directeur/pages/PerfClassesPage'));
const PerfCoursesPage = lazy(() => import('../features/directeur/pages/PerfCoursesPage'));
const PerfStudentsPage = lazy(() => import('../features/directeur/pages/PerfStudentsPage'));
const BulletinValidationPage = lazy(() => import('../features/directeur/pages/BulletinValidationPage'));
const MessageValidationPage = lazy(() => import('../features/directeur/pages/MessageValidationPage'));
const DisciplineApprovalPage = lazy(() => import('../features/directeur/pages/DisciplineApprovalPage'));
const TeacherOverviewPage = lazy(() => import('../features/directeur/pages/TeacherOverviewPage'));
const StudentOverviewPage = lazy(() => import('../features/directeur/pages/StudentOverviewPage'));
const DemographicsPage = lazy(() => import('../features/directeur/pages/DemographicsPage'));
const SyntheticReportsPage = lazy(() => import('../features/directeur/pages/SyntheticReportsPage'));

// ─── Auditeur Pages ─────────────────────────────────────────────────
const AllListingsPage = lazy(() => import('../features/auditeur/pages/AllListingsPage'));
const AuditLogsPage = lazy(() => import('../features/auditeur/pages/AuditLogsPage'));
const FinanceStatsPage = lazy(() => import('../features/auditeur/pages/FinanceStatsPage'));
const PedagogyStatsPage = lazy(() => import('../features/auditeur/pages/PedagogyStatsPage'));
const ExportsPage = lazy(() => import('../features/auditeur/pages/ExportsPage'));

// ─── Staff / Administratif Pages ────────────────────────────────────
const DashboardStaffPage = lazy(() => import('../features/staff/pages/DashboardStaffPage'));
const FileListPage = lazy(() => import('../features/staff/pages/FileListPage'));
const FileNewPage = lazy(() => import('../features/staff/pages/FileNewPage'));
const StaffStudentDetailPage = lazy(() => import('../features/staff/pages/StaffStudentDetailPage'));

// ─── Layout Wrappers ────────────────────────────────────────────────
const AdminLayoutWrapper: React.FC = () => (
  <SidebarLayout>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </SidebarLayout>
);

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

  if (user?.role === 'TEACHER') return <Navigate to="/teacher/dashboard" replace />;
  if (user?.role === 'PARENT') return <Navigate to="/parent/dashboard" replace />;

  switch (typeAdmin) {
    case 0: return <Navigate to="/root" replace />;
    case 1: return <Navigate to="/administr" replace />;
    case 2: return <Navigate to="/scolarite" replace />;
    case 3: return <Navigate to="/fondateur" replace />;
    case 4: return <Navigate to="/directeur" replace />;
    case 5: return <Navigate to="/auditeur" replace />;
    default: return <Navigate to="/administr" replace />;
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
          <Route path="/dashboard" element={<RequireAuth><DashboardRedirect /></RequireAuth>} />

          {/* ═══ Root Admin Routes (typeAdmin=0) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[0]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/root" element={<DashboardRoot />} />
            <Route path="/root/admins" element={<AdminListPage />} />
            <Route path="/root/admins/new" element={<AdminFormPage />} />
            <Route path="/root/admins/:id" element={<AdminFormPage />} />
            <Route path="/root/personnel" element={<PersonnelListPage />} />
            <Route path="/root/personnel/new" element={<PersonnelFormPage />} />
            <Route path="/root/personnel/:id" element={<PersonnelFormPage />} />
            <Route path="/root/parents" element={<ParentListPage />} />
            <Route path="/root/credentials" element={<CredentialSendPage />} />
            <Route path="/root/cycles" element={<CycleManagePage />} />
            <Route path="/root/classes" element={<ClassManagePage />} />
            <Route path="/root/salles" element={<RoomManagePage />} />
            <Route path="/root/years" element={<YearManagePage />} />
            <Route path="/root/terms" element={<TermManagePage />} />
            <Route path="/root/refs" element={<ReferentialPage />} />
            <Route path="/root/audit" element={<AuditLogPage />} />
            <Route path="/root/messages" element={<MessageListPage />} />
            <Route path="/root/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Secrétariat / Admin Inscriptions Routes (typeAdmin=1) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[1]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/administr" element={<DashboardAdmin />} />
            <Route path="/administr/students" element={<StudentListPage />} />
            <Route path="/administr/students/new" element={<StudentNewPage />} />
            <Route path="/administr/students/:id" element={<StudentDetailPage />} />
            <Route path="/administr/students/:id/edit" element={<StudentEditPage />} />
            <Route path="/administr/students/:id/assign" element={<StudentAssignPage />} />
            <Route path="/administr/students/:id/parents" element={<StudentParentsPage />} />
            <Route path="/administr/messages" element={<MessageListPage />} />
            <Route path="/administr/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Scolarité Routes (typeAdmin=2) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[2]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/scolarite" element={<DashboardScolarite />} />
            <Route path="/scolarite/payments" element={<PaymentListPage />} />
            <Route path="/scolarite/payments/new" element={<PaymentNewPage />} />
            <Route path="/scolarite/payments/:id" element={<PaymentDetailPage />} />
            <Route path="/scolarite/students/:matricule/payments" element={<StudentPaymentPage />} />
            <Route path="/scolarite/overdue" element={<OverdueListPage />} />
            <Route path="/scolarite/reminders" element={<ReminderPage />} />
            <Route path="/scolarite/reports" element={<FinancialReportPage />} />
            <Route path="/scolarite/by-mode" element={<PaymentByModePage />} />
            <Route path="/scolarite/modes" element={<PaymentModesPage />} />
            <Route path="/scolarite/export" element={<AccountingExportPage />} />
            <Route path="/scolarite/messages" element={<MessageListPage />} />
            <Route path="/scolarite/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Fondateur Routes (typeAdmin=3) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[3]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/fondateur" element={<DashboardFondateur />} />
            <Route path="/fondateur/tuitions" element={<TuitionListPage />} />
            <Route path="/fondateur/tuitions/new" element={<TuitionFormPage />} />
            <Route path="/fondateur/tranches" element={<TranchePage />} />
            <Route path="/fondateur/modes" element={<FondateurPaymentModesPage />} />
            <Route path="/fondateur/balance" element={<AnnualBalancePage />} />
            <Route path="/fondateur/compare" element={<YearComparePage />} />
            <Route path="/fondateur/explore" element={<ExplorerPage />} />
            <Route path="/fondateur/messages" element={<MessageListPage />} />
            <Route path="/fondateur/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Directeur Routes (typeAdmin=4) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[4]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/directeur" element={<DashboardDirecteur />} />
            <Route path="/directeur/perf/classes" element={<PerfClassesPage />} />
            <Route path="/directeur/perf/courses" element={<PerfCoursesPage />} />
            <Route path="/directeur/perf/students" element={<PerfStudentsPage />} />
            <Route path="/directeur/bulletins" element={<BulletinValidationPage />} />
            <Route path="/directeur/messages" element={<MessageValidationPage />} />
            <Route path="/directeur/discipline" element={<DisciplineApprovalPage />} />
            <Route path="/directeur/teachers" element={<TeacherOverviewPage />} />
            <Route path="/directeur/students" element={<StudentOverviewPage />} />
            <Route path="/directeur/demographics" element={<DemographicsPage />} />
            <Route path="/directeur/reports" element={<SyntheticReportsPage />} />
            <Route path="/directeur/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Auditeur Routes (typeAdmin=5) ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <RequireAdminType allowedTypes={[5]}>
                    <AdminLayoutWrapper />
                  </RequireAdminType>
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/auditeur" element={<DashboardAuditeur />} />
            <Route path="/auditeur/listings" element={<AllListingsPage />} />
            <Route path="/auditeur/audit-logs" element={<AuditLogsPage />} />
            <Route path="/auditeur/finance" element={<FinanceStatsPage />} />
            <Route path="/auditeur/pedagogy" element={<PedagogyStatsPage />} />
            <Route path="/auditeur/exports" element={<ExportsPage />} />
            <Route path="/auditeur/change-password" element={<ChangePasswordPage />} />
          </Route>

          {/* ═══ Staff / Administratif Routes ═══ */}
          <Route
            element={
              <RequireAuth>
                <RequireRole allowedRoles={['ADMIN']}>
                  <AdminLayoutWrapper />
                </RequireRole>
              </RequireAuth>
            }
          >
            <Route path="/staff" element={<DashboardStaffPage />} />
            <Route path="/staff/files" element={<FileListPage />} />
            <Route path="/staff/files/new" element={<FileNewPage />} />
            <Route path="/staff/students/:matricule" element={<StaffStudentDetailPage />} />
            <Route path="/staff/change-password" element={<ChangePasswordPage />} />
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
