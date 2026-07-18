import type { TeacherStat, StudentStat } from '../types';

interface Props {
  teachers: TeacherStat;
  students: StudentStat;
}

export default function PeopleSummary({ teachers, students }: Props) {
  const teacherCards = [
    { label: 'Total Teachers', val: teachers.total, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Present Today', val: teachers.presentToday, color: '#10b981', bg: '#ecfdf5' },
    { label: 'On Approved Leave', val: teachers.onLeave, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Vacant Positions', val: teachers.vacancies, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Average Staff Rating', val: `${teachers.avgRating} / 5.0`, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Avg Experience', val: `${teachers.avgExperience} Years`, color: '#ec4899', bg: '#fdf2f8' }
  ];

  const studentCards = [
    { label: 'Total Students', val: students.total, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Male / Boys count', val: students.boys, color: '#10b981', bg: '#ecfdf5' },
    { label: 'Female / Girls count', val: students.girls, color: '#ec4899', bg: '#fdf2f8' },
    { label: 'New Admissions (Term 2)', val: students.newAdmissions, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Transfers In/Out', val: students.transfers, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Scholarships Awarded', val: students.scholarships, color: '#10b981', bg: '#ecfdf5' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Column 1: Student Demographics */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Student Cohort Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {studentCards.map((sc, idx) => (
            <div
              key={idx}
              style={{
                background: sc.bg,
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {sc.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px', letterSpacing: '-0.02em' }}>
                {sc.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Teacher Stats */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Teaching Staff Directory Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {teacherCards.map((tc, idx) => (
            <div
              key={idx}
              style={{
                background: tc.bg,
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {tc.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '2px', letterSpacing: '-0.02em' }}>
                {tc.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
