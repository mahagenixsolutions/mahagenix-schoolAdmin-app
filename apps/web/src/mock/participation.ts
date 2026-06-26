import { mockStudents } from './students';

export const mockParticipationRecords = mockStudents.slice(0, 50).map((student, index) => ({
  id: `participation-${student.id}`,
  student_id: student.id,
  student: {
    id: student.id,
    first_name: student.first_name,
    last_name: student.last_name,
    student_code: student.student_code,
  },
  activity_type: ['Morning Assembly Presentation', 'Reading Circle Group', 'Science Model Demo', 'Annual Art Showcase'][index % 4],
  category: ['Academic', 'Cultural', 'Sports', 'Leadership'][index % 4],
  level: ['Class Room', 'Inter-Class', 'Inter-School', 'District'][index % 4],
  points: 10 + (index % 5) * 10,
  date: '2026-06-17',
  recorder_id: `teacher-${String((index % 5) + 1).padStart(3, '0')}`,
  recorder: {
    first_name: ['Karan', 'Soniya', 'Rajesh', 'Neelam', 'Amit'][index % 5],
    last_name: ['Sharma', 'Verma', 'Kumar', 'Gupta', 'Singh'][index % 5],
  },
  status: ['APPROVED', 'PENDING', 'APPROVED', 'APPROVED'][index % 4],
}));

export const mockAchievements = mockStudents.slice(0, 8).map((student, index) => ({
  id: `achievement-${student.id}`,
  student_id: student.id,
  student: {
    first_name: student.first_name,
    last_name: student.last_name,
  },
  title: ['Best Reader', 'Math Star', 'Kindness Award', 'Creative Thinker'][index % 4],
  description: 'Recognized for consistent effort and classroom contribution.',
  date: '2026-06-14',
}));

export const mockBadges = mockStudents.slice(0, 10).map((student, index) => ({
  id: `badge-${student.id}`,
  student_id: student.id,
  student: {
    first_name: student.first_name,
    last_name: student.last_name,
  },
  badge_name: ['Curious Learner', 'Team Player', 'On-Time Champ', 'Problem Solver'][index % 4],
  badge_icon: ['⭐', '👥', '⏰', '✨'][index % 4],
  points: 15 + (index % 3) * 5,
  awarded_date: '2026-06-12',
}));
