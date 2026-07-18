import { mockClassPerformance, mockSubjectAverages } from '../../mock/academic';

interface AcademicProps {
  academicData: any;
}

export default function AcademicCommandCenter({ academicData }: AcademicProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '3px', height: '14px', background: '#3b82f6', borderRadius: '1px' }} />
          Syllabus & Curriculum Completion Index
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {[
            { label: 'Syllabus Progress Rate', val: `${academicData.syllabusProgress}%`, color: '#3b82f6' },
            { label: 'Homework Submission Rate', val: `${academicData.homeworkSubmission}%`, color: '#10b981' },
            { label: 'Lesson Plan Compliance', val: `${academicData.lessonPlanProgress}%`, color: '#8b5cf6' },
            { label: 'Exam Average Pass Score', val: `${academicData.avgExamScore}%`, color: '#f59e0b' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#fafbfe', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{item.val}</div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '10px' }}>
                <div style={{ width: item.val, height: '100%', background: item.color, borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Class performance table */}
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#334155', margin: '0 0 12px 0' }}>
          Cohort Quality Pass Matrix
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                <th style={{ padding: '10px', fontWeight: 700 }}>Class Level</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Average Score</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Daily Attendance</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Homework Compliance</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Status Badge</th>
              </tr>
            </thead>
            <tbody>
              {mockClassPerformance.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#1e293b' }}>{c.className}</td>
                  <td style={{ padding: '12px 10px', color: '#2563eb', fontWeight: 700 }}>{c.score}%</td>
                  <td style={{ padding: '12px 10px', color: '#475569' }}>{c.attendance}%</td>
                  <td style={{ padding: '12px 10px', color: '#475569' }}>{c.homework}%</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: c.status === 'Outstanding' ? '#10b981' : c.status === 'On Target' ? '#3b82f6' : '#ef4444',
                        background: c.status === 'Outstanding' ? '#ecfdf5' : c.status === 'On Target' ? '#eff6ff' : '#fef2f2',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: '0 0 16px 0' }}>
          Subject performance pass indices
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {mockSubjectAverages.map((sub, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{sub.subject}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Pass Ratio: {sub.passRate}%</div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#3b82f6' }}>{sub.average}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
