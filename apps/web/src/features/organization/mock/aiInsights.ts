export interface AIInsight {
  id: string;
  type: 'achievement' | 'warning' | 'prediction' | 'recommendation';
  text: string;
  badge: string;
  color: string;
  bg: string;
  actions: { label: string; action: string }[];
}

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ai-1',
    type: 'prediction',
    text: 'Revenue is projected to increase by 8.5% next quarter due to early admissions rise in Bangalore East.',
    badge: 'Growth Forecast',
    color: '#3b82f6',
    bg: '#eff6ff',
    actions: [{ label: 'View Projection Details', action: 'view-projection' }, { label: 'Dismiss', action: 'dismiss' }]
  },
  {
    id: 'ai-2',
    type: 'achievement',
    text: 'Koramangala Branch has become the top-performing branch with a 96.8% overall quality health scorecard score.',
    badge: 'Milestone Met',
    color: '#10b981',
    bg: '#ecfdf5',
    actions: [{ label: 'Send Congratulations', action: 'send-kudos' }, { label: 'Dismiss', action: 'dismiss' }]
  },
  {
    id: 'ai-3',
    type: 'warning',
    text: 'Whitefield student attendance has declined by 4.2% MoM. English classrooms report highest absenteeism.',
    badge: 'High Severity Alert',
    color: '#ef4444',
    bg: '#fef2f2',
    actions: [{ label: 'Assign Audit Task', action: 'assign-audit' }, { label: 'Open Attendance View', action: 'view-attendance' }]
  },
  {
    id: 'ai-4',
    type: 'recommendation',
    text: 'Two branches (Whitefield, Yelahanka) require additional Senior Mathematics teachers to fill vacant roles.',
    badge: 'Staff Recommendation',
    color: '#a855f7',
    bg: '#f5f3ff',
    actions: [{ label: 'Approve Job Openings', action: 'approve-jobs' }, { label: 'Assign recruiter', action: 'assign-hr' }]
  },
  {
    id: 'ai-5',
    type: 'warning',
    text: 'The mandatory building fire safety compliance cert for Indiranagar Branch expires in 12 days.',
    badge: 'Compliance Expiry',
    color: '#f59e0b',
    bg: '#fffbeb',
    actions: [{ label: 'Renew Certificate', action: 'renew-cert' }, { label: 'Notify Principal', action: 'notify-principal' }]
  }
];
