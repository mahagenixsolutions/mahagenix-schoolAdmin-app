import { mockClasses } from './classes';
import { mockStudents } from './students';
import { mockStaff } from './users';
import { mockSubjectAverages, getMockScore } from './marks';
import { mockAttendanceTrend } from './attendance';
import { mockSubjects } from './subjects';

const percentNumber = (value: string) => Number.parseInt(value, 10);

const classRows = mockClasses.map((cls, index) => {
  const roster = mockStudents.filter((student) => student.class_id === cls.id);
  const avgAttendance = percentNumber(cls.attendance);
  const avgMarks = Math.round(
    roster.reduce((sum, student) => sum + student.average_marks, 0) / Math.max(1, roster.length),
  );
  const feeCollectedPercent = 72 + ((index * 5) % 24);

  return {
    classId: cls.id,
    className: `${cls.name} ${cls.section}`,
    name: `${cls.name} ${cls.section}`,
    teacher: cls.teacher,
    students: roster.length,
    studentCount: roster.length,
    attendance: avgAttendance,
    avgAttendancePercent: avgAttendance,
    attendanceStatus: avgAttendance < 90 ? 'warning' : avgAttendance < 93 ? 'good' : 'excellent',
    avgMarks,
    avgMarksPercent: avgMarks,
    feeCollectedPercent,
    rank: index + 1,
  };
});

const sortedByAttendance = [...classRows].sort((a, b) => b.avgAttendancePercent - a.avgAttendancePercent);
const sortedByMarks = [...classRows].sort((a, b) => b.avgMarksPercent - a.avgMarksPercent);

export const mockAdminKpis = {
  totalStudents: mockStudents.length,
  total_students: mockStudents.length,
  totalTeachers: mockStaff.filter((staff) => staff.role === 'TEACHER').length,
  total_teachers: mockStaff.filter((staff) => staff.role === 'TEACHER').length,
  total_parents: mockStudents.length,
  active_classes: mockClasses.length,
  attendanceRateToday: Math.round(classRows.reduce((sum, item) => sum + item.avgAttendancePercent, 0) / classRows.length),
  attendance_rate: Math.round(classRows.reduce((sum, item) => sum + item.avgAttendancePercent, 0) / classRows.length),
  prevMonthAttendanceRate: 91,
  average_performance: Math.round(classRows.reduce((sum, item) => sum + item.avgMarksPercent, 0) / classRows.length),
  feeCollectionRate: 86,
  fee_collection_rate: 86,
  amountCollected: 1854000,
  amountDue: 2160000,
  newStudentsThisMonth: 6,
  teachersOnLeaveToday: 1,
  pendingFeesAmount: 306000,
  nextExam: { name: 'Quarterly Assessment', date: '2026-07-08' },
  syllabusCompletion: 78,
  openAdmissions: 18,
};

export const mockTeacherKpis = {
  total_students: 6,
  pending_evaluations: 4,
  today_marked_attendance: true,
  students_at_risk: mockStudents.slice(8, 11).map((student, index) => ({
    student: { id: student.id, full_name: student.full_name },
    risk_factors: index % 2 === 0 ? ['Attendance dip'] : ['Marks below target'],
    risk_level: index === 0 ? 'HIGH' : 'MEDIUM',
  })),
};

const heatmapDays = Array.from({ length: 35 }, (_, index) => ({
  date: `2026-06-${String((index % 30) + 1).padStart(2, '0')}`,
  dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7],
  status: index % 7 === 5 || index % 7 === 6 ? 'Holiday' : index % 11 === 0 ? 'Absent' : 'Present',
  value: 82 + ((index * 3) % 18),
}));

