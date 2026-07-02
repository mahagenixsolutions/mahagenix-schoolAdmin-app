import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { DetailDrawer } from '../../components/erp/DetailDrawer';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { 
  BookOpen, Calendar, GraduationCap, Clock, Award, Plus, FolderOpen, ListTodo
} from 'lucide-react';

interface SubjectDetail {
  name: string;
  code: string;
  teacher: string;
}

interface AcademicClass {
  id: string;
  name: string;
  sections: string[];
  classTeacher: string;
  studentCount: number;
  subjects: SubjectDetail[];
}

interface CurriculumChapter {
  name: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
  plannedDate: string;
}

interface LessonPlan {
  subjectName: string;
  className: string;
  chapters: CurriculumChapter[];
}

interface CalendarEvent {
  date: string;
  title: string;
  type: 'success' | 'warning' | 'info';
  typeLabel: string;
  description: string;
}

interface TimetableItem {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

const mockClasses: AcademicClass[] = [
  {
    id: 'cls-1',
    name: 'Class 10',
    sections: ['A', 'B'],
    classTeacher: 'Sarah Jenkins',
    studentCount: 73,
    subjects: [
      { name: 'Mathematics', code: 'MAT-10', teacher: 'Sarah Jenkins' },
      { name: 'Physics', code: 'PHY-10', teacher: 'Dr. Aris Vance' },
      { name: 'English', code: 'ENG-10', teacher: 'Elena Rostova' }
    ]
  },
  {
    id: 'cls-2',
    name: 'Class 9',
    sections: ['A'],
    classTeacher: 'Elena Rostova',
    studentCount: 42,
    subjects: [
      { name: 'Chemistry', code: 'CHM-09', teacher: 'Dr. Aris Vance' },
      { name: 'History', code: 'HIS-09', teacher: 'Rohan Sharma' }
    ]
  }
];

const mockLessonPlans: LessonPlan[] = [
  {
    subjectName: 'Physics',
    className: 'Class 10 A',
    chapters: [
      { name: 'Light Reflection & Refraction', status: 'success', statusLabel: 'Completed', plannedDate: '2026-06-12' },
      { name: 'Electricity & Circuits', status: 'warning', statusLabel: 'In Progress', plannedDate: '2026-07-10' },
      { name: 'Magnetic Effects of Current', status: 'danger', statusLabel: 'Not Started', plannedDate: '2026-08-01' }
    ]
  },
  {
    subjectName: 'Mathematics',
    className: 'Class 10 A',
    chapters: [
      { name: 'Real Numbers', status: 'success', statusLabel: 'Completed', plannedDate: '2026-06-10' },
      { name: 'Polynomials', status: 'success', statusLabel: 'Completed', plannedDate: '2026-06-25' },
      { name: 'Quadratic Equations', status: 'warning', statusLabel: 'In Progress', plannedDate: '2026-07-15' }
    ]
  }
];

const mockCalendarEvents: CalendarEvent[] = [
  { date: '2026-07-10', title: 'Unit Test I Exam Block', type: 'warning', typeLabel: 'EXAM', description: 'Terminal unit examination for grade 9 and 10.' },
  { date: '2026-08-15', title: 'Independence Day Holiday', type: 'danger', typeLabel: 'HOLIDAY', description: 'National holiday celebration.' },
  { date: '2026-07-25', title: 'Parent-Teacher Meet (PTM)', type: 'info', typeLabel: 'EVENT', description: 'Academic performance audit PTM.' }
];

const mockTimetable: TimetableItem[] = [
  { time: '08:30 AM', mon: 'Physics (Class 10 A)', tue: 'Algebra (Class 11 A)', wed: 'Physics (Class 10 A)', thu: 'Algebra (Class 11 A)', fri: 'Lab' },
  { time: '09:30 AM', mon: 'Calculus (Class 12 A)', tue: 'Physics (Class 10 B)', wed: 'Calculus (Class 12 A)', thu: 'Literature (Class 10 B)', fri: 'Library' },
  { time: '10:30 AM', mon: 'Chemistry (Class 9 A)', tue: 'Civics (Class 10 A)', wed: 'Grammar (Class 9 A)', thu: 'History (Class 10 A)', fri: 'Games' }
];

const AcademicPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'curriculum' | 'timetable' | 'calendar'>('classes');
  const [selectedClass, setSelectedClass] = useState<AcademicClass | null>(null);

