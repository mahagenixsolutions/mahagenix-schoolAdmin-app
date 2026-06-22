import { mockAcademicYears } from './academicYears';
import { getClassAttendance, mockAttendanceTrend } from './attendance';
import { mockClasses } from './classes';
import { mockAdminKpis, mockDetailedAnalytics, mockTeacherKpis } from './analytics';
import { getMarksRoster, getMockScore, mockExams, mockSubjectAverages } from './marks';
import { mockEvents, mockNotifications } from './notifications';
import { mockAchievements, mockBadges, mockParticipationRecords } from './participation';
import { getProgressByClass, getStudentProgressHistory } from './progress';
import { mockStudents } from './students';
import { mockSubjects } from './subjects';
import { mockStaff, mockUsers } from './users';

type Params = Record<string, any> | undefined;

const ok = (data: any) => ({ data: { data } });
const mutationOk = (data: any = { success: true }) => ok(data);

const normalizePath = (url: string) => url.replace(/^\/+/, '').split('?')[0];

const getStudent = (studentId?: string) => mockStudents.find((student) => student.id === studentId) || mockStudents[0];

const toNumberPercent = (value: string | number) => Number.parseInt(String(value), 10);

const getClassRows = () => mockClasses.map((cls, index) => {
  const roster = mockStudents.filter((student) => student.class_id === cls.id);
  const avgMarks = Math.round(roster.reduce((sum, student) => sum + student.average_marks, 0) / Math.max(1, roster.length));
  const avgAttendance = toNumberPercent(cls.attendance);
  return {
    classId: cls.id,
    className: `${cls.name} ${cls.section}`,
    teacher: cls.teacher,
    students: roster.length,
    studentCount: roster.length,
    avgAttendancePercent: avgAttendance,
    attendanceStatus: avgAttendance < 90 ? 'warning' : 'good',
    avgMarksPercent: avgMarks,
    feeCollectedPercent: 72 + ((index * 5) % 24),
  };
});

const buildClassDetails = (grade: string, params: Params) => {
  const cls = mockClasses.find((item) => item.grade === grade || item.id === grade) || mockClasses[0];
  let roster = mockStudents.filter((student) => student.class_id === cls.id);
  const search = String(params?.search || '').toLowerCase();
  const section = params?.section;

  if (search) {
    roster = roster.filter((student) =>
      [student.full_name, student.student_code, student.admission_no].some((value) => value.toLowerCase().includes(search)),
    );
  }
  if (section && section !== 'all') roster = roster.filter((student) => student.section === section);

  const sortBy = params?.sort_by || 'name';
  const sortOrder = params?.sort_order === 'desc' ? -1 : 1;
  roster = [...roster].sort((a: any, b: any) => {
    const valueA = sortBy === 'roll_number' ? a.roll_number : sortBy === 'attendance_rate' ? a.attendance_rate : sortBy === 'average_marks' ? a.average_marks : a.full_name;
    const valueB = sortBy === 'roll_number' ? b.roll_number : sortBy === 'attendance_rate' ? b.attendance_rate : sortBy === 'average_marks' ? b.average_marks : b.full_name;
    return valueA > valueB ? sortOrder : valueA < valueB ? -sortOrder : 0;
  });

  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const start = (page - 1) * limit;
  const paginated = roster.slice(start, start + limit).map((student) => ({
    ...student,
    name: student.full_name,
    class_name: `${student.class.name} ${student.class.section}`,
  }));
  const fullRoster = mockStudents.filter((student) => student.class_id === cls.id);
  const avgMarks = Math.round(fullRoster.reduce((sum, student) => sum + student.average_marks, 0) / Math.max(1, fullRoster.length));
  const topStudent = [...fullRoster].sort((a, b) => b.average_marks - a.average_marks)[0];
  const atRisk = fullRoster.filter((student) => student.attendance_rate < 88 || student.average_marks < 74);

  return {
    kpis: {
      total_students: fullRoster.length,
      boys: fullRoster.filter((student) => student.gender === 'MALE').length,
      girls: fullRoster.filter((student) => student.gender === 'FEMALE').length,
      attendance_rate: toNumberPercent(cls.attendance),
      avg_marks: avgMarks,
      top_performer: topStudent?.full_name || 'N/A',
      at_risk_count: atRisk.length,
    },
    students: {
      data: paginated,
      meta: { total: roster.length, page, limit, total_pages: Math.max(1, Math.ceil(roster.length / limit)) },
    },
    analytics: {
      attendance_trend: mockAttendanceTrend.map((item, index) => ({ month: item.month, rate: Math.max(72, toNumberPercent(cls.attendance) - 4 + (index % 5)) })),
      marks_trend: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => ({ month, average: Math.max(55, avgMarks - 5 + index * 2) })),
      subject_performance: mockSubjects
        .filter((subject) => !subject.classes || subject.classes.includes(cls.grade))
        .slice(0, 7)
        .map((subject) => ({
          subject: subject.name,
          average: Math.round(fullRoster.reduce((sum, student) => sum + getMockScore(student.id, subject.id), 0) / Math.max(1, fullRoster.length)),
        })),
      behavior_score: 84 + (Number(cls.grade) % 9),
      participation_score: 82 + (Number(cls.grade) % 10),
      top_performers: [...fullRoster]
        .sort((a, b) => b.average_marks - a.average_marks)
        .slice(0, 4)
        .map((student) => ({ name: student.full_name, class_name: `${student.class.name} ${student.class.section}`, average_marks: student.average_marks })),
      at_risk: atRisk.map((student) => ({
        id: student.id,
        name: student.full_name,
        student_code: student.student_code,
        attendance_rate: student.attendance_rate,
        average_marks: student.average_marks,
      })),
    },
  };
};

