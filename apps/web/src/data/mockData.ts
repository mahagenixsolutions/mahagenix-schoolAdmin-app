export const mockStudents = [
  {
    id: 'student_1',
    student_code: 'STD-2026-001',
    first_name: 'John',
    last_name: 'Doe',
    class_name: 'Grade 10',
    section: 'A',
    gender: 'MALE',
    status: 'ACTIVE',
    attendance_rate: 96,
    avg_marks: 88,
    blood_group: 'O+',
    allergies: 'Peanuts',
    medical_conditions: 'None',
    emergency_contact: '+1 555-0100',
    risk_status: 'Low', // Low, Medium, High
    pulse: [
      { name: 'Mon', attendance: 100, marks: 85, participation: 90 },
      { name: 'Tue', attendance: 100, marks: 88, participation: 85 },
      { name: 'Wed', attendance: 0, marks: 80, participation: 0 },
      { name: 'Thu', attendance: 100, marks: 90, participation: 95 },
      { name: 'Fri', attendance: 100, marks: 92, participation: 100 },
    ],
  },
  {
    id: 'student_2',
    student_code: 'STD-2026-002',
    first_name: 'Sarah',
    last_name: 'Smith',
    class_name: 'Grade 10',
    section: 'A',
    gender: 'FEMALE',
    status: 'ACTIVE',
    attendance_rate: 82,
    avg_marks: 74,
    blood_group: 'A-',
    allergies: 'None',
    medical_conditions: 'Asthma',
    emergency_contact: '+1 555-0200',
    risk_status: 'Medium',
    pulse: [
      { name: 'Mon', attendance: 100, marks: 75, participation: 80 },
      { name: 'Tue', attendance: 0, marks: 70, participation: 0 },
      { name: 'Wed', attendance: 0, marks: 72, participation: 0 },
      { name: 'Thu', attendance: 100, marks: 78, participation: 75 },
      { name: 'Fri', attendance: 100, marks: 75, participation: 80 },
    ],
  }
];

export const mockTimelineEvents = [
  {
    id: 'evt_1',
    student_id: 'student_1',
    type: 'BADGE', // BADGE, MARK, ATTENDANCE, REMARK, HOMEWORK
    date: '2026-06-19T10:30:00Z',
    title: 'Awarded "Math Wizard" Badge',
    description: 'Awarded by Mr. Johnson for exceptional problem solving.',
    icon: '🚀',
    color: 'var(--color-primary)',
  },
  {
    id: 'evt_2',
    student_id: 'student_1',
    type: 'HOMEWORK',
    date: '2026-06-18T15:00:00Z',
    title: 'Completed Physics Assignment',
    description: 'Submitted "Kinematics Worksheet" on time.',
    icon: '📝',
    color: 'var(--color-success)',
  },
  {
    id: 'evt_3',
    student_id: 'student_1',
    type: 'MARK',
    date: '2026-06-17T11:00:00Z',
    title: 'Scored 92% in Chemistry Mid-Term',
    description: 'Ranked 3rd in class.',
    icon: '📊',
    color: 'var(--color-secondary)',
  },
  {
    id: 'evt_4',
    student_id: 'student_1',
    type: 'REMARK',
    date: '2026-06-16T14:20:00Z',
    title: 'Behavioral Observation',
    description: '"John showed great leadership during the group science project today." - Mrs. Davis',
    icon: '🗣️',
    color: 'var(--color-warning)',
  },
  {
    id: 'evt_5',
    student_id: 'student_1',
    type: 'ATTENDANCE',
    date: '2026-06-15T08:00:00Z',
    title: 'Marked Absent',
    description: 'Parent notified via push notification.',
    icon: '📅',
    color: 'var(--color-danger)',
  },
];

export const mockInsights = {
  student_1: {
    summary: "John is currently showing a strong academic trend with an average exam percentage of 88%. Daily homework completions and behavior scores place him in the upper quartile of Grade 10.",
    strengths: [
      "Excellent participation rates in project works.",
      "Exceptional behavior rating indices.",
      "Logical deduction skills in Mathematics."
    ],
    weaknesses: [
      "A slight drop-off in science quiz submission rates."
    ],
    recommendation: "Provide advanced worksheets in Computer Science to nourish their innovation interest. Schedule weekly checks on pending science worksheets to keep submission metrics high."
  },
  student_2: {
    summary: "Sarah's attendance has dipped recently, affecting her average marks. She remains highly engaged when present.",
    strengths: [
      "Great creative writing skills in English.",
      "Positive peer interactions."
    ],
    weaknesses: [
      "Recent absences are causing missed core math concepts.",
      "Asthma occasionally limits sports participation."
    ],
    recommendation: "Share recorded math lessons with parents to help Sarah catch up. Monitor health during PE."
  }
};

export const mockPortfolio = [
  {
    id: 'port_1',
    student_id: 'student_1',
    title: 'Regional Science Fair Winner',
    date: 'May 2026',
    type: 'Certificate',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'port_2',
    student_id: 'student_1',
    title: 'Art Exhibition Entry',
    date: 'April 2026',
    type: 'Project',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
  },
];
