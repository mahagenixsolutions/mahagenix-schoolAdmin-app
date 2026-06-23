import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store';
import { useGetAcademicYearsQuery } from '../../academic-years/academicYearsApi';
import { useGetKpisQuery } from '../dashboardApi';
import { useRegisterAIContext } from '../../../hooks/useAIContext';
import AlertsBanner from './AlertsBanner';
import KpiRow from './KpiRow';
import KpiRowSecondary from './KpiRowSecondary';
import KeyInsightsStrip from './KeyInsightsStrip';
import QuickActionsGrid from './QuickActionsGrid';
import ClassPerformanceTable from './ClassPerformanceTable';
import AttendanceTrendChart from './AttendanceTrendChart';
import SubjectPerformanceChart from './SubjectPerformanceChart';
import AttendanceDonutChart from './AttendanceDonutChart';
import FeeCollectionChart from './FeeCollectionChart';
import RecentActivityFeed from './RecentActivityFeed';
import UpcomingEventsWidget from './UpcomingEventsWidget';
import ExportReportDropdown from './ExportReportDropdown';
import FeeCollectionModal from '../../../components/modals/FeeCollectionModal';
import OpenAdmissionsModal from '../../../components/modals/OpenAdmissionsModal';

export default function AdminDashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const navigate = useNavigate();
  const [lastRefreshed] = useState<Date>(new Date());
  const [timeAgo, setTimeAgo] = useState('just now');

  // Auto-refresh timer and last updated display
  useEffect(() => {
    const timeAgoInterval = setInterval(() => {
      const diffMinutes = Math.floor((new Date().getTime() - lastRefreshed.getTime()) / 60000);
      if (diffMinutes === 0) setTimeAgo('just now');
      else if (diffMinutes === 1) setTimeAgo('1 min ago');
      else setTimeAgo(`${diffMinutes} mins ago`);
    }, 60000);

    return () => {
      clearInterval(timeAgoInterval);
    };
  }, [lastRefreshed]);

  const handleManualRefresh = () => {
    window.location.reload();
  };

  // Fetch academic years to find the active one
  const { data: yearsData, isLoading: isYearsLoading } = useGetAcademicYearsQuery();

  const greetingHour = new Date().getHours();
  const greeting =
    greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  // Get active year ID
  const activeYear = yearsData?.find((y: any) => y.is_current) || yearsData?.[0];
  const activeYearId = activeYear?.id || '';

  if (isYearsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <AdminDashboardInner
      greeting={greeting}
      activeYear={activeYear}
      activeYearId={activeYearId}
      user={user}
      timeAgo={timeAgo}
      navigate={navigate}
      handleManualRefresh={handleManualRefresh}
    />
  );
}