const buildSubjectDashboard = (subjectId: string) => {
  const subject = mockSubjects.find((item) => item.id === subjectId) || mockSubjects[0];
  const eligibleClasses = mockClasses.filter((cls) => !subject.classes || subject.classes.includes(cls.grade));
  const eligibleStudents = mockStudents.filter((student) => eligibleClasses.some((cls) => cls.id === student.class_id));
  const teacher = mockStaff.find((staff) => staff.id === subject.teacher_id);
  const subjectTeacher = teacher as any;
  const scores = eligibleStudents.map((student) => getMockScore(student.id, subject.id));
  const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / Math.max(1, scores.length));
  const gradeDistribution = scores.reduce((acc: Record<string, number>, score) => {
    const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, { 'A+': 0, A: 0, B: 0, C: 0, D: 0 });

  return {
    overview: {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      description: `${subject.name} performance across ${eligibleClasses.length} classes with class-wise progress and teacher activity.`,
    },
    kpis: {
      totalClasses: eligibleClasses.length,
      totalStudents: eligibleStudents.length,
      averageSubjectScore: average,
      homeworkCompletionRate: 84,
    },
    classMapping: eligibleClasses.map((cls) => {
      const roster = eligibleStudents.filter((student) => student.class_id === cls.id);
      return {
        id: cls.id,
        name: `${cls.name} ${cls.section}`,
        averageMarks: Math.round(roster.reduce((sum, student) => sum + getMockScore(student.id, subject.id), 0) / Math.max(1, roster.length)),
        attendance: toNumberPercent(cls.attendance),
      };
    }),
    marksAnalytics: { gradeDistribution },
    studentPerformance: eligibleStudents.map((student) => ({
      id: student.id,
      name: student.full_name,
      student_code: student.student_code,
      className: `${student.class.name} ${student.class.section}`,
      attendance: student.attendance_rate,
      averageMarks: getMockScore(student.id, subject.id),
      homeworkCompletion: 76 + ((Number(student.roll_no) * 4) % 22),
      status: student.average_marks < 72 ? 'Needs Focus' : 'On Track',
    })),
    teachers: teacher ? [{
      id: subjectTeacher.id,
      name: `${subjectTeacher.first_name} ${subjectTeacher.last_name}`,
      photoUrl: subjectTeacher.photoUrl || subjectTeacher.avatar_url,
      qualification: subjectTeacher.qualification || 'B.Ed',
      experienceYears: subjectTeacher.experienceYears || 6,
      syllabusCompleted: subjectTeacher.syllabusCompleted || 78,
    }] : [],
    insights: [
      `${subject.name} average is ${average}% across ${eligibleStudents.length} students.`,
      `${eligibleClasses[0]?.name || 'The first class'} has strong engagement; keep weekly practice checks active.`,
      `Students below 70% should receive a short revision worksheet before the next assessment.`,
    ],
  };
};

