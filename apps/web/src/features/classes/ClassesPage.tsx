import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, List, AlertTriangle, CheckCircle2, TrendingDown, Users, Calendar, School } from 'lucide-react';

export interface ClassUnit {
  id: string;
  grade: number;
  section: string;
  teacherName: string;
  studentCount: number;
  attendancePercent: number;
  avgMarks: number;
  syllabusCompletion: number;
  feePaidPercent: number;
  overallScore: number;
  status: 'on-track' | 'monitor' | 'needs-attention';
  lastUpdated: string;
}

function computeClassStatus(score: number): ClassUnit['status'] {
  if (score >= 90) return 'on-track';
  if (score >= 75) return 'monitor';
  return 'needs-attention';
}

const rawMockClasses = [
  { id: 'class-1', grade: 1, section: 'A', teacherName: 'Anita Desai', studentCount: 24, attendancePercent: 95, avgMarks: 88, syllabusCompletion: 92, feePaidPercent: 85 },
  { id: 'class-2', grade: 2, section: 'B', teacherName: 'Vikram Singh', studentCount: 22, attendancePercent: 92, avgMarks: 81, syllabusCompletion: 88, feePaidPercent: 76 },
  { id: 'class-3', grade: 3, section: 'C', teacherName: 'Priya Patel', studentCount: 26, attendancePercent: 96, avgMarks: 91, syllabusCompletion: 95, feePaidPercent: 92 },
  { id: 'class-4', grade: 4, section: 'A', teacherName: 'Rahul Sharma', studentCount: 25, attendancePercent: 88, avgMarks: 72, syllabusCompletion: 65, feePaidPercent: 58 },
  { id: 'class-5', grade: 5, section: 'B', teacherName: 'Neha Gupta', studentCount: 28, attendancePercent: 94, avgMarks: 85, syllabusCompletion: 82, feePaidPercent: 79 },
  { id: 'class-6', grade: 6, section: 'C', teacherName: 'Sanjay Kumar', studentCount: 30, attendancePercent: 91, avgMarks: 78, syllabusCompletion: 80, feePaidPercent: 72 },
  { id: 'class-7', grade: 7, section: 'A', teacherName: 'Meera Reddy', studentCount: 29, attendancePercent: 97, avgMarks: 94, syllabusCompletion: 98, feePaidPercent: 95 },
  { id: 'class-8', grade: 8, section: 'B', teacherName: 'Amit Joshi', studentCount: 31, attendancePercent: 85, avgMarks: 68, syllabusCompletion: 70, feePaidPercent: 62 },
  { id: 'class-9', grade: 9, section: 'C', teacherName: 'Kavita Menon', studentCount: 35, attendancePercent: 93, avgMarks: 82, syllabusCompletion: 86, feePaidPercent: 80 },
  { id: 'class-10', grade: 10, section: 'A', teacherName: 'Rajesh Iyer', studentCount: 34, attendancePercent: 95, avgMarks: 89, syllabusCompletion: 90, feePaidPercent: 88 },
  { id: 'class-11', grade: 11, section: 'B', teacherName: 'Dr. S. Bose', studentCount: 40, attendancePercent: 98, avgMarks: 96, syllabusCompletion: 95, feePaidPercent: 94 },
  { id: 'class-12', grade: 12, section: 'C', teacherName: 'Dr. M. Roy', studentCount: 38, attendancePercent: 96, avgMarks: 92, syllabusCompletion: 91, feePaidPercent: 90 },
];

const mockClasses: ClassUnit[] = rawMockClasses.map(raw => {
  const overallScore = Math.round(raw.attendancePercent * 0.4 + raw.avgMarks * 0.4 + raw.syllabusCompletion * 0.2);
  return {
    ...raw,
    overallScore,
    status: computeClassStatus(overallScore),
    lastUpdated: new Date().toISOString(),
  };
});