export const mockDetailedAnalytics = {
  totalStudents: mockStudents.length,
  baseAttendance: mockAdminKpis.attendanceRateToday,
  baseAcademic: mockAdminKpis.average_performance,
  teacherPerformance: 88,
  parentEngagement: 82,
  attendanceTrend: mockAttendanceTrend,
  attendanceTrendData: mockAttendanceTrend.map((item) => ({ month: item.month, 'Attendance Rate': item.attendance })),
  performanceTrend: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({
    month,
    'Average Marks': 72 + ((index * 3) % 18),
    Attendance: 88 + ((index * 2) % 10),
    Participation: 74 + ((index * 5) % 20),
  })),
  subjectComparison: mockSubjectAverages.map((subject) => ({
    name: subject.subject,
    subject: subject.subject,
    'Average Marks': subject.average,
    average: subject.average,
  })),
  subjectPerformance: mockSubjectAverages,
  classComparison: classRows.map((row) => ({
    name: row.className,
    'Average Marks': row.avgMarksPercent,
    Attendance: row.avgAttendancePercent,
  })),
  classPerformance: classRows.map((row) => ({
    class: row.className,
    students: row.studentCount,
    attendance: row.avgAttendancePercent,
    performance: row.avgMarksPercent,
  })),
  classPerformanceList: classRows,
  classExtremes: {
    best: sortedByAttendance.slice(0, 3).map((row) => ({ name: row.className, rate: row.avgAttendancePercent })),
    worst: sortedByAttendance.slice(-3).reverse().map((row) => ({ name: row.className, rate: row.avgAttendancePercent })),
  },
  heatmapDays,
  riskStudents: mockStudents
    .filter((student) => student.attendance_rate < 88 || student.average_marks < 74)
    .slice(0, 8)
    .map((student) => ({
      id: student.id,
      name: student.full_name,
      class: `${student.class.name} ${student.class.section}`,
      student_code: student.student_code,
      attendance: student.attendance_rate,
      academic: student.average_marks,
      averageMarks: student.average_marks,
      risk: student.attendance_rate < 86 || student.average_marks < 70 ? 'HIGH' : 'MEDIUM',
      reason: student.attendance_rate < 86 ? 'Attendance has dipped below class target.' : 'Academic score needs guided practice.',
    })),
  teachersList: mockStaff
    .filter((staff) => staff.role === 'TEACHER')
    .slice(0, 10)
    .map((staff, index) => ({
      id: staff.id,
      name: `${staff.first_name} ${staff.last_name}`,
      subject: 'subject' in staff ? staff.subject : staff.department,
      score: 82 + ((index * 3) % 16),
      attendance: 88 + ((index * 2) % 11),
      feedback: Number((3.8 + ((index % 6) * 0.2)).toFixed(1)),
      classes: index < 12 ? [`Class ${index + 1} A`] : ['Multiple Classes'],
    })),
  totalAchievements: 24,
  achievementsCategories: [
    { name: 'Academic', value: 9, color: '#4F46E5' },
    { name: 'Sports', value: 5, color: '#10B981' },
    { name: 'Cultural', value: 6, color: '#F59E0B' },
    { name: 'Leadership', value: 4, color: '#8B5CF6' },
  ],
  achievementTrend: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({ month, count: 10 + index * 2 })),
  growthScatterPoints: mockStudents.map((student) => ({
    id: student.id,
    name: student.full_name,
    class_name: `${student.class.name} ${student.class.section}`,
    attendance: student.attendance_rate,
    marks: student.average_marks,
    growth: getMockScore(student.id, mockSubjects[0].id) - 70,
    quadrant:
      student.attendance_rate >= 85 && student.average_marks >= 70 ? 'High Attendance / High Marks' :
      student.attendance_rate >= 85 ? 'High Attendance / Low Marks' :
      student.average_marks >= 70 ? 'Low Attendance / High Marks' :
      'Low Attendance / Low Marks',
  })),
  topImproving: mockStudents.slice(0, 6).map((student, index) => ({
    name: student.full_name,
    class: `${student.class.name} ${student.class.section}`,
    current: `${student.average_marks}%`,
    change: `+${8 + index}%`,
  })),
  requiringIntervention: mockStudents.slice(12, 18).map((student) => ({
    name: student.full_name,
    class: `${student.class.name} ${student.class.section}`,
    current: `${student.average_marks}%`,
    change: student.attendance_rate < 88 ? '-6% att' : '-4% avg',
    reason: student.attendance_rate < 88 ? 'Attendance support' : 'Marks support',
  })),
  aiRecommendations: [
    { id: 'rec-1', type: 'warning', title: 'Run attendance nudges', recommendation: 'Send parent reminders for classes below 90% attendance.', actionText: 'Send reminders', appliedText: 'Reminders queued' },
    { id: 'rec-2', type: 'primary', title: 'Schedule Math practice lab', recommendation: 'Classes 6-8 show room for targeted numeracy practice.', actionText: 'Create lab plan', appliedText: 'Plan created' },
    { id: 'rec-3', type: 'success', title: 'Recognize top classes', recommendation: `${sortedByMarks[0].className} leads academic performance this month.`, actionText: 'Draft note', appliedText: 'Note drafted' },
  ],
};
