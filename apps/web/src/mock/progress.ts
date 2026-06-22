import { mockStudents } from './students';

export function getProgressByClass(classId: string) {
  return mockStudents
    .filter((student) => student.class_id === classId)
    .map((student, index) => ({
      student_id: student.id,
      student_code: student.student_code,
      name: student.full_name,
      homework_status: index % 4 === 0 ? 'PENDING' : 'COMPLETED',
      classwork_status: index % 5 === 0 ? 'NEEDS_REVIEW' : 'COMPLETED',
      behavior: ['Excellent', 'Focused', 'Curious', 'Needs reminders'][index % 4],
      teacher_note: index % 3 === 0 ? 'Showed strong confidence during group activity.' : 'Completed assigned work with care.',
    }));
}

export function getStudentProgressHistory(studentId: string) {
  const student = mockStudents.find((item) => item.id === studentId) || mockStudents[0];
  return [
    { id: 'progress-1', date: '2026-06-15', title: 'Reading fluency', note: `${student.first_name} read the passage independently.`, status: 'COMPLETED' },
    { id: 'progress-2', date: '2026-06-16', title: 'Math practice', note: 'Completed two-digit addition worksheet.', status: 'COMPLETED' },
    { id: 'progress-3', date: '2026-06-17', title: 'Class activity', note: 'Participated in peer discussion.', status: 'IN_PROGRESS' },
  ];
}