export default function ClassesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-track' | 'monitor' | 'needs-attention'>('all');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [sortBy, setSortBy] = useState<'grade' | 'performance_asc' | 'performance_desc'>('grade');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredClasses = useMemo(() => {
    return mockClasses
      .filter(cls => {
        const matchesSearch = cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) || `class ${cls.grade}`.includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
        const matchesSection = sectionFilter === 'all' || cls.section === sectionFilter;
        return matchesSearch && matchesStatus && matchesSection;
      })
      .sort((a, b) => {
        if (sortBy === 'performance_asc') return a.overallScore - b.overallScore;
        if (sortBy === 'performance_desc') return b.overallScore - a.overallScore;
        return a.grade - b.grade;
      });
  }, [searchQuery, statusFilter, sectionFilter, sortBy]);

  const totalClasses = mockClasses.length;
  const needsAttentionCount = mockClasses.filter(c => c.status === 'needs-attention').length;
  const onTrackCount = mockClasses.filter(c => c.status === 'on-track').length;

  const avgAttendance = Math.round(mockClasses.reduce((sum, c) => sum + c.attendancePercent, 0) / totalClasses);
  const avgMarks = Math.round(mockClasses.reduce((sum, c) => sum + c.avgMarks, 0) / totalClasses);
  const avgSyllabus = Math.round(mockClasses.reduce((sum, c) => sum + c.syllabusCompletion, 0) / totalClasses);
  const avgFee = Math.round(mockClasses.reduce((sum, c) => sum + c.feePaidPercent, 0) / totalClasses);

  const handleCardClick = (gradeNum: number) => {
    navigate(`/classes/${gradeNum}`);
  };

  return (
    <div className="classes-overview-container" style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        .tooltip-container { position: relative; display: inline-flex; align-items: center; cursor: help; }
        .tooltip-text {
          visibility: hidden; position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%);
          background: #1e293b; color: #f8fafc; text-align: center; padding: 6px 12px; border-radius: 8px;
          font-size: 11px; white-space: nowrap; opacity: 0; transition: opacity 0.2s; z-index: 50;
          border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.3); pointer-events: none;
        }
        .tooltip-container:hover .tooltip-text { visibility: visible; opacity: 1; }

        .class-card-container {
          position: relative; cursor: pointer; border-radius: 16px; background: var(--bg-surface);
          display: flex; flex-direction: column; height: 100%; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.04);
        }
        .class-card-container:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }

        .card-on-track { border-left: 4px solid #10B981 !important; }
        .card-on-track:hover { border-left-color: #14e7a2 !important; }
        .card-monitor { border-left: 4px solid #F59E0B !important; }
        .card-monitor:hover { border-left-color: #ffb633 !important; }
        .card-needs-attention { border-left: 4px solid #EF4444 !important; box-shadow: -4px 0 12px rgba(239, 68, 68, 0.15), 0 4px 6px -1px rgba(0,0,0,0.1) !important; }
        .card-needs-attention:hover { border-left-color: #ff6b6b !important; box-shadow: -4px 0 16px rgba(239, 68, 68, 0.25), 0 8px 32px rgba(0,0,0,0.4) !important; }

        .view-details-reveal {
          position: absolute; bottom: 14px; right: 16px; font-size: 12px; font-weight: 600; color: #4F8EF7;
          opacity: 0; transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out; pointer-events: none; transform: translateX(-4px);
        }
        .class-card-container:hover .view-details-reveal { opacity: 1; transform: translateX(0); }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .list-table-row { transition: background 0.2s; }
        .list-table-row:nth-child(even) { background: rgba(255, 255, 255, 0.01); }
        .list-table-row:hover { background: rgba(255, 255, 255, 0.04) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'rgba(79,142,247,0.12)', color: '#4F8EF7', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            {totalClasses} Classes
          </div>
          <div style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            {needsAttentionCount} Need Attention
          </div>
          <div style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            {onTrackCount} On Track
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <i className="ti ti-search" style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', fontSize: '14px' }} />
            <input
              type="text"
              placeholder="Search class or teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: '#1a2235', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                height: '38px', paddingLeft: '36px', paddingRight: '12px', color: 'var(--text-primary)',
                fontSize: '14px', outline: 'none', width: '220px'
              }}
            />
          </div>

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{ width: '150px', height: '38px', fontSize: 14 }}
          >
            <option value="all">All Statuses</option>
            <option value="on-track">On Track</option>
            <option value="monitor">Monitor</option>
            <option value="needs-attention">Needs Attention</option>
          </select>

          <select
            className="form-select"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value as any)}
            style={{ width: '130px', height: '38px', fontSize: 14 }}
          >
            <option value="all">All Sections</option>
            <option value="A">Sec A</option>
            <option value="B">Sec B</option>
            <option value="C">Sec C</option>
          </select>

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ width: '180px', height: '38px', fontSize: 14 }}
          >
            <option value="grade">Grade Level (1 to 12)</option>
            <option value="performance_asc">Performance (Low to High)</option>
            <option value="performance_desc">Performance (High to Low)</option>
          </select>

          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)', height: '38px', alignItems: 'center' }}>
            <button onClick={() => setViewMode('grid')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '6px', border: viewMode === 'grid' ? '1px solid #4F8EF7' : '1px solid transparent', background: viewMode === 'grid' ? '#4F8EF718' : 'transparent', color: viewMode === 'grid' ? '#4F8EF7' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <Grid size={16} />
            </button>
            <button onClick={() => setViewMode('list')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '6px', border: viewMode === 'list' ? '1px solid #4F8EF7' : '1px solid transparent', background: viewMode === 'list' ? '#4F8EF718' : 'transparent', color: viewMode === 'list' ? '#4F8EF7' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px', marginBottom: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          On Track = ≥90% performance
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
          Monitor = 75–89%
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
          Needs Attention = &lt;75%
        </span>
      </div>

      {/* Summary Strip */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
        padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '32px', backdropFilter: 'blur(12px)', flexWrap: 'wrap', gap: '20px'
      }}>
        <div style={{ flex: 1, textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginBottom: '4px' }}>{avgAttendance}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg School Attendance</div>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.06)' }} className="hidden md:block" />
        <div style={{ flex: 1, textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4F8EF7', marginBottom: '4px' }}>{avgMarks}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Marks (All Classes)</div>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.06)' }} className="hidden md:block" />
        <div style={{ flex: 1, textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6', marginBottom: '4px' }}>{avgSyllabus}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Syllabus Completion</div>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.06)' }} className="hidden md:block" />
        <div style={{ flex: 1, textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginBottom: '4px' }}>{avgFee}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Fee Collection</div>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.06)' }} className="hidden md:block" />
        <div style={{ flex: 1, textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', marginBottom: '4px' }}>{needsAttentionCount}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Classes Needing Action</div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredClasses.map((cls, index) => {
            let statusColor = '#10B981';
            let statusBg = 'rgba(16, 185, 129, 0.12)';
            let StatusIcon = CheckCircle2;
            let statusText = 'On Track';
            let cardClass = 'card-on-track';

            if (cls.status === 'needs-attention') {
              statusColor = '#EF4444';
              statusBg = 'rgba(239, 68, 68, 0.12)';
              StatusIcon = AlertTriangle;
              statusText = 'Needs Attention';
              cardClass = 'card-needs-attention';
            } else if (cls.status === 'monitor') {
              statusColor = '#F59E0B';
              statusBg = 'rgba(245, 158, 11, 0.12)';
              StatusIcon = TrendingDown;
              statusText = 'Monitor';
              cardClass = 'card-monitor';
            }

            const radius = 24;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (cls.overallScore / 100) * circumference;

            return (
              <div
                key={cls.id}
                className={`class-card-container fade-slide-up ${cardClass}`}
                onClick={() => handleCardClick(cls.grade)}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Top Row: Title & Status Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Class {cls.grade} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '14px' }}>· Sec {cls.section}</span>
                      </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', background: statusBg, color: statusColor, fontSize: '12px', fontWeight: 600 }}>
                        <StatusIcon size={14} strokeWidth={2.5} />
                        {statusText}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last updated: today</div>
                    </div>
                  </div>

                  {/* Body: 2 Columns */}
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                    
                    {/* Left Column: Overall Score SVG Ring */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '12px' }}>
                        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="32" cy="32" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="5" fill="none" />
                          <circle cx="32" cy="32" r={radius} stroke={statusColor} strokeWidth="5" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {cls.overallScore}%
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        Overall Score
                        <div className="tooltip-container">
                          <i className="ti ti-info-circle" style={{ fontSize: '14px' }} />
                          <span className="tooltip-text">Attendance 40% · Marks 40% · Syllabus 20%</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)', alignSelf: 'stretch' }} />

                    {/* Right Column: Mini Metrics */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                      {/* Syllabus */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <i className="ti ti-book-open" style={{ fontSize: '14px' }} />
                            Syllabus
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.syllabusCompletion}%</span>
                        </div>
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${cls.syllabusCompletion}%`, height: '100%', background: '#4F8EF7', borderRadius: '9999px' }} />
                        </div>
                      </div>
                      {/* Avg Marks */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <i className="ti ti-clipboard" style={{ fontSize: '14px' }} />
                            Avg Marks
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.avgMarks}%</span>
                        </div>
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${cls.avgMarks}%`, height: '100%', background: '#8B5CF6', borderRadius: '9999px' }} />
                        </div>
                      </div>
                      {/* Fee Paid */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            <i className="ti ti-cash" style={{ fontSize: '14px' }} />
                            Fee Paid
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{cls.feePaidPercent}%</span>
                        </div>
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ width: `${cls.feePaidPercent}%`, height: '100%', background: cls.feePaidPercent >= 80 ? '#10B981' : cls.feePaidPercent >= 60 ? '#F59E0B' : '#EF4444', borderRadius: '9999px' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ flex: 1 }} />

                  {/* Footer Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', padding: '16px 20px', background: 'rgba(0,0,0,0.2)', margin: '0 -24px -24px -24px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} /> {cls.studentCount}
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> {cls.attendancePercent}%
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <School size={14} /> {cls.teacherName}
                    </div>
                    
                    <div className="view-details-reveal">View Details &rarr;</div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card table-responsive fade-slide-up" style={{ borderRadius: '20px', overflow: 'hidden', padding: 0 }}>
          <table className="table" style={{ background: 'transparent', width: '100%', borderCollapse: 'collapse', margin: 0 }}>
            <thead>
              <tr>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Class</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Section</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Teacher</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Students</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Attendance</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Avg Marks</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Syllabus</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Fee Paid</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Overall Score</th>
                <th style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ textAlign: 'right', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls, index) => {
                let accentHex = '#10B981';
                let statusText = 'On Track';
                let statusBg = 'rgba(16, 185, 129, 0.12)';
                let statusColor = '#10B981';

                if (cls.status === 'needs-attention') {
                  accentHex = '#EF4444';
                  statusText = 'Needs Attention';
                  statusBg = 'rgba(239, 68, 68, 0.12)';
                  statusColor = '#EF4444';
                } else if (cls.status === 'monitor') {
                  accentHex = '#F59E0B';
                  statusText = 'Monitor';
                  statusBg = 'rgba(245, 158, 11, 0.12)';
                  statusColor = '#F59E0B';
                }

                const radius = 12;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (cls.overallScore / 100) * circumference;

                return (
                  <tr
                    key={cls.id}
                    onClick={() => handleCardClick(cls.grade)}
                    className="list-table-row"
                    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)', animationDelay: `${index * 30}ms` }}
                  >
                    <td style={{ borderLeft: `4px solid ${accentHex}`, fontWeight: 600, color: 'var(--text-primary)', borderBottom: 'none' }}>
                      Class {cls.grade}
                    </td>
                    <td style={{ borderBottom: 'none' }}>Sec {cls.section}</td>
                    <td style={{ borderBottom: 'none' }}>{cls.teacherName}</td>
                    <td style={{ borderBottom: 'none' }}>{cls.studentCount}</td>
                    <td style={{ borderBottom: 'none' }}>{cls.attendancePercent}%</td>
                    <td style={{ borderBottom: 'none' }}>{cls.avgMarks}%</td>
                    <td style={{ borderBottom: 'none' }}>{cls.syllabusCompletion}%</td>
                    <td style={{ borderBottom: 'none' }}>{cls.feePaidPercent}%</td>
                    <td style={{ borderBottom: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="28" height="28" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="16" cy="16" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
                          <circle cx="16" cy="16" r={radius} stroke={accentHex} strokeWidth="3" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: '13px' }}>{cls.overallScore}%</span>
                      </div>
                    </td>
                    <td style={{ borderBottom: 'none' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '20px', background: statusBg, color: statusColor, fontSize: '11px', fontWeight: 600 }}>
                        {statusText}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', borderBottom: 'none' }}>
                      <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); handleCardClick(cls.grade); }} style={{ color: '#4F8EF7', fontWeight: 600, background: 'rgba(79, 142, 247, 0.1)', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}>
                        View &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
