export const mockUsers = {
  admin: {
    id: 'user-admin-001',
    email: 'admin@edutrack.demo',
    first_name: 'Aarav',
    last_name: 'Mehta',
    role: 'SCHOOL_ADMIN',
    school_id: 'school-demo-001',
    avatar_url: '',
  },
  teacher: {
    id: 'teacher-001',
    email: 'nisha.rao@edutrack.demo',
    first_name: 'Nisha',
    last_name: 'Rao',
    role: 'TEACHER',
    school_id: 'school-demo-001',
    avatar_url: '',
  },
  parent: {
    id: 'parent-001',
    email: 'parent@edutrack.demo',
    first_name: 'Priya',
    last_name: 'Sharma',
    role: 'PARENT',
    school_id: 'school-demo-001',
    avatar_url: '',
  },
  student: {
    id: 'student-001',
    email: 'student@edutrack.demo',
    first_name: 'Aanya',
    last_name: 'Sharma',
    role: 'STUDENT',
    school_id: 'school-demo-001',
    avatar_url: '',
  },
};

export const classTeachers = [
  ['teacher-001', 'Nisha', 'Rao', 'Primary'],
  ['teacher-002', 'Farhan', 'Ali', 'Primary'],
  ['teacher-003', 'Meera', 'Iyer', 'Primary'],
  ['teacher-004', 'Kabir', 'Sen', 'Primary'],
  ['teacher-005', 'Anita', 'Desai', 'Middle School'],
  ['teacher-006', 'Rahul', 'Kapoor', 'Middle School'],
  ['teacher-007', 'Priyanka', 'Menon', 'Middle School'],
  ['teacher-008', 'Siddharth', 'Nair', 'Middle School'],
  ['teacher-009', 'Kavita', 'Joshi', 'High School'],
  ['teacher-010', 'Armaan', 'Khan', 'High School'],
] as const;

export const subjectTeachers = [
  ['teacher-013', 'Ritu', 'Sharma', 'Mathematics', 'M.Sc Mathematics'],
  ['teacher-014', 'Joel', 'Fernandes', 'English', 'M.A English'],
  ['teacher-015', 'Sana', 'Qureshi', 'Science', 'M.Sc Physics'],
  ['teacher-016', 'Mohan', 'Krishnan', 'Social Studies', 'M.A History'],
  ['teacher-017', 'Ira', 'Chopra', 'Computer Science', 'B.Tech CSE'],
  ['teacher-018', 'Devika', 'Raman', 'Hindi', 'M.A Hindi'],
  ['teacher-019', 'Raghav', 'Sethi', 'Art & Craft', 'BFA'],
  ['teacher-020', 'Neeraj', 'Bhatia', 'Physical Education', 'B.P.Ed'],
] as const;

const teacherAvatar = (id: string) => `https://api.dicebear.com/8.x/initials/svg?seed=${id}`;

const classTeacherStaff = classTeachers.map(([id, first_name, last_name, department], index) => ({
  id,
  email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@edutrack.demo`,
  first_name,
  last_name,
  role: 'TEACHER',
  school_id: 'school-demo-001',
  avatar_url: teacherAvatar(id),
  photoUrl: teacherAvatar(id),
  phone: `+91 98765 41${String(index + 2).padStart(3, '0')}`,
  status: 'ACTIVE',
  designation: `Class Teacher - Class ${index + 1}`,
  department,
  subject: index < 4 ? 'Foundational Learning' : index < 8 ? 'Integrated Studies' : 'Academic Mentor',
  qualification: index < 4 ? 'B.Ed, Child Development' : index < 8 ? 'M.Ed' : 'M.Sc, B.Ed',
  experienceYears: 4 + (index % 8),
  syllabusCompleted: 68 + ((index * 5) % 27),
}));

const subjectTeacherStaff = subjectTeachers.map(([id, first_name, last_name, subject, qualification], index) => ({
  id,
  email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@edutrack.demo`,
  first_name,
  last_name,
  role: 'TEACHER',
  school_id: 'school-demo-001',
  avatar_url: teacherAvatar(id),
  photoUrl: teacherAvatar(id),
  phone: `+91 98765 42${String(index + 1).padStart(3, '0')}`,
  status: 'ACTIVE',
  designation: `${subject} Faculty`,
  department: index < 2 ? 'Languages & Math' : index < 6 ? 'Academics' : 'Co-curricular',
  subject,
  qualification,
  experienceYears: 5 + (index % 10),
  syllabusCompleted: 72 + ((index * 4) % 24),
}));

export const mockStaff = [
  {
    ...mockUsers.admin,
    phone: '+91 98765 41001',
    status: 'ACTIVE',
    designation: 'School Administrator',
    department: 'Administration',
  },
  ...classTeacherStaff,
  ...subjectTeacherStaff,
];
