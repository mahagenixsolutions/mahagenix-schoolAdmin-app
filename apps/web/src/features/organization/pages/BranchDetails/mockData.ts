import type {
  LeadershipProfile,
  BranchInfo,
  BranchHealth,
  ActivityItem,
  AnnouncementItem,
  AcademicData,
  FinancialData,
  TeacherStat,
  StudentStat,
  InfraStat,
  ComplianceData
} from './types';

export interface CompleteBranchData {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
  establishedYear: string;
  academicYear: string;
  occupancyPercent: number;
  healthScore: number;
  revenue: string;
  expense: string;
  leadership: {
    principal: LeadershipProfile;
    vicePrincipal: LeadershipProfile;
    admin: LeadershipProfile;
  };
  info: BranchInfo;
  health: BranchHealth;
  activities: ActivityItem[];
  announcements: AnnouncementItem[];
  academics: AcademicData;
  finance: FinancialData;
  teachers: TeacherStat;
  students: StudentStat;
  infrastructure: InfraStat;
  compliance: ComplianceData;
}

export const mockBranchDetails: Record<string, CompleteBranchData> = {
  'branch-koramangala': {
    id: 'branch-koramangala',
    name: 'Koramangala Branch',
    location: 'Bangalore South',
    status: 'Active',
    establishedYear: '2018',
    academicYear: '2026-27',
    occupancyPercent: 83,
    healthScore: 88,
    revenue: '₹85L',
    expense: '₹68L',
    leadership: {
      principal: {
        name: 'Rajesh Kumar',
        role: 'PRINCIPAL',
        email: 'rajesh.kumar@edutrack.demo',
        phone: '+91 98765 41021',
        tenure: 'Since 2021',
        avatarBg: '#fffbeb',
        avatarColor: '#d97706'
      },
      vicePrincipal: {
        name: 'Sunita Desai',
        role: 'VICE_PRINCIPAL',
        email: 'sunita.desai@edutrack.demo',
        phone: '+91 98765 41005',
        tenure: 'Since 2022',
        avatarBg: '#eff6ff',
        avatarColor: '#2563eb'
      },
      admin: {
        name: 'Ravi Sharma',
        role: 'ADMIN',
        email: 'ravi.sharma@edutrack.demo',
        phone: '+91 98765 41999',
        tenure: 'Since 2019',
        avatarBg: '#f5f3ff',
        avatarColor: '#8b5cf6'
      }
    },
    info: {
      code: 'KOR001',
      board: 'CBSE',
      medium: 'English',
      area: '2.5 Acres',
      established: '2018',
      capacity: 1500,
      strength: 1248,
      busesCount: 14,
      booksCount: 12540,
      labsCount: 7,
      hostelAvailable: true,
      cctvStatus: 'Working (126 Cameras)',
      biometricStatus: 'Enabled'
    },
    health: {
      academics: 92,
      finance: 88,
      attendance: 94,
      staff: 96,
      infrastructure: 90,
      compliance: 84,
      overall: 90
    },
    activities: [
      { id: 'act-1', time: '09:30 AM', text: 'Principal approved final mid-term timetable', date: 'Today', icon: '📋', iconBg: '#eff6ff', iconColor: '#2563eb' },
      { id: 'act-2', time: '08:20 AM', text: '42 new student admissions confirmed for Term 2', date: 'Today', icon: '👤', iconBg: '#ecfdf5', iconColor: '#10b981' },
      { id: 'act-3', time: '03:15 PM', text: 'New primary English teacher joined the department', date: 'Yesterday', icon: '👥', iconBg: '#f5f3ff', iconColor: '#8b5cf6' },
      { id: 'act-4', time: '11:40 AM', text: 'Quarterly fee payment collections received (₹4.8L)', date: 'Yesterday', icon: '💰', iconBg: '#fffbeb', iconColor: '#f59e0b' },
      { id: 'act-5', time: '09:00 AM', text: 'Class 10 Biology lab assessment schedule created', date: 'Yesterday', icon: '🧪', iconBg: '#fdf2f8', iconColor: '#ec4899' },
    ],
    announcements: [
      { id: 'ann-1', title: 'Uniform Syllabus and Grading Guidelines published', date: 'Jul 14, 2026', author: 'Vikram Singhania', type: 'general' },
      { id: 'ann-2', title: 'PTM rescheduled to August 2 for Class 1-8', date: 'Jul 12, 2026', author: 'School Admin', type: 'notice' },
      { id: 'ann-3', title: 'URGENT: Emergency fire safety drill on July 19', date: 'Jul 15, 2026', author: 'Principal', type: 'emergency' }
    ],
    academics: {
      homeworkCompletion: 87,
      lessonPlanCompletion: 93,
      assignmentSubmission: 90,
      averageGrade: 'A-',
      topPerformingClass: 'Grade 10A',
      lowestPerformingClass: 'Grade 8C',
      upcomingExamsCount: 12
    },
    finance: {
      income: 8500000,
      expense: 6820000,
      profit: 1680000,
      pendingFees: 420000,
      collectedThisMonth: 900000,
      outstandingStudents: 128
    },
    teachers: {
      total: 82,
      presentToday: 79,
      onLeave: 2,
      vacancies: 3,
      avgRating: 4.7,
      avgExperience: 8.3
    },
    students: {
      total: 1248,
      boys: 652,
      girls: 596,
      newAdmissions: 42,
      transfers: 8,
      dropouts: 2,
      scholarships: 132
    },
    infrastructure: {
      classrooms: 52,
      labs: 7,
      books: 12540,
      computers: 168,
      smartBoards: 45,
      buses: 14,
      cctvs: 126,
      generators: 2
    },
    compliance: {
      govRecognition: 'Valid',
      fireSafety: 'Expires 28 Days',
      buildingCert: 'Valid',
      busFitness: 'Pending',
      staffVerificationPercent: 96,
      documentCompletionPercent: 88
    }
  },
  'branch-whitefield': {
    id: 'branch-whitefield',
    name: 'Whitefield Branch',
    location: 'Bangalore East',
    status: 'Active',
    establishedYear: '2020',
    academicYear: '2026-27',
    occupancyPercent: 78,
    healthScore: 85,
    revenue: '₹74L',
    expense: '₹61L',
    leadership: {
      principal: {
        name: 'Farhan Ali',
        role: 'PRINCIPAL',
        email: 'farhan.ali@edutrack.demo',
        phone: '+91 98765 42002',
        tenure: 'Since 2020',
        avatarBg: '#eff6ff',
        avatarColor: '#2563eb'
      },
      vicePrincipal: {
        name: 'Farida Khan',
        role: 'VICE_PRINCIPAL',
        email: 'farida.khan@edutrack.demo',
        phone: '+91 98765 42005',
        tenure: 'Since 2021',
        avatarBg: '#fffbeb',
        avatarColor: '#d97706'
      },
      admin: {
        name: 'Amit Patel',
        role: 'ADMIN',
        email: 'amit.patel@edutrack.demo',
        phone: '+91 98765 42999',
        tenure: 'Since 2020',
        avatarBg: '#f5f3ff',
        avatarColor: '#8b5cf6'
      }
    },
    info: {
      code: 'WTF002',
      board: 'CBSE',
      medium: 'English',
      area: '3.2 Acres',
      established: '2020',
      capacity: 1200,
      strength: 850,
      busesCount: 10,
      booksCount: 8400,
      labsCount: 5,
      hostelAvailable: false,
      cctvStatus: 'Working (94 Cameras)',
      biometricStatus: 'Enabled'
    },
    health: {
      academics: 89,
      finance: 84,
      attendance: 91,
      staff: 92,
      infrastructure: 88,
      compliance: 86,
      overall: 88
    },
    activities: [
      { id: 'act-1', time: '11:30 AM', text: 'Safety drill audit completed successfully', date: 'Today', icon: '🛡️', iconBg: '#ecfdf5', iconColor: '#10b981' },
      { id: 'act-2', time: '10:00 AM', text: 'New smart boards installed in block C', date: 'Today', icon: '🖥️', iconBg: '#eff6ff', iconColor: '#2563eb' },
      { id: 'act-3', time: '02:00 PM', text: 'Parent Teacher Association general body met', date: 'Yesterday', icon: '👥', iconBg: '#fffbeb', iconColor: '#f59e0b' }
    ],
    announcements: [
      { id: 'ann-1', title: 'Quarterly syllabus compliance reports due next week', date: 'Jul 15, 2026', author: 'Academic VP', type: 'notice' }
    ],
    academics: {
      homeworkCompletion: 84,
      lessonPlanCompletion: 90,
      assignmentSubmission: 88,
      averageGrade: 'B+',
      topPerformingClass: 'Grade 9B',
      lowestPerformingClass: 'Grade 7A',
      upcomingExamsCount: 8
    },
    finance: {
      income: 7400000,
      expense: 6100000,
      profit: 1300000,
      pendingFees: 580000,
      collectedThisMonth: 820000,
      outstandingStudents: 96
    },
    teachers: {
      total: 60,
      presentToday: 58,
      onLeave: 1,
      vacancies: 1,
      avgRating: 4.5,
      avgExperience: 6.8
    },
    students: {
      total: 850,
      boys: 450,
      girls: 400,
      newAdmissions: 28,
      transfers: 4,
      dropouts: 1,
      scholarships: 84
    },
    infrastructure: {
      classrooms: 40,
      labs: 5,
      books: 8400,
      computers: 120,
      smartBoards: 30,
      buses: 10,
      cctvs: 94,
      generators: 1
    },
    compliance: {
      govRecognition: 'Valid',
      fireSafety: 'Valid',
      buildingCert: 'Valid',
      busFitness: 'Valid',
      staffVerificationPercent: 98,
      documentCompletionPercent: 94
    }
  }
};
