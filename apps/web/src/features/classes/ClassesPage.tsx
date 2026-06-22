import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, ChevronRight, School, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock Data for UI Phase
const mockClasses = [
  { gradeNum: 1, name: 'Class 1', section: 'A', students: 24, teacher: 'Anita Desai', attendance: 95, performance: 88 },
  { gradeNum: 2, name: 'Class 2', section: 'A', students: 22, teacher: 'Vikram Singh', attendance: 92, performance: 81 },
  { gradeNum: 3, name: 'Class 3', section: 'A', students: 26, teacher: 'Priya Patel', attendance: 96, performance: 91 },
  { gradeNum: 4, name: 'Class 4', section: 'A', students: 25, teacher: 'Rahul Sharma', attendance: 88, performance: 72 }, // Needs attention
  { gradeNum: 5, name: 'Class 5', section: 'A', students: 28, teacher: 'Neha Gupta', attendance: 94, performance: 85 },
  { gradeNum: 6, name: 'Class 6', section: 'A', students: 30, teacher: 'Sanjay Kumar', attendance: 91, performance: 78 },
  { gradeNum: 7, name: 'Class 7', section: 'A', students: 29, teacher: 'Meera Reddy', attendance: 97, performance: 94 },
  { gradeNum: 8, name: 'Class 8', section: 'A', students: 31, teacher: 'Amit Joshi', attendance: 85, performance: 68 }, // Needs attention
  { gradeNum: 9, name: 'Class 9', section: 'A', students: 35, teacher: 'Kavita Menon', attendance: 93, performance: 82 },
  { gradeNum: 10, name: 'Class 10', section: 'A', students: 34, teacher: 'Rajesh Iyer', attendance: 95, performance: 89 },
  { gradeNum: 11, name: 'Class 11', section: 'Sci', students: 40, teacher: 'Dr. S. Bose', attendance: 98, performance: 96 },
  { gradeNum: 12, name: 'Class 12', section: 'Sci', students: 38, teacher: 'Dr. M. Roy', attendance: 96, performance: 92 },
];

export default function ClassesPage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'grade' | 'performance_asc' | 'performance_desc'>('grade');

  // Sorting logic
  const sortedClasses = [...mockClasses].sort((a, b) => {
    if (sortBy === 'performance_asc') return a.performance - b.performance;
    if (sortBy === 'performance_desc') return b.performance - a.performance;
    return a.gradeNum - b.gradeNum; // default grade order
  });

  const handleCardClick = (gradeNum: number) => {
    navigate(`/classes/${gradeNum}`);
  };

  return (
    <div className="classes-overview-container">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <School className="text-primary" size={28} />
            Classes & Academic Units
          </h1>
          <p className="page-subtitle">
            Overview of standard school units, performance indices, and teacher assignments.
          </p>
        </div>
        
        {/* Sort Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Sort by:</label>
          <select 
            className="form-select" 
            style={{ width: '200px', fontSize: 14 }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="grade">Grade Level (1 to 12)</option>
            <option value="performance_asc">Performance (Low to High)</option>
            <option value="performance_desc">Performance (High to Low)</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {sortedClasses.map((cls) => {
          // Calculate thresholds and status
          const isCritical = cls.performance < 75;
          const isWarning = cls.performance >= 75 && cls.performance < 85;
          const isGood = cls.performance >= 85;

          let statusColor = 'var(--color-success)';
          let statusBg = 'var(--color-success-surface)';
          let accentHex = '#10B981'; // Green
          let StatusIcon = CheckCircle2;
          let statusText = 'On Track';

          if (isCritical) {
            statusColor = 'var(--color-danger)';
            statusBg = 'var(--color-danger-surface)';
            accentHex = '#F43F5E'; // Red
            StatusIcon = AlertCircle;
            statusText = 'Needs Attention';
          } else if (isWarning) {
            statusColor = 'var(--color-warning)';
            statusBg = 'var(--color-warning-surface)';
            accentHex = '#F59E0B'; // Amber
            StatusIcon = TrendingDown;
            statusText = 'Monitor';
          } else {
            StatusIcon = TrendingUp;
          }

          // Circle Progress Math
          const radius = 20;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (cls.performance / 100) * circumference;

          return (
            <div
              key={cls.name}
              className="card hover-scale"
              onClick={() => handleCardClick(cls.gradeNum)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: `4px solid ${accentHex}`,
                background: isCritical ? 'linear-gradient(to right, rgba(244, 63, 94, 0.02), transparent)' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Ensures equal height in grid
              }}
            >
              <div className="card-body" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Top Row: Title & Status Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cls.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '14px' }}>· Sec {cls.section}</span>
                    </h2>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: statusBg,
                    color: statusColor,
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    <StatusIcon size={14} strokeWidth={2.5} />
                    {statusText}
                  </div>
                </div>

                {/* Hero Metric: Performance */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                    {/* Background Circle */}
                    <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="24" cy="24" r={radius} stroke="var(--border-color)" strokeWidth="4" fill="none" />
                      {/* Progress Circle */}
                      <circle 
                        cx="24" cy="24" r={radius} 
                        stroke={accentHex} 
                        strokeWidth="4" 
                        fill="none" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                      />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '2px' }}>
                      Overall Performance
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {cls.performance}%
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1 }} /> {/* Spacer to push bottom content down if card heights vary */}

                {/* Secondary Metrics: Compact Chips */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexWrap: 'wrap',
                  gap: '12px', 
                  padding: '12px 16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} className="text-muted" /> {cls.students}
                  </div>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} className="text-muted" /> {cls.attendance}%
                  </div>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <School size={14} className="text-muted" /> {cls.teacher}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