function AdminDashboardInner({
  greeting,
  activeYear,
  activeYearId,
  user,
  timeAgo,
  navigate,
  handleManualRefresh,
}: any) {
  // Fetch KPIs for AI context registration
  const { data: kpis } = useGetKpisQuery({ academicYearId: activeYearId }, { skip: !activeYearId });

  // Push dashboard metrics to AI assistant
  useRegisterAIContext({
    dashboardMetrics: kpis ?? {},
  });

  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [admissionsModalOpen, setAdmissionsModalOpen] = useState(false);

  // TODO: Replace with useFeeCollectionQuery() hook
  const feeCollectionData = {
    collectedAmount: kpis?.amountCollected ?? 1854000,
    totalAmount: kpis?.amountDue ?? 2160000,
    collectionPercent: kpis?.feeCollectionRate ?? 86,
    pendingAmount: kpis?.pendingFeesAmount ?? 306000,
    month: 'June 2026',
    classBreakdown: [
      { className: 'Class 12 A', totalStudents: 40, paidCount: 38, pendingCount: 2, collectedAmount: 190000, totalAmount: 200000, percent: 95 },
      { className: 'Class 11 A', totalStudents: 45, paidCount: 41, pendingCount: 4, collectedAmount: 205000, totalAmount: 225000, percent: 91 },
      { className: 'Class 10 A', totalStudents: 38, paidCount: 33, pendingCount: 5, collectedAmount: 165000, totalAmount: 190000, percent: 86 },
      { className: 'Class 9 A', totalStudents: 42, paidCount: 34, pendingCount: 8, collectedAmount: 153000, totalAmount: 189000, percent: 80 },
      { className: 'Class 8 A', totalStudents: 35, paidCount: 24, pendingCount: 11, collectedAmount: 108000, totalAmount: 157500, percent: 68 },
    ],
    recentPayments: [
      { studentName: 'Aarav Mehta', className: 'Class 12 A', amount: 5000, date: '2026-06-23', method: 'Online' as const },
      { studentName: 'Ishaan Sharma', className: 'Class 11 A', amount: 5000, date: '2026-06-23', method: 'Cash' as const },
      { studentName: 'Ananya Iyer', className: 'Class 10 A', amount: 5000, date: '2026-06-22', method: 'Cheque' as const },
      { studentName: 'Kabir Verma', className: 'Class 9 A', amount: 5000, date: '2026-06-22', method: 'Online' as const },
      { studentName: 'Diya Patel', className: 'Class 8 A', amount: 4500, date: '2026-06-21', method: 'Online' as const },
    ],
  };

  // TODO: Replace with useAdmissionsQuery() hook
  const admissionsData = {
    totalPending: kpis?.openAdmissions ?? 18,
    reviewedToday: 5,
    approvedThisMonth: 24,
    rejectedThisMonth: 3,
    applications: [
      { id: 'APP-001', studentName: 'Rohan Gupta', applyingForClass: 'Class 1', appliedDate: '2026-06-22', parentName: 'Amit Gupta', status: 'Pending' as const, daysWaiting: 1 },
      { id: 'APP-002', studentName: 'Sanya Malhotra', applyingForClass: 'Class 5', appliedDate: '2026-06-19', parentName: 'Raj Malhotra', status: 'Under Review' as const, daysWaiting: 4 },
      { id: 'APP-003', studentName: 'Vihaan Shah', applyingForClass: 'Class 9', appliedDate: '2026-06-14', parentName: 'Deepak Shah', status: 'Pending' as const, daysWaiting: 9 },
      { id: 'APP-004', studentName: 'Prisha Sen', applyingForClass: 'Class 11', appliedDate: '2026-06-20', parentName: 'Sanjay Sen', status: 'Under Review' as const, daysWaiting: 3 },
      { id: 'APP-005', studentName: 'Aditya Roy', applyingForClass: 'Class 3', appliedDate: '2026-06-12', parentName: 'Vikram Roy', status: 'Pending' as const, daysWaiting: 11 },
    ],
  };

  return (
    <div>
      {/* 1. Header Bar */}
      <div className="page-header" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">
            {greeting}, {user?.first_name}! 👋
          </h1>
          <p className="page-subtitle">
            {activeYear?.name ? `Term: ${activeYear.name} • ` : ''}Here's what's happening at your
            school today.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>Last updated {timeAgo}</span>
            <button
              onClick={handleManualRefresh}
              className="btn btn-ghost btn-icon"
              style={{ width: 28, height: 28, padding: 0 }}
              title="Refresh Dashboard"
            >
              <i className="ti ti-refresh" />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <ExportReportDropdown />
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/students/new')}>
              + Add Student
            </button>
          </div>
        </div>
      </div>

      {/* 2. Alerts Banner */}
      <AlertsBanner academicYearId={activeYearId} />

      {/* 3. Primary KPI Row */}
      <KpiRow academicYearId={activeYearId} onFeeClick={() => setFeeModalOpen(true)} />

      {/* 4. Secondary KPI Row */}
      <KpiRowSecondary academicYearId={activeYearId} onAdmissionsClick={() => setAdmissionsModalOpen(true)} />

      {/* 5. Key Insights Strip */}
      <KeyInsightsStrip academicYearId={activeYearId} />

      {/* 6. Quick Actions Grid */}
      <QuickActionsGrid />

      {/* 7. Class Performance Table (Above charts) */}
      <ClassPerformanceTable academicYearId={activeYearId} />

      {/* 8. Charts Row 1 */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <AttendanceTrendChart />
        <SubjectPerformanceChart academicYearId={activeYearId} />
      </div>

      {/* 9. Charts Row 2 */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <AttendanceDonutChart />
        <RecentActivityFeed />
      </div>

      {/* 10. Charts Row 3 */}
      <div className="grid-2">
        <FeeCollectionChart />
        <UpcomingEventsWidget academicYearId={activeYearId} />
      </div>

      {/* Modals */}
      <FeeCollectionModal
        isOpen={feeModalOpen}
        onClose={() => setFeeModalOpen(false)}
        data={feeCollectionData}
      />
      <OpenAdmissionsModal
        isOpen={admissionsModalOpen}
        onClose={() => setAdmissionsModalOpen(false)}
        data={admissionsData}
      />
    </div>
  );
}
