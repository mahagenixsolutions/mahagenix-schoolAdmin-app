import { mockStudents } from './students';

export const mockParticipationRecords = mockStudents.map((student, index) => ({
  id: `participation-${student.id}`,
  student_id: student.id,
  student_name: student.full_name,
  class_name: `${student.class.name} ${student.class.section}`,
  activity: ['Morning Assembly', 'Reading Circle', 'Science Demo', 'Art Showcase'][index % 4],
  category: ['Academic', 'Cultural', 'Sports', 'Leadership'][index % 4],
  points: 8 + (index % 5),
  date: '2026-06-17',
}));

export const mockAchievements = mockStudents.slice(0, 8).map((student, index) => ({
  id: `achievement-${student.id}`,
  student_id: student.id,
  student_name: student.full_name,
  title: ['Best Reader', 'Math Star', 'Kindness Award', 'Creative Thinker'][index % 4],
  description: 'Recognized for consistent effort and classroom contribution.',
  date: '2026-06-14',
}));

export const mockBadges = mockStudents.slice(0, 10).map((student, index) => ({
  id: `badge-${student.id}`,
  student_id: student.id,
  student_name: student.full_name,
  badge_name: ['Curious Learner', 'Team Player', 'On-Time Champ', 'Problem Solver'][index % 4],
  badge_icon: ['star', 'users', 'clock', 'sparkles'][index % 4],
  awarded_date: '2026-06-12',
}));
