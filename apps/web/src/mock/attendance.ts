import { mockStudents } from './students';

const statuses = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'ABSENT', 'LATE', 'LEAVE'];

export function getClassAttendance(classId: string) {
  return mockStudents
    .filter((student) => student.class_id === classId)
    .map((student, index) => ({
      student_id: student.id,
      student_code: student.student_code,
      name: student.full_name,
      status: statuses[index % statuses.length],
      attendance: {
        status: statuses[index % statuses.length],
        remarks: index % 5 === 0 ? 'Parent informed' : '',
      },
    }));
}

export const mockAttendanceTrend = [
  { month: 'Jan', attendance: 91, Present: 91 },
  { month: 'Feb', attendance: 93, Present: 93 },
  { month: 'Mar', attendance: 92, Present: 92 },
  { month: 'Apr', attendance: 94, Present: 94 },
  { month: 'May', attendance: 90, Present: 90 },
  { month: 'Jun', attendance: 95, Present: 95 },
];