const buildAcademicYearDetails = (id: string) => {
  const overview = mockAcademicYears.find((year) => year.id === id) || mockAcademicYears[0];
  return {
    overview,
    summary: {
      enrolled: mockStudents.length,
      promoted: 64,
      graduated: 6,
      transferred: 1,
      dropouts: 0,
      newAdmissions: 12,
    },
    terms: [
      { id: 'term-1', name: 'Term 1', start_date: '2026-04-01', end_date: '2026-07-31', is_current: true },
      { id: 'term-2', name: 'Term 2', start_date: '2026-08-01', end_date: '2026-11-30', is_current: false },
      { id: 'term-3', name: 'Term 3', start_date: '2026-12-01', end_date: '2027-03-31', is_current: false },
    ],
    calendar: [
      { id: 'event-1', title: 'Academic Year Opening Day', event_date: '2026-04-01', event_type: 'EVENT', event_status: 'COMPLETED' },
      { id: 'event-2', title: 'Unit Test 1', event_date: '2026-06-24', event_type: 'EXAM', event_status: 'UPCOMING' },
      { id: 'event-3', title: 'Independence Day Celebration', event_date: '2026-08-15', event_type: 'CULTURAL', event_status: 'UPCOMING' },
      { id: 'event-4', title: 'Annual Sports Meet', event_date: '2026-12-12', event_type: 'SPORTS', event_status: 'UPCOMING' },
      { id: 'event-5', title: 'Winter Break', event_date: '2026-12-24', event_type: 'HOLIDAY', event_status: 'UPCOMING' },
    ],
    achievements: [
      { id: 'ay-ach-1', title: 'Inter-school Science Fair Winners', description: 'Senior students won first place for a renewable-energy model.', level: 'INTERSCHOOL', category: 'ACADEMIC' },
      { id: 'ay-ach-2', title: 'District Athletics Finalists', description: 'Students qualified for district track and field finals.', level: 'DISTRICT', category: 'SPORTS' },
      { id: 'ay-ach-3', title: 'Community Reading Drive', description: 'Classes 1-5 completed a 1,000-book reading challenge.', level: 'SCHOOL', category: 'CULTURAL' },
    ],
  };
};

const buildPromotionClasses = () => mockClasses.map((cls) => ({
  id: cls.id,
  name: `${cls.name} ${cls.section}`,
  grade: cls.grade,
  teacher: cls.teacher,
  students: mockStudents
    .filter((student) => student.class_id === cls.id)
    .map((student) => ({
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      student_code: student.student_code,
      result: student.average_marks >= 60 ? 'PASS' : 'FAIL',
      average_marks: student.average_marks,
    })),
}));

const getStudentBundle = (studentId?: string) => {
  const student = getStudent(studentId);
  return {
    ...student,
    attendance_summary: { present: 86, absent: 4, late: 2, percentage: 93 },
    marks_summary: mockSubjectAverages.map((item) => ({ subject: item.subject, score: item.average, max_score: 100 })),
    achievements: mockAchievements.filter((item) => item.student_id === student.id),
    badges: mockBadges.filter((item) => item.student_id === student.id),
    remarks: [{ id: 'remark-1', category: 'Academic', remark: 'Shows strong curiosity and asks thoughtful questions.', created_at: '2026-06-17' }],
    fees: [{ id: 'fee-1', title: 'Term 1 Fee', amount: 28000, due_date: '2026-06-30', status: 'PENDING' }],
  };
};

