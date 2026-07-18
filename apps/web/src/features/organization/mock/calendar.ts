export interface CalendarEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  detail: string;
  cat: 'Finance' | 'Academics' | 'HR' | 'Audit' | 'General' | 'Event';
  color: string;
  bg: string;
}

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e-1',
    day: '18',
    month: 'JUL',
    title: 'Q1 Executive Budget Review Meeting',
    detail: 'Jul 18, 2026 • 2:00 PM • Executive Boardroom (Online)',
    cat: 'Finance',
    color: '#8b5cf6',
    bg: '#f5f3ff'
  },
  {
    id: 'e-2',
    day: '25',
    month: 'JUL',
    title: 'Consolidated Academic Syllabus Review',
    detail: 'Jul 25, 2026 • 10:00 AM • Main Conference Hall',
    cat: 'Academics',
    color: '#10b981',
    bg: '#ecfdf5'
  },
  {
    id: 'e-3',
    day: '02',
    month: 'AUG',
    title: 'Consolidated IT & Security Compliance Audit',
    detail: 'Aug 02, 2026 • 11:30 AM • Tech Command Center',
    cat: 'Audit',
    color: '#f59e0b',
    bg: '#fffbeb'
  },
  {
    id: 'e-4',
    day: '15',
    month: 'AUG',
    title: 'Independence Day National Holiday',
    detail: 'Aug 15, 2026 • All Day Celebration',
    cat: 'General',
    color: '#3b82f6',
    bg: '#eff6ff'
  },
  {
    id: 'e-5',
    day: '20',
    month: 'AUG',
    title: 'Parent Teacher Association Meeting (PTM)',
    detail: 'Aug 20, 2026 • 9:00 AM • Respective Classrooms',
    cat: 'Event',
    color: '#ec4899',
    bg: '#fdf2f8'
  }
];
