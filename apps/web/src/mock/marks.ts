import { mockStudents } from './students';
import { mockSubjects } from './subjects';

export const mockExams = [
  { id: 'exam-unit-1', name: 'Unit Test 1', status: 'Draft', max_score: 100 },
  { id: 'exam-quarterly', name: 'Quarterly Assessment', status: 'Published', max_score: 100 },
  { id: 'exam-midterm', name: 'Mid Term', status: 'Draft', max_score: 100 },
];

export function getMockScore(studentId: string, subjectId: string, examId = 'exam-unit-1') {
  const seed = `${studentId}-${subjectId}-${examId}`;
  let total = 0;
  for (let i = 0; i < seed.length; i += 1) total += seed.charCodeAt(i) * (i + 1);
  return 58 + (total % 39);
}

export function getMarksRoster(classId: string, examId: string, subjectId: string) {
  return mockStudents
    .filter((student) => student.class_id === classId)
    .map((student) => {
      const score = getMockScore(student.id, subjectId, examId);
      return {
        student_id: student.id,
        student_code: student.student_code,
        name: student.full_name,
        score,
        max_score: 100,
        remarks: score >= 85 ? 'Excellent class participation.' : score < 65 ? 'Needs guided practice.' : 'Steady progress.',
        mark: { status: 'DRAFT' },
      };
    });
}

export const mockSubjectAverages = mockSubjects.map((subject) => ({
  subject: subject.name,
  subject_id: subject.id,
  average: Math.round(
    mockStudents.reduce((sum, student) => sum + getMockScore(student.id, subject.id), 0) / mockStudents.length,
  ),
}));
