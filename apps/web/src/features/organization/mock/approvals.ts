export interface PendingApproval {
  id: string;
  type: 'Branch Creation' | 'Principal Assignment' | 'Budget Approval' | 'Leave Approval' | 'Fee Waiver' | 'Purchase Request' | 'Transfer Request';
  branchName: string;
  requestBy: string;
  details: string;
  date: string;
  amount?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const mockApprovals: PendingApproval[] = [
  {
    id: 'app-1',
    type: 'Budget Approval',
    branchName: 'Koramangala Branch',
    requestBy: 'Rajesh Kumar (Principal)',
    details: 'Requesting ₹4.5L for Biology Lab upgrade equipment and ventilation renovations.',
    date: 'July 15, 2026',
    amount: '₹4,50,000',
    status: 'PENDING'
  },
  {
    id: 'app-2',
    type: 'Principal Assignment',
    branchName: 'Whitefield Branch',
    requestBy: 'Sunita Desai (Academic VP)',
    details: 'Assign Rajesh Kumar to temporary oversight of Whitefield academic transition.',
    date: 'July 14, 2026',
    status: 'PENDING'
  },
  {
    id: 'app-3',
    type: 'Fee Waiver',
    branchName: 'Indiranagar Branch',
    requestBy: 'Anil Mehta (Admissions)',
    details: 'Requesting 50% waiver for merit-scholarship student Ananya Sharma (Grade 11).',
    date: 'July 16, 2026',
    amount: '₹65,000',
    status: 'PENDING'
  },
  {
    id: 'app-4',
    type: 'Purchase Request',
    branchName: 'Yelahanka Branch',
    requestBy: 'Ravi Sharma (School Admin)',
    details: 'Requesting purchase of 15 desktop computers for primary ICT lab.',
    date: 'July 13, 2026',
    amount: '₹3,20,000',
    status: 'PENDING'
  }
];
