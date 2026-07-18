export interface LeadershipProfile {
  name: string;
  role: 'PRINCIPAL' | 'VICE_PRINCIPAL' | 'ADMIN';
  email: string;
  phone: string;
  tenure: string;
  avatarBg: string;
  avatarColor: string;
}

export interface BranchInfo {
  code: string;
  board: string;
  medium: string;
  area: string;
  established: string;
  capacity: number;
  strength: number;
  busesCount: number;
  booksCount: number;
  labsCount: number;
  hostelAvailable: boolean;
  cctvStatus: string;
  biometricStatus: string;
}

export interface BranchHealth {
  academics: number;
  finance: number;
  attendance: number;
  staff: number;
  infrastructure: number;
  compliance: number;
  overall: number;
}

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  date: 'Today' | 'Yesterday';
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  author: string;
  type: 'emergency' | 'general' | 'notice';
}

export interface AcademicData {
  homeworkCompletion: number;
  lessonPlanCompletion: number;
  assignmentSubmission: number;
  averageGrade: string;
  topPerformingClass: string;
  lowestPerformingClass: string;
  upcomingExamsCount: number;
}

export interface FinancialData {
  income: number;
  expense: number;
  profit: number;
  pendingFees: number;
  collectedThisMonth: number;
  outstandingStudents: number;
}

export interface TeacherStat {
  total: number;
  presentToday: number;
  onLeave: number;
  vacancies: number;
  avgRating: number;
  avgExperience: number;
}

export interface StudentStat {
  total: number;
  boys: number;
  girls: number;
  newAdmissions: number;
  transfers: number;
  dropouts: number;
  scholarships: number;
}

export interface InfraStat {
  classrooms: number;
  labs: number;
  books: number;
  computers: number;
  smartBoards: number;
  buses: number;
  cctvs: number;
  generators: number;
}

export interface ComplianceData {
  govRecognition: 'Valid' | 'Expired' | 'Pending';
  fireSafety: string; // e.g. "Expires 28 Days"
  buildingCert: 'Valid' | 'Expired' | 'Pending';
  busFitness: 'Valid' | 'Expired' | 'Pending';
  staffVerificationPercent: number;
  documentCompletionPercent: number;
}