  const classColumns: GridColumn<AcademicClass>[] = [
    {
      key: 'name',
      header: 'Class Grade',
      sortable: true
    },
    {
      key: 'sections',
      header: 'Sections',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          {row.sections.map((sec, idx) => (
            <span key={idx} style={{ background: 'var(--accent-primary-surface)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
              Section {sec}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'classTeacher',
      header: 'Class Representative',
      sortable: true
    },
    {
      key: 'studentCount',
      header: 'Headcount',
      sortable: true,
      render: (row) => <strong>{row.studentCount} Students</strong>
    }
  ];

  return (
    <PageLayout>
      {/* Page Header */}
      <PageHeader
        title="Academic Portal"
        subtitle="Manage classrooms, section distributions, timetable schedules, curriculum progress, and calendar events"
        breadcrumbs={[{ label: 'Academic' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Plus size={15} /> Configure Term
          </button>
        }
      />

      {/* KPI summaries */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginTop: '24px',
        marginBottom: '24px'
      }}>
        <KPICard title="Total Classes" value={mockClasses.length} icon={<GraduationCap size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Active Sections" value={3} icon={<FolderOpen size={20} />} accentColor="var(--accent-violet)" />
        <KPICard title="Total Subjects" value={6} icon={<BookOpen size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Syllabus Target" value="84% Met" icon={<Award size={20} />} accentColor="var(--accent-warning)" />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '24px', overflowX: 'auto' }}>
        {[
          { id: 'classes', label: 'Classes & Sections', icon: <GraduationCap size={15} /> },
          { id: 'curriculum', label: 'Curriculum & Lesson Plans', icon: <ListTodo size={15} /> },
          { id: 'timetable', label: 'Academic Timetable', icon: <Clock size={15} /> },
          { id: 'calendar', label: 'Academic Calendar', icon: <Calendar size={15} /> },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 4px',
                border: 'none',
                background: 'transparent',
                borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: active ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '24px' }}>
        {/* Tab 1: Classes & Sections */}
        {activeTab === 'classes' && (
          <DataGrid
            columns={classColumns}
            data={mockClasses}
            keyField="id"
            actions={(row) => (
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedClass(row)}
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                View Subjects
              </button>
            )}
          />
        )}

        {/* Tab 2: Curriculum & Lesson Plans */}
        {activeTab === 'curriculum' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {mockLessonPlans.map((lp, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{lp.subjectName} · {lp.className}</span>
                  <span style={{ fontSize: '11px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', padding: '4px 10px', borderRadius: '20px', color: 'var(--text-secondary)' }}>Curriculum progress</span>
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {lp.chapters.map((chap, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{chap.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Completion Target: {chap.plannedDate}</div>
                      </div>
                      <StatusBadge status={chap.status} label={chap.statusLabel} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Timetable Layout */}
        {activeTab === 'timetable' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Weekly Lecture Grid Layout</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Time Slot</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Mon</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Tue</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Wed</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Thu</th>
                  <th style={{ padding: '12px', fontWeight: 600 }}>Fri</th>
                </tr>
              </thead>
              <tbody>
                {mockTimetable.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{row.time}</td>
                    <td style={{ padding: '12px' }}>{row.mon}</td>
                    <td style={{ padding: '12px' }}>{row.tue}</td>
                    <td style={{ padding: '12px' }}>{row.wed}</td>
                    <td style={{ padding: '12px' }}>{row.thu}</td>
                    <td style={{ padding: '12px' }}>{row.fri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Academic Calendar */}
        {activeTab === 'calendar' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Upcoming Term Milestones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockCalendarEvents.map((evt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', minWidth: '70px', padding: '6px 0' }}>
                    <strong style={{ fontSize: '16px', color: 'var(--accent-primary)' }}>{evt.date.split('-')[2]}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{evt.date.split('-')[1] === '07' ? 'JUL' : 'AUG'}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{evt.title}</strong>
                      <StatusBadge status={evt.type} label={evt.typeLabel} />
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Class Subjects Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        title={selectedClass ? `${selectedClass.name} - Course Allocations` : ''}
      >
        {selectedClass && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Class Teacher</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>{selectedClass.classTeacher}</div>
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Assigned Subject Curriculum</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedClass.subjects.map((sub, idx) => (
                <div key={idx} style={{ padding: '12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{sub.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>{sub.code}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>Instructor: <strong>{sub.teacher}</strong></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DetailDrawer>

    </PageLayout>
  );
};

export default AcademicPage;
