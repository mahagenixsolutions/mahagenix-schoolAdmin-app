export const mockStats = {
  totalToday: 142,
  participationRate: 88,
  activeTeachers: 45,
  insights: [
    "✨ Attendance is up 4% this week across senior classes.",
    "🏆 12 new student achievements recorded today.",
    "📊 Science department has the highest engagement score this month."
  ]
};

export const mockTrends = [
  { day: 'Mon', activities: 120 },
  { day: 'Tue', activities: 132 },
  { day: 'Wed', activities: 101 },
  { day: 'Thu', activities: 145 },
  { day: 'Fri', activities: 190 },
  { day: 'Sat', activities: 45 },
  { day: 'Sun', activities: 30 },
];

export const mockContributors = [
  { id: 1, name: 'Anita Desai', role: 'Math Dept Head', score: 145, avatar: 'https://i.pravatar.cc/150?u=anita' },
  { id: 2, name: 'Rajesh Iyer', role: 'Sports Coach', score: 132, avatar: 'https://i.pravatar.cc/150?u=rajesh' },
  { id: 3, name: 'Priya Patel', role: 'Class 3 Teacher', score: 98, avatar: 'https://i.pravatar.cc/150?u=priya' },
];

export const mockUpcomingEvents = [
  { id: 1, title: 'Annual Science Fair', time: 'Tomorrow, 10:00 AM', type: 'Event' },
  { id: 2, title: 'Parent-Teacher Meet', time: 'Friday, 2:00 PM', type: 'Academic' },
  { id: 3, title: 'Term 1 Results Draft', time: 'Next Mon, 5:00 PM', type: 'Deadline' },
];

export const mockActivities = [
  {
    id: 1,
    type: 'Achievement',
    actor: { name: 'Vikram Singh', role: 'Class 8 Teacher', avatar: 'https://i.pravatar.cc/150?u=vikram' },
    timestamp: '10 mins ago',
    content: 'Awarded "Star Coder" badge to Aarav Patel for his exceptional project in the Web Dev elective.',
    tags: ['Class 8', 'Computer Science'],
    likes: 12,
    comments: 3
  },
  {
    id: 2,
    type: 'Announcement',
    actor: { name: 'Principal Office', role: 'Administration', avatar: 'https://i.pravatar.cc/150?u=admin' },
    timestamp: '1 hour ago',
    content: 'The school library will remain open until 6:00 PM starting next week to accommodate study groups during exam season.',
    tags: ['School-wide', 'Library'],
    likes: 45,
    comments: 8
  },
  {
    id: 3,
    type: 'Academic',
    actor: { name: 'Neha Gupta', role: 'Science Teacher', avatar: 'https://i.pravatar.cc/150?u=neha' },
    timestamp: '2 hours ago',
    content: 'Uploaded final term marks for Class 10 Chemistry. Class average is an impressive 82%!',
    tags: ['Class 10', 'Chemistry', 'Marks'],
    likes: 24,
    comments: 1
  },
  {
    id: 4,
    type: 'Events',
    actor: { name: 'Rajesh Iyer', role: 'Sports Coach', avatar: 'https://i.pravatar.cc/150?u=rajesh' },
    timestamp: '3 hours ago',
    content: 'Under-15 Basketball team won the inter-school semi-finals 42-38. Finals this Saturday!',
    tags: ['Sports', 'Basketball'],
    likes: 89,
    comments: 15
  },
  {
    id: 5,
    type: 'Attendance',
    actor: { name: 'System', role: 'Automated Log', avatar: 'https://i.pravatar.cc/150?u=system' },
    timestamp: '5 hours ago',
    content: 'Daily attendance finalized. School-wide attendance today stands at 94.2%.',
    tags: ['Attendance', 'Daily Log'],
    likes: 5,
    comments: 0
  }
];
