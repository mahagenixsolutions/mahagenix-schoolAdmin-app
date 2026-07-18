export interface ActivityLog {
  id: string;
  time: string;
  user: string;
  branch: string;
  action: string;
  status: 'SUCCESS' | 'WARNING' | 'PENDING';
  category: 'academic' | 'finance' | 'hr' | 'transport' | 'administration';
}

export const mockTimeline: ActivityLog[] = [
  {
    id: 't-1',
    time: '09:30 AM',
    user: 'Rajesh Kumar (Principal)',
    branch: 'Koramangala Branch',
    action: 'Approved class timetable overrides for Term 2',
    status: 'SUCCESS',
    category: 'academic'
  },
  {
    id: 't-2',
    time: '10:15 AM',
    user: 'Amit Patel (Finance Officer)',
    branch: 'Whitefield Branch',
    action: 'Consolidated monthly collections of ₹12.4 Lakhs',
    status: 'SUCCESS',
    category: 'finance'
  },
  {
    id: 't-3',
    time: '11:00 AM',
    user: 'Vijay Yadav (Transport Incharge)',
    branch: 'Koramangala Branch',
    action: 'Reported GPS offline alert on Bus 9',
    status: 'WARNING',
    category: 'transport'
  },
  {
    id: 't-4',
    time: '01:45 PM',
    user: 'Sunita Desai (Academic VP)',
    branch: 'Indiranagar Branch',
    action: 'Submitted compliance documents for audit check',
    status: 'PENDING',
    category: 'administration'
  },
  {
    id: 't-5',
    time: '03:30 PM',
    user: 'Ravi Sharma (School Admin)',
    branch: 'Yelahanka Branch',
    action: 'Hired 2 contract teachers for Primary Classes',
    status: 'SUCCESS',
    category: 'hr'
  }
];
