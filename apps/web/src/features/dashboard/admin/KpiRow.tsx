import { useGetKpisQuery } from '../dashboardApi';
import KpiCard from './KpiCard';
import type { StatCardProps } from './KpiCard';
import { Users, ClipboardCheck, GraduationCap, CreditCard } from 'lucide-react';

export default function KpiRow({
  academicYearId,
  onFeeClick,
}: {
  academicYearId: string;
  onFeeClick?: () => void;
}) {
  const { data, isLoading } = useGetKpisQuery({ academicYearId }, { 
    skip: !academicYearId,
    pollingInterval: 300000 // 5 min auto-refresh
  });

  const cards: StatCardProps[] = [
    {
      label: 'Active Students',
      value: (data?.totalStudents ?? 0).toLocaleString(),
      icon: <Users size={24} strokeWidth={2} />,
      accentColor: 'primary',
      accentHex: '#4F46E5', // Indigo-600
      link: '/students',
      state: 'normal',
      trend: {
        delta: data?.newStudentsThisMonth >= 0 ? `+${data?.newStudentsThisMonth}` : `${data?.newStudentsThisMonth ?? 0}`,
        direction: data?.newStudentsThisMonth >= 0 ? 'up' : 'down',
        label: 'this month',
        isGood: data?.newStudentsThisMonth > 0 ? true : undefined
      },
      isLoading
    },
    {
      label: "Today's Attendance",
      value: `${data?.attendanceRateToday ?? 0}%`,
      icon: <ClipboardCheck size={24} strokeWidth={2} />,
      accentColor: (data?.attendanceRateToday ?? 0) > 90 ? 'success' : (data?.attendanceRateToday ?? 0) > 75 ? 'warning' : 'danger',
      accentHex: (data?.attendanceRateToday ?? 0) > 90 ? '#10B981' : (data?.attendanceRateToday ?? 0) > 75 ? '#F59E0B' : '#F43F5E',
      link: '/attendance?date=today',
      state: data?.totalStudents === 0 ? 'no_data' : 'normal',
      trend: {
        delta: data?.prevMonthAttendanceRate ? `${Math.abs(data.attendanceRateToday - data.prevMonthAttendanceRate)}%` : 'Live',
        direction: (data?.attendanceRateToday - (data?.prevMonthAttendanceRate || 0)) >= 0 ? 'up' : 'down',
        label: data?.prevMonthAttendanceRate ? 'vs last month' : 'today',
        isGood: (data?.attendanceRateToday - (data?.prevMonthAttendanceRate || 0)) >= 0 ? true : false
      },
      isLoading
    },
    {
      label: 'Active Teachers',
      value: (data?.totalTeachers ?? 0).toString(),
      icon: <GraduationCap size={24} strokeWidth={2} />,
      accentColor: 'info',
      accentHex: '#0EA5E9', // Sky-500
      link: '/users',
      state: 'normal',
      trend: {
        delta: `${data?.teachersOnLeaveToday ?? 0}`,
        direction: (data?.teachersOnLeaveToday ?? 0) > 0 ? 'down' : 'neutral',
        label: 'on leave today',
        isGood: (data?.teachersOnLeaveToday ?? 0) > 0 ? false : undefined
      },
      isLoading
    },
    {
      label: 'Fee Collection (This Month)',
      value: `${data?.feeCollectionRate ?? 0}%`,
      icon: <CreditCard size={24} strokeWidth={2} />,
      accentColor: (data?.feeCollectionRate ?? 0) > 90 ? 'success' : (data?.feeCollectionRate ?? 0) > 70 ? 'warning' : 'danger',
      accentHex: (data?.feeCollectionRate ?? 0) > 90 ? '#10B981' : (data?.feeCollectionRate ?? 0) > 70 ? '#F59E0B' : '#F43F5E',
      link: '/reports',
      state: data?.amountDue === 0 ? 'setup_required' : 'normal',
      setupCta: { label: 'Configure Fees', link: '/fees/setup' },
      trend: {
        delta: data?.amountDue > 0 ? `₹${(data?.amountCollected ?? 0).toLocaleString()}` : '',
        direction: 'neutral',
        label: data?.amountDue > 0 ? `of ₹${(data?.amountDue ?? 0).toLocaleString()}` : '',
        isGood: undefined
      },
      isLoading,
      onClick: onFeeClick
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '24px'
    }}>
      {cards.map((card, idx) => (
        <KpiCard key={idx} {...card} />
      ))}
    </div>
  );
}
