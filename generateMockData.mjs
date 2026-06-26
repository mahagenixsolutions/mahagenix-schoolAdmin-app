import fs from 'fs';
import path from 'path';

const MOCK_DIR = path.join(process.cwd(), 'apps', 'web', 'src', 'mock');

if (!fs.existsSync(MOCK_DIR)) {
  fs.mkdirSync(MOCK_DIR, { recursive: true });
}

// Helper functions
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateId = (prefix, index) => `${prefix}_${index.toString().padStart(3, '0')}`;

// Students
const studentFirstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Isabella', 'Elijah', 'Sophia', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander'];
const studentLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const classes = ['Grade 8', 'Grade 9', 'Grade 10'];
const sections = ['A', 'B', 'C'];

const students = Array.from({ length: 500 }).map((_, i) => {
  const gender = randomItem(['MALE', 'FEMALE']);
  return {
    id: generateId('stu', i + 1),
    student_code: `STD-2026-${(i + 1).toString().padStart(4, '0')}`,
    first_name: randomItem(studentFirstNames),
    last_name: randomItem(studentLastNames),
    class_name: randomItem(classes),
    section: randomItem(sections),
    gender,
    status: randomItem(['ACTIVE', 'ACTIVE', 'ACTIVE', 'INACTIVE']),
    attendance_rate: randomInt(75, 100),
    avg_marks: randomInt(60, 98),
    blood_group: randomItem(bloodGroups),
    allergies: randomItem(['None', 'None', 'None', 'Peanuts', 'Dairy']),
    medical_conditions: randomItem(['None', 'None', 'Asthma', 'None']),
    emergency_contact: `+1 555-${randomInt(1000, 9999)}`,
    risk_status: randomItem(['Low', 'Low', 'Low', 'Medium', 'High']),
    pulse: [
      { name: 'Mon', attendance: randomInt(0, 1) * 100, marks: randomInt(60, 100), participation: randomInt(50, 100) },
      { name: 'Tue', attendance: randomInt(0, 1) * 100, marks: randomInt(60, 100), participation: randomInt(50, 100) },
      { name: 'Wed', attendance: randomInt(0, 1) * 100, marks: randomInt(60, 100), participation: randomInt(50, 100) },
      { name: 'Thu', attendance: randomInt(0, 1) * 100, marks: randomInt(60, 100), participation: randomInt(50, 100) },
      { name: 'Fri', attendance: randomInt(0, 1) * 100, marks: randomInt(60, 100), participation: randomInt(50, 100) },
    ]
  };
});
fs.writeFileSync(path.join(MOCK_DIR, 'students.ts'), `export const mockStudents = ${JSON.stringify(students, null, 2)};\n`);

// Teachers
const teachers = Array.from({ length: 50 }).map((_, i) => ({
  id: generateId('tch', i + 1),
  first_name: randomItem(studentFirstNames), // reuse names
  last_name: randomItem(studentLastNames),
  subject: randomItem(['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Art']),
  email: `teacher${i+1}@edutrack.demo`,
  phone: `+1 555-${randomInt(1000, 9999)}`,
  department: randomItem(['Science', 'Arts', 'Languages', 'Mathematics', 'Technology']),
  is_active: true
}));
fs.writeFileSync(path.join(MOCK_DIR, 'teachers.ts'), `export const mockTeachers = ${JSON.stringify(teachers, null, 2)};\n`);

// Attendance
const attendanceRecords = students.slice(0, 50).map(s => ({
  student_id: s.id,
  date: new Date().toISOString().split('T')[0],
  status: randomItem(['PRESENT', 'PRESENT', 'PRESENT', 'ABSENT', 'LATE', 'LEAVE']),
  remarks: ''
}));
fs.writeFileSync(path.join(MOCK_DIR, 'attendance.ts'), `export const mockAttendance = ${JSON.stringify(attendanceRecords, null, 2)};\n`);

// Fees
const fees = students.slice(0, 50).map(s => ({
  id: generateId('fee', randomInt(1, 1000)),
  student_id: s.id,
  amount: randomItem([1500, 2000, 2500]),
  due_date: '2026-07-01',
  status: randomItem(['PAID', 'PENDING', 'OVERDUE']),
  term: 'Fall 2026'
}));
fs.writeFileSync(path.join(MOCK_DIR, 'fees.ts'), `export const mockFees = ${JSON.stringify(fees, null, 2)};\n`);

// Exams
const exams = [
  { id: 'exam_1', name: 'Mid-Term 2026', type: 'MIDTERM' },
  { id: 'exam_2', name: 'Final 2026', type: 'FINAL' }
];
const examResults = students.slice(0, 100).map(s => ({
  student_id: s.id,
  exam_id: 'exam_1',
  subject: 'Mathematics',
  score: randomInt(40, 100),
  max_score: 100
}));
fs.writeFileSync(path.join(MOCK_DIR, 'exams.ts'), `
export const mockExams = ${JSON.stringify(exams, null, 2)};
export const mockExamResults = ${JSON.stringify(examResults, null, 2)};
`);

// Dashboard
const dashboard = {
  kpis: {
    totalStudents: 500,
    totalTeachers: 50,
    averageAttendance: 92,
    feeCollectionRate: 85
  },
  charts: {
    attendanceTrend: [
      { month: 'Jan', rate: 95 }, { month: 'Feb', rate: 92 }, { month: 'Mar', rate: 94 }, { month: 'Apr', rate: 91 }
    ]
  }
};
fs.writeFileSync(path.join(MOCK_DIR, 'dashboard.ts'), `export const mockDashboard = ${JSON.stringify(dashboard, null, 2)};\n`);

// Notifications
const notifications = [
  { id: 'notif_1', type: 'ALERT', message: 'Mid-Term exams begin next week.', date: new Date().toISOString(), is_read: false },
  { id: 'notif_2', type: 'SYSTEM', message: 'System maintenance scheduled for Saturday.', date: new Date().toISOString(), is_read: true }
];
fs.writeFileSync(path.join(MOCK_DIR, 'notifications.ts'), `export const mockNotifications = ${JSON.stringify(notifications, null, 2)};\n`);

// AI
const aiResponses = {
  default: "I'm your EduTrack AI assistant. I can help analyze the current data on your screen. How can I assist you?",
  studentsPage: "There are currently 500 active students in the system. The average attendance rate is 92%.",
  dashboardPage: "Your fee collection rate is looking good at 85%. You have 50 teachers and 500 students registered."
};
fs.writeFileSync(path.join(MOCK_DIR, 'ai.ts'), `export const mockAiResponses = ${JSON.stringify(aiResponses, null, 2)};\n`);

console.log('Mock data generated successfully in apps/web/src/mock!');
