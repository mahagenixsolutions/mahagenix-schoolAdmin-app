import { useState } from 'react';
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
      navigate={navigate}
    />
  );
}

function AdminDashboardInner({
  greeting,
  activeYear,
  activeYearId,
  user,
  navigate,
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
      {
        className: 'Class 10 A',
        totalStudents: 38,
        paidCount: 33,
        pendingCount: 5,
        collectedAmount: 165000,
        totalAmount: 190000,
        percent: 86,
      },
      {
        className: 'Class 9 A',
        totalStudents: 42,
        paidCount: 34,
        pendingCount: 8,
        collectedAmount: 153000,
        totalAmount: 189000,
        percent: 80,
      },
      {
        className: 'Class 8 A',
        totalStudents: 35,
        paidCount: 24,
        pendingCount: 11,
        collectedAmount: 108000,
        totalAmount: 157500,
        percent: 68,
      },
    ],
    recentPayments: [
      {
        studentName: 'Aarav Mehta',
        className: 'Class 10 A',
        amount: 5000,
        date: '2026-06-23',
        method: 'Online' as const,
      },
      {
        studentName: 'Ishaan Sharma',
        className: 'Class 9 A',
        amount: 5000,
        date: '2026-06-23',
        method: 'Cash' as const,
      },
      {
        studentName: 'Ananya Iyer',
        className: 'Class 10 A',
        amount: 5000,
        date: '2026-06-22',
        method: 'Cheque' as const,
      },
      {
        studentName: 'Kabir Verma',
        className: 'Class 9 A',
        amount: 5000,
        date: '2026-06-22',
        method: 'Online' as const,
      },
      {
        studentName: 'Diya Patel',
        className: 'Class 8 A',
        amount: 4500,
        date: '2026-06-21',
        method: 'Online' as const,
      },
    ],
  };

  // TODO: Replace with useAdmissionsQuery() hook
  const admissionsData = {
    totalPending: kpis?.openAdmissions ?? 18,
    reviewedToday: 5,
    approvedThisMonth: 24,
    rejectedThisMonth: 3,
    applications: [
      {
        id: 'APP-001',
        studentName: 'Rohan Gupta',
        applyingForClass: 'Class 1',
        appliedDate: '2026-06-22',
        parentName: 'Amit Gupta',
        status: 'Pending' as const,
        daysWaiting: 1,
      },
      {
        id: 'APP-002',
        studentName: 'Sanya Malhotra',
        applyingForClass: 'Class 5',
        appliedDate: '2026-06-19',
        parentName: 'Raj Malhotra',
        status: 'Under Review' as const,
        daysWaiting: 4,
      },
      {
        id: 'APP-003',
        studentName: 'Vihaan Shah',
        applyingForClass: 'Class 9',
        appliedDate: '2026-06-14',
        parentName: 'Deepak Shah',
        status: 'Pending' as const,
        daysWaiting: 9,
      },
      {
        id: 'APP-004',
        studentName: 'Prisha Sen',
        applyingForClass: 'Class 9',
        appliedDate: '2026-06-20',
        parentName: 'Sanjay Sen',
        status: 'Under Review' as const,
        daysWaiting: 3,
      },
      {
        id: 'APP-005',
        studentName: 'Aditya Roy',
        applyingForClass: 'Class 3',
        appliedDate: '2026-06-12',
        parentName: 'Vikram Roy',
        status: 'Pending' as const,
        daysWaiting: 11,
      },
    ],
  };

  return (
    <div className="dashboard-grid" style={{ gap: '28px' }}>
      {/* [A] PAGE HEADER */}
      <div className="col-span-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 24, paddingBottom: 8 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 28, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            {greeting}, {user?.first_name} 👋
            <span style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 6, 
              padding: '4px 8px', borderRadius: 'var(--radius-sm)', 
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              fontSize: 11, fontWeight: 700, color: 'var(--accent-success)', letterSpacing: '0.05em'
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-success)', animation: 'pulse-dot 2s infinite' }} />
              LIVE
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · Academic Year {activeYear?.name || '2026-27'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ExportReportDropdown />
          <button 
            style={{ 
              background: 'var(--accent-primary)', color: '#fff', border: 'none', 
              padding: '8px 16px', borderRadius: 'var(--radius-md)', 
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }} 
            onClick={() => navigate('/students')}
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* 1. SCHOOL OVERVIEW SECTION */}
      <div className="col-span-12">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-primary)' }} />
          School Overview
        </h2>
        
        {/* KPI Cards representing Active Students, Active Teachers, Today's Attendance, Fee Collection Rate */}
        <KpiRow academicYearId={activeYearId} onFeeClick={() => setFeeModalOpen(true)} />
        
        {/* Secondary KPI Row representing Pending Fees, Upcoming Exams, Syllabus, New Admissions */}
        <div style={{ marginTop: '12px' }}>
          <KpiRowSecondary 
            academicYearId={activeYearId}
            onAdmissionsClick={() => setAdmissionsModalOpen(true)}
          />
        </div>
      </div>

      {/* 2. AI INSIGHTS SECTION */}
      <div className="col-span-12">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-violet)' }} />
          AI Insights
        </h2>
        <KeyInsightsStrip academicYearId={activeYearId} />
      </div>

      {/* 3. ATTENDANCE & FEES ANALYTICS CHARTS */}
      <div className="col-span-12 lg:col-span-8">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-success)' }} />
          Analytics & Performance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <AttendanceTrendChart />
          <ClassPerformanceTable academicYearId={activeYearId} />
        </div>
      </div>

      {/* 4. TODAY'S ATTENDANCE & FEE COLLECTION BREAKDOWNS */}
      <div className="col-span-12 lg:col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-warning)' }} />
          Circulation & Collections
        </h2>
        <AttendanceDonutChart />
        <FeeCollectionChart />
      </div>

      {/* 5. NOTIFICATIONS & ALERTS */}
      <div className="col-span-12">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-danger)' }} />
          Notifications & Alerts
        </h2>
        <AlertsBanner academicYearId={activeYearId} />
      </div>

      {/* 6. RECENT ACTIVITIES & CALENDAR SCHEDULE */}
      <div className="col-span-12 lg:col-span-6">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--text-secondary)' }} />
          Recent Activities
        </h2>
        <RecentActivityFeed />
      </div>

      <div className="col-span-12 lg:col-span-6">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '4px', height: '18px', borderRadius: '2px', background: 'var(--accent-primary)' }} />
          Calendar & Events
        </h2>
        <UpcomingEventsWidget academicYearId={activeYearId} />
      </div>

      {/* Quick Action Rails */}
      <div className="col-span-12">
        <QuickActionsGrid />
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
