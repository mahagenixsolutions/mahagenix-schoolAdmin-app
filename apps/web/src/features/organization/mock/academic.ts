export interface AcademicMetric {
  syllabusProgress: number;
  homeworkSubmission: number;
  passRate: number;
  lessonPlanProgress: number;
  avgExamScore: number;
  topPerformingClass: string;
  lowestPerformingClass: string;
  upcomingExamsCount: number;
}

export const mockAcademic: AcademicMetric = {
  syllabusProgress: 92.6,
  homeworkSubmission: 88.5,
  passRate: 94.6,
  lessonPlanProgress: 93.0,
  avgExamScore: 87.2,
  topPerformingClass: 'Grade 10A (96.8%)',
  lowestPerformingClass: 'Grade 8C (72.4%)',
  upcomingExamsCount: 15
};

export const mockClassPerformance = [
  { className: 'Grade 10A', score: 96.8, attendance: 98.2, homework: 95.0, status: 'Outstanding' },
  { className: 'Grade 9B', score: 91.2, attendance: 95.6, homework: 90.2, status: 'On Target' },
  { className: 'Grade 12C', score: 88.4, attendance: 93.8, homework: 86.4, status: 'On Target' },
  { className: 'Grade 8C', score: 72.4, attendance: 84.2, homework: 68.0, status: 'Action Needed' }
];

export const mockSubjectAverages = [
  { subject: 'Mathematics', average: 82.5, passRate: 91.0 },
  { subject: 'Science', average: 86.4, passRate: 95.2 },
  { subject: 'English', average: 90.8, passRate: 98.0 },
  { subject: 'Social Studies', average: 88.2, passRate: 96.4 }
];
