import type { AcademicData } from '../types';

interface Props {
  data: AcademicData;
}

export default function AcademicInsights({ data }: Props) {
  const metrics = [
    { label: 'Homework Completion', val: data.homeworkCompletion, color: '#3b82f6', icon: '📝' },
    { label: 'Lesson Plan Progress', val: data.lessonPlanCompletion, color: '#10b981', icon: '📅' },
    { label: 'Assignment Submissions', val: data.assignmentSubmission, color: '#f59e0b', icon: '📤' }
  ];

  const highlights = [
    { label: 'Average Exam Grade', val: data.averageGrade, sub: 'Target: A', icon: '🏆', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Top Performing Class', val: data.topPerformingClass, sub: 'Avg Score: 94.6%', icon: '📈', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Lowest Performing Class', val: data.lowestPerformingClass, sub: 'Avg Score: 71.2%', icon: '📉', color: '#ef4444', bg: '#fef2f2' },
    { label: 'Upcoming Term Exams', val: `${data.upcomingExamsCount} Exams`, sub: 'Starting Aug 10', icon: '📄', color: '#3b82f6', bg: '#eff6ff' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Metrics Progress bars Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Syllabus & Homework Metrics
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {metrics.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#334155' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {m.icon} {m.label}
                </span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{m.val}%</span>
              </div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${m.val}%`, height: '100%', background: m.color, borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Grid Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ margin: '0 0 18px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Academic Performance Summary
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {highlights.map((h, idx) => (
            <div
              key={idx}
              style={{
                background: h.bg,
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ fontSize: '20px', color: h.color, width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {h.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {h.label}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {h.val}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                  {h.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
