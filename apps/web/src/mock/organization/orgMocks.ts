export interface BranchData {
  id: string;
  name: string;
  logo: string;
  principal: string;
  vicePrincipal: string;
  location: string;
  students: number;
  teachers: number;
  nonTeaching: number;
  parents: number;
  attendance: string;
  revenue: string;
  expenses: string;
  performanceScore: string;
  status: 'Active' | 'Inactive';
  recentActivities: string[];
  announcements: string[];
}

export interface OrgAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  branches: string[]; // branch IDs or 'All'
  author: string;
}

export interface OrgDocument {
  id: string;
  title: string;
  category: string;
  date: string;
  size: string;
}

export interface OrgAuditLog {
  id: string;
  action: string;
  user: string;
  time: string;
  details: string;
}

export const orgMocks = {
  stats: [
    { label: 'Total Branches', value: '24', icon: '🏢', color: 'primary', trend: '↑ 4 vs last month', trendType: 'success' },
    { label: 'Active Branches', value: '22', icon: '✅', color: 'success', trend: '91.7% of total', trendType: 'success' },
    { label: 'Total Students', value: '12,540', icon: '👨‍🎓', color: 'info', trend: '↑ 8.3% vs last month', trendType: 'success' },
    { label: 'Total Teachers', value: '1,286', icon: '👩‍🏫', color: 'warning', trend: '↑ 5.6% vs last month', trendType: 'success' },
    { label: 'Non Teaching Staff', value: '856', icon: '🧑‍💼', color: 'orange', trend: '↑ 4.2% vs last month', trendType: 'success' },
    { label: 'Total Parents', value: '18,430', icon: '👥', color: 'violet', trend: '↑ 9.1% vs last month', trendType: 'success' },
    { label: 'Organization Revenue', value: '₹12.45 Cr', icon: '💰', color: 'warning', trend: '↑ 12.7% vs last month', trendType: 'success' },
    { label: 'Pending Fees', value: '₹3.72 Cr', icon: '⏳', color: 'danger', trend: '↑ 6.4% vs last month', trendType: 'danger' },
    { label: 'Attendance (Avg.)', value: '94.6%', icon: '📋', color: 'info', trend: '↑ 3.6% vs last month', trendType: 'success' },
    { label: 'Organization Performance', value: '88.5%', icon: '📈', color: 'primary', trend: '↑ 5.3% vs last month', trendType: 'success' },
  ],

  branches: [
    {
      id: 'branch-koramangala',
      name: 'Koramangala Branch',
      logo: '🏫',
      principal: 'Rajesh Kumar',
      vicePrincipal: 'Sunita Desai',
      location: 'Bangalore South',
      students: 1248,
      teachers: 82,
      nonTeaching: 74,
      parents: 1100,
      attendance: '94.2%',
      revenue: '₹85,00,000',
      expenses: '₹68,20,000',
      performanceScore: '87%',
      status: 'Active',
      recentActivities: [
        'Mrs. Nisha Rao submitted Class 5A report cards',
        'Annual sports day event scheduled for Aug 15',
        'Low attendance alert: Class 8B (72%)',
      ],
      announcements: ['Mid-Term Exam Seating Arrangement published', 'PTM rescheduled to Aug 2'],
    },
    {
      id: 'branch-whitefield',
      name: 'Whitefield Branch',
      logo: '🏫',
      principal: 'Farhan Ali',
      vicePrincipal: 'Farida Khan',
      location: 'Bangalore East',
      students: 850,
      teachers: 60,
      nonTeaching: 30,
      parents: 650,
      attendance: '95.1%',
      revenue: '₹42,00,000',
      expenses: '₹34,10,000',
      performanceScore: '91%',
      status: 'Active',
      recentActivities: [
        'New science laboratory equipment installed',
        'PTA general body meeting completed',
        'Mock drills for emergency evacuations conducted',
      ],
      announcements: [
        'Quarterly syllabus coverage update due next Friday',
        'Inter-school debate selection trial begins tomorrow',
      ],
    },
    {
      id: 'branch-yelahanka',
      name: 'Yelahanka Branch',
      logo: '🏫',
      principal: 'Sunita Desai',
      vicePrincipal: 'Anita Desai',
      location: 'Bangalore North',
      students: 442,
      teachers: 38,
      nonTeaching: 16,
      parents: 350,
      attendance: '93.9%',
      revenue: '₹18,00,000',
      expenses: '₹14,70,000',
      performanceScore: '85%',
      status: 'Active',
      recentActivities: [
        'Cleanliness drive organized by green club',
        'Library subscription renewed for international journals',
        'First Aid training session conducted for middle school',
      ],
      announcements: [
        'Holiday declared on July 23 for local festival',
        'Vaccination camp consent forms due by Wednesday',
      ],
    },
  ] as BranchData[],

  principals: [
    {
      name: 'Rajesh Kumar',
      branch: 'Koramangala Branch',
      email: 'rajesh.kumar@edutrack.demo',
      phone: '+91 98765 41021',
      experience: '12 years',
      rating: '8.7/10',
      photo: 'https://api.dicebear.com/8.x/initials/svg?seed=Rajesh-Kumar',
    },
    {
      name: 'Farhan Ali',
      branch: 'Whitefield Branch',
      email: 'farhan.ali@edutrack.demo',
      phone: '+91 98765 42002',
      experience: '8 years',
      rating: '9.1/10',
      photo: 'https://api.dicebear.com/8.x/initials/svg?seed=Farhan-Ali',
    },
    {
      name: 'Sunita Desai',
      branch: 'Yelahanka Branch',
      email: 'sunita.desai@edutrack.demo',
      phone: '+91 98765 41005',
      experience: '10 years',
      rating: '8.5/10',
      photo: 'https://api.dicebear.com/8.x/initials/svg?seed=Sunita-Desai',
    },
  ],

  announcements: [
    {
      id: '1',
      title: 'Uniform Syllabus and Grading Guidelines',
      content:
        'This circular sets the guideline for standard syllabus progress checks starting August.',
      date: 'July 14, 2026',
      branches: ['All'],
      author: 'Vikram Singhania',
    },
    {
      id: '2',
      title: 'Principal Evaluation Portal Open',
      content: 'Annual performance evaluations for Q1 are open. Please upload reports.',
      date: 'July 10, 2026',
      branches: ['branch-koramangala', 'branch-whitefield'],
      author: 'Vikram Singhania',
    },
  ] as OrgAnnouncement[],

  documents: [
    {
      id: 'doc-1',
      title: 'Organization Affiliation Certificate 2026',
      category: 'Affiliations',
      date: 'Jan 15, 2026',
      size: '2.4 MB',
    },
    {
      id: 'doc-2',
      title: 'Government Education Board Approvals',
      category: 'Government Approvals',
      date: 'Mar 10, 2026',
      size: '4.8 MB',
    },
    {
      id: 'doc-3',
      title: 'Consolidated Tax & PAN Filings FY25',
      category: 'Tax Documents',
      date: 'May 02, 2026',
      size: '1.2 MB',
    },
    {
      id: 'doc-4',
      title: 'Group Education Safety Policies',
      category: 'Policies',
      date: 'Jun 20, 2026',
      size: '840 KB',
    },
  ] as OrgDocument[],

  auditLogs: [
    {
      id: 'aud-1',
      action: 'Branding Updated',
      user: 'Vikram Singhania',
      time: '1 hour ago',
      details: 'Changed primary theme hex to #4F8EF7',
    },
    {
      id: 'aud-2',
      action: 'Announcement Published',
      user: 'Vikram Singhania',
      time: '2 hours ago',
      details: 'Sent "Uniform Syllabus" to all branches',
    },
    {
      id: 'aud-3',
      action: 'Branch Created',
      user: 'System (Auto)',
      time: '5 days ago',
      details: 'Successfully initialized Yelahanka Branch',
    },
    {
      id: 'aud-4',
      action: 'Subscription Renewed',
      user: 'Accounts Auto',
      time: '10 days ago',
      details: 'Enterprise Plan renewed for 12 months',
    },
  ] as OrgAuditLog[],

  subscription: {
    plan: 'Enterprise Platinum',
    modulesEnabled: [
      'Student ERP',
      'Finance & Fees',
      'HR & Payroll',
      'Smart Library',
      'Live Transport Tracker',
      'Hostel Mess Control',
      'AI Intelligent Insights',
    ],
    storageUsage: '324 GB of 500 GB (64.8%)',
    userCount: '2,847 Active Users (Unlimited license)',
    renewalDate: 'July 05, 2027',
    invoices: [
      { id: 'INV-ORG-001', amount: '₹14,50,000', date: 'Jul 05, 2026', status: 'Paid' },
      { id: 'INV-ORG-000', amount: '₹12,80,000', date: 'Jul 05, 2025', status: 'Paid' },
    ],
  },

  branding: {
    logoUrl: 'https://api.dicebear.com/8.x/shapes/svg?seed=OrgLogo',
    faviconUrl: 'https://api.dicebear.com/8.x/shapes/svg?seed=Fav',
    loginBgUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    websiteBannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
    primaryColor: '#4F8EF7',
    secondaryColor: '#22C55E',
    accentColor: '#8B5CF6',
  },
};