export function resolveMockRequest(input: any) {
  const request = typeof input === 'string' ? { url: input, method: 'GET', params: undefined, body: undefined } : input;
  const path = normalizePath(request.url);
  const params: Params = request.params;
  const method = (request.method || 'GET').toUpperCase();

  if (method !== 'GET') return mutationOk({ ...request.body, id: `mock-${Date.now()}`, saved: true });

  if (path === 'auth/login') return ok({ access_token: 'mock-access-token', refresh_token: 'mock-refresh-token', user: mockUsers.admin });
  if (path === 'auth/me') return ok(mockUsers.admin);

  if (path === 'students') {
    const search = String(params?.search || '').toLowerCase();
    const classId = params?.class_id;
    const filtered = mockStudents.filter((student) => {
      const matchesSearch = !search || [student.full_name, student.student_code, student.admission_no].some((value) => value.toLowerCase().includes(search));
      const matchesClass = !classId || student.class_id === classId;
      return matchesSearch && matchesClass;
    });
    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 20);
    const start = (page - 1) * limit;
    return ok({
      data: filtered.slice(start, start + limit),
      meta: { total: filtered.length, total_pages: Math.max(1, Math.ceil(filtered.length / limit)) },
    });
  }
  if (path.startsWith('students/')) return ok(getStudentBundle(path.split('/')[1]));

  if (path === 'classes/overview') return ok(mockClasses);
  if (path.startsWith('classes/details/')) {
    const grade = path.split('/').pop();
    return ok(buildClassDetails(grade || '1', params));
  }

  if (path === 'marks/meta/classes') return ok(mockClasses);
  if (path === 'marks/meta/subjects') return ok(mockSubjects);
  if (path === 'marks/meta/exams') return ok(mockExams);
  if (path === 'marks/meta/academic-years') return ok(mockAcademicYears);
  if (path.startsWith('marks/class/')) return ok(getMarksRoster(path.split('/')[2], params?.examId, params?.subjectId));

  if (path.startsWith('attendance/class/')) return ok(getClassAttendance(path.split('/')[2]));

  if (path === 'academic-years') return ok(mockAcademicYears);
  if (path.match(/^academic-years\/[^/]+$/)) {
    const id = path.split('/')[1];
    return ok(buildAcademicYearDetails(id));
  }
  if (path.endsWith('/promotions')) return ok(buildPromotionClasses());

  if (path === 'subjects') return ok(mockSubjects);
  if (path.match(/^subjects\/[^/]+\/dashboard$/)) {
    const subjectId = path.split('/')[1];
    return ok(buildSubjectDashboard(subjectId));
  }
  if (path.match(/^subjects\/[^/]+\/syllabus$/)) {
    const subjectId = path.split('/')[1];
    const dashboard = buildSubjectDashboard(subjectId);
    const teacher = dashboard.teachers[0] || { id: 'teacher-013', name: 'Ritu Sharma' };
    return ok([
      {
        id: `${subjectId}-unit-1`,
        unit_name: 'Foundations',
        topics: dashboard.classMapping.slice(0, 4).map((cls: any, index: number) => ({
          id: `${subjectId}-topic-foundation-${index}`,
          topic_name: ['Core concepts', 'Vocabulary and symbols', 'Guided practice', 'Class quiz'][index],
          class: { id: cls.id, name: cls.name },
          teacher: { id: teacher.id, first_name: teacher.name.split(' ')[0] },
          status: index < 2 ? 'Completed' : 'In Progress',
          progress: index < 2 ? 100 : 68 + index * 6,
        })),
      },
      {
        id: `${subjectId}-unit-2`,
        unit_name: 'Application',
        topics: dashboard.classMapping.slice(4, 9).map((cls: any, index: number) => ({
          id: `${subjectId}-topic-application-${index}`,
          topic_name: ['Lab activity', 'Project task', 'Peer review', 'Revision worksheet', 'Assessment prep'][index],
          class: { id: cls.id, name: cls.name },
          teacher: { id: teacher.id, first_name: teacher.name.split(' ')[0] },
          status: index < 1 ? 'Completed' : index < 4 ? 'In Progress' : 'Planned',
          progress: index < 1 ? 100 : index < 4 ? 52 + index * 8 : 20,
        })),
      },
    ]);
  }
  if (path.match(/^subjects\/[^/]+\/resources$/)) {
    const subjectId = path.split('/')[1];
    const subject = mockSubjects.find((item) => item.id === subjectId) || mockSubjects[0];
    const teacher = mockStaff.find((staff) => staff.id === subject.teacher_id) || mockStaff[1];
    return ok([
      { id: `${subjectId}-res-1`, title: `${subject.name} practice worksheet`, type: 'PDF', url: '#', uploader: teacher },
      { id: `${subjectId}-res-2`, title: `${subject.name} concept slides`, type: 'Slides', url: '#', uploader: teacher },
      { id: `${subjectId}-res-3`, title: `${subject.name} revision video`, type: 'Video', url: '#', uploader: teacher },
    ]);
  }
  if (path.match(/^subjects\/[^/]+\/activity$/)) {
    const subjectId = path.split('/')[1];
    const subject = mockSubjects.find((item) => item.id === subjectId) || mockSubjects[0];
    const teacher = mockStaff.find((staff) => staff.id === subject.teacher_id) || mockStaff[1];
    return ok([
      { id: `${subjectId}-act-1`, teacher, action: `updated ${subject.name} syllabus progress`, created_at: '2026-06-18T09:30:00Z' },
      { id: `${subjectId}-act-2`, teacher, action: 'uploaded a practice worksheet', created_at: '2026-06-17T12:15:00Z' },
      { id: `${subjectId}-act-3`, teacher, action: 'reviewed quarterly assessment scores', created_at: '2026-06-16T15:45:00Z' },
    ]);
  }

  if (path === 'analytics/admin-kpis') return ok(mockAdminKpis);
  if (path === 'analytics/detailed') return ok(mockDetailedAnalytics);
  if (path === 'analytics/teacher-kpis') return ok(mockTeacherKpis);
  if (path.startsWith('analytics/parent-kpis/')) return ok({ attendance: 93, average_marks: 86, homework_completion: 92, badges: 3 });
  if (path === 'analytics/attendance-trend') return ok(mockAttendanceTrend);
  if (path === 'analytics/marks-trend') return ok([{ month: 'Apr', score: 78 }, { month: 'May', score: 83 }, { month: 'Jun', score: 87 }]);

  if (path === 'dashboard/kpis') return ok(mockAdminKpis);
  if (path === 'dashboard/alerts') return ok({ alerts: [
    { severity: 'warning', message: 'Class 8 A attendance needs follow-up this week', link: '/classes/class-8-a' },
    { severity: 'info', message: 'Quarterly marks draft is 84% complete', link: '/marks' },
    { severity: 'success', message: 'Class 12 A completed all mock exam entries', link: '/classes/class-12-a' },
  ] });
  if (path === 'dashboard/attendance-trend') return ok(mockAttendanceTrend);
  if (path === 'dashboard/subject-performance') return ok(mockSubjectAverages);
  if (path === 'dashboard/today-attendance-breakdown') return ok([{ name: 'Present', value: 64 }, { name: 'Absent', value: 4 }, { name: 'Late', value: 3 }, { name: 'Leave', value: 1 }]);
  if (path === 'dashboard/fee-collection-trend') return ok([{ month: 'Jan', collected: 72 }, { month: 'Feb', collected: 78 }, { month: 'Mar', collected: 84 }, { month: 'Apr', collected: 88 }, { month: 'May', collected: 91 }, { month: 'Jun', collected: 88 }]);
  if (path === 'dashboard/recent-activity') return ok(mockNotifications.map((item) => ({ id: item.id, action: item.title, actor: 'EduTrack Demo', created_at: item.created_at })));
  if (path === 'dashboard/upcoming-events') return ok(mockEvents);
  if (path === 'dashboard/insights') return ok({ insights: [
    { id: 'insight-1', title: 'Class 12 A leads academic performance', value: '94%', tone: 'success', icon: 'ti ti-trophy' },
    { id: 'insight-2', title: 'Class 8 A attendance needs attention', value: '89%', tone: 'warning', icon: 'ti ti-alert-circle' },
    { id: 'insight-3', title: 'Science scores improved across middle school', value: '+6%', tone: 'info', icon: 'ti ti-chart-line' },
  ] });
  if (path === 'dashboard/class-performance') return ok({ classes: getClassRows() });

  if (path.startsWith('progress/class/')) return ok(getProgressByClass(path.split('/')[2]));
  if (path === 'progress/analytics') return ok({ completed: 87, pending: 13, trend: [{ day: 'Mon', completed: 81 }, { day: 'Tue', completed: 86 }, { day: 'Wed', completed: 89 }] });
  if (path.startsWith('progress/student/')) return ok(getStudentProgressHistory(path.split('/')[2]));

  if (path === 'participation/overview') return ok({ total_points: 186, active_students: mockStudents.length, achievements: mockAchievements.length, badges: mockBadges.length });
  if (path === 'participation/analytics') return ok({ by_category: [{ name: 'Academic', value: 42 }, { name: 'Cultural', value: 28 }, { name: 'Sports', value: 30 }] });
  if (path === 'participation/records') return ok(mockParticipationRecords);
  if (path === 'participation/achievements') return ok(mockAchievements);
  if (path === 'participation/badges') return ok(mockBadges);
  if (path.startsWith('participation/student/')) return ok(getStudentBundle(path.split('/')[2]));

  if (path === 'users/staff') return ok(mockStaff);
  if (path.startsWith('teachers/')) {
    const tId = path.split('/')[1];
    const staff = mockStaff.find((item) => item.id === tId) || mockStaff[1];
    return ok({
        id: staff?.id || tId,
        name: staff ? `${staff.first_name} ${staff.last_name}` : 'Sarah Jenkins',
        email: staff?.email || 'sarah.j@edutrack.edu',
        phone: '+1 555-0198',
        photoUrl: `https://ui-avatars.com/api/?name=${staff ? staff.first_name : 'S'}+${staff ? staff.last_name : 'J'}&background=e0e7ff&color=4338ca&size=200`,
        bio: 'Passionate and dedicated educator with a strong commitment to fostering a joyful, measurable learning environment. Specializes in differentiated instruction and leveraging modern EdTech tools to boost student engagement and academic outcomes. Believes that every child has the potential to excel with the right guidance.',
        qualification: 'M.Ed in Curriculum and Instruction',
        experienceYears: 8,
        joinedDate: '2018-08-15T00:00:00Z',
        skills: [
            { id: 'sk1', skill_name: 'Differentiated Instruction', category: 'pedagogical', proficiency_level: 'expert' },
            { id: 'sk2', skill_name: 'Classroom Management', category: 'pedagogical', proficiency_level: 'expert' },
            { id: 'sk3', skill_name: 'EdTech Integration', category: 'technical', proficiency_level: 'expert' },
            { id: 'sk4', skill_name: 'Curriculum Design', category: 'pedagogical', proficiency_level: 'intermediate' },
            { id: 'sk5', skill_name: 'Parent Communication', category: 'pedagogical', proficiency_level: 'expert' }
        ],
        awards: [
            { id: 'aw1', title: 'District Teacher of the Year', description: null, awarded_by: 'EduTrack Board of Education', awarded_date: '2023-05-15T00:00:00Z', academic_year: '2022-2023' },
            { id: 'aw2', title: 'Excellence in EdTech Innovation', description: null, awarded_by: 'State EdTech Consortium', awarded_date: '2021-11-20T00:00:00Z', academic_year: '2021-2022' }
        ],
        leavesTaken: 2,
        syllabusCompleted: 92,
        classesAssigned: [
            { id: 'c1', name: 'Grade 10 - Mathematics (Section A)' },
            { id: 'c2', name: 'Grade 10 - Mathematics (Section B)' },
            { id: 'c3', name: 'Grade 11 - Advanced Algebra' }
        ]
    });
  }

  if (path === 'parent/linked-students') return ok(mockStudents.slice(0, 2));
  if (path === 'parent/student-profile') return ok(getStudentBundle(params?.studentId));
  if (path === 'parent/attendance') return ok({ percentage: 93, present: 21, absent: 1, late: 1, trend: mockAttendanceTrend });
  if (path === 'parent/marks') return ok(mockSubjectAverages.map((item) => ({ subject: item.subject, score: item.average, max_score: 100, grade: item.average >= 90 ? 'A' : 'B+' })));
  if (path === 'parent/homework') return ok([{ title: 'Reading log', due_date: '2026-06-19', status: 'COMPLETED' }, { title: 'Math worksheet', due_date: '2026-06-20', status: 'PENDING' }]);
  if (path === 'parent/fees') return ok(getStudentBundle(params?.studentId).fees);
  if (path === 'parent/announcements') return ok(mockNotifications);
  if (path === 'parent/timeline') return ok([{ id: 'timeline-1', type: 'attendance', title: 'Marked present', date: '2026-06-18' }, { id: 'timeline-2', type: 'marks', title: 'Scored 88 in English', date: '2026-06-17' }]);
  if (path === 'parent/messages') return ok([{ id: 'thread-1', teacherId: 'teacher-001', teacherName: 'Nisha Rao', lastMessage: 'Great progress this week.', messages: [{ sender: 'teacher', content: 'Great progress this week.', at: '2026-06-17T10:00:00Z' }] }]);
  if (path === 'parent/reports') return ok([{ id: 'report-1', title: 'Quarterly Progress Report', status: 'Ready', date: '2026-06-15' }]);
  if (path === 'parent/achievements') return ok(getStudentBundle(params?.studentId).achievements);
  if (path === 'parent/badges') return ok(getStudentBundle(params?.studentId).badges);
  if (path === 'parent/rankings') return ok([{ scope: 'Class', rank: 4, total: 8 }, { scope: 'Grade', rank: 7, total: 16 }]);
  if (path === 'parent/remarks') return ok(getStudentBundle(params?.studentId).remarks);
  if (path === 'parent/gallery') return ok([{ id: 'photo-1', title: 'Art showcase', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop' }]);
  if (path === 'parent/progress') return ok(getStudentProgressHistory(params?.studentId));
  if (path === 'parent/ai-insights') return ok({ summary: 'Consistent engagement with a clear upward trend in reading and number fluency.', strengths: ['Reading fluency', 'Peer collaboration'], focus: ['Timed arithmetic practice'] });

  return ok([]);
}
