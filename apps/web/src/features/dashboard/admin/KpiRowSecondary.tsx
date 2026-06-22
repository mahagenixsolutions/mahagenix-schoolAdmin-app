import { useGetKpisQuery } from '../dashboardApi';
import KpiCard from './KpiCard';
import type { StatCardProps } from './KpiCard';
import { AlertCircle, CalendarClock, BookOpenCheck, UserPlus } from 'lucide-react';

export default function KpiRowSecondary({ academicYearId }: { academicYearId: string }) {
  const { data, isLoading } = useGetKpisQuery({ academicYearId }, { 
    skip: !academicYearId,
    pollingInterval: 300000 // 5 min auto-refresh
  });

  const cards: StatCardProps[] = [
    {
      label: 'Pending Fee Dues',
      value: `₹${(data?.pendingFeesAmount ?? 0).toLocaleString()}`,
      icon: <AlertCircle size={24} strokeWidth={2} />,
      accentColor: 'danger',
      accentHex: '#F43F5E', // Rose-500
      link: '/reports',
      state: data?.amountDue === 0 ? 'no_data' : 'normal',
      trend: {
        delta: '',
        direction: 'neutral',
        label: 'Total outstanding amount',
        isGood: false // Red text for attention
      },
      isLoading
    },
    {
      label: 'Upcoming Exams',
      value: data?.nextExam ? data.nextExam.name : 'None Scheduled',
      icon: <CalendarClock size={24} strokeWidth={2} />,
      accentColor: 'primary',
      accentHex: '#4F46E5', // Indigo-600
      link: '/academic-years',
      state: data?.nextExam ? 'normal' : 'no_data',
      trend: data?.nextExam ? {
        delta: new Date(data.nextExam.date).toLocaleDateString(),
        direction: 'neutral',
        label: 'Start date'
      } : undefined,
      isLoading
    },
    {
      label: 'Syllabus Completion',
      value: `${data?.syllabusCompletion ?? 0}%`,
      icon: <BookOpenCheck size={24} strokeWidth={2} />,
      accentColor: 'success',
      accentHex: '#10B981', // Emerald-500
      link: '/subjects',
      state: 'normal',
      trend: {
        delta: '',
        direction: 'neutral',
        label: 'Average across all subjects'
      },
      isLoading
    },
    {
      label: 'Open Admissions',
      value: (data?.openAdmissions ?? 0).toString(),
      icon: <UserPlus size={24} strokeWidth={2} />,
      accentColor: 'warning',
      accentHex: '#F59E0B', // Amber-500
      link: '/students',
      state: 'normal',
      trend: {
        delta: '',
        direction: 'neutral',
        label: 'Pending review applications',
        isGood: false // Amber text for attention
      },
      isLoading
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
