export interface BranchRank {
  id: string;
  rank: number;
  name: string;
  healthScore: number;
  attendanceRate: number;
  revenue: number;
  examPassRate: number;
  studentGrowth: number;
  staffSatisfaction: number;
  region: 'North' | 'South' | 'East' | 'West';
  city: 'Bangalore' | 'Hyderabad';
  board: 'CBSE' | 'ICSE';
}

export const mockRankings: BranchRank[] = [
  {
    id: 'b-1',
    rank: 1,
    name: 'Koramangala Branch',
    healthScore: 96.8,
    attendanceRate: 95.8,
    revenue: 3500000,
    examPassRate: 92.5,
    studentGrowth: 8.5,
    staffSatisfaction: 94,
    region: 'South',
    city: 'Bangalore',
    board: 'CBSE'
  },
  {
    id: 'b-2',
    rank: 2,
    name: 'Whitefield Branch',
    healthScore: 94.2,
    attendanceRate: 91.2,
    revenue: 2800000,
    examPassRate: 89.0,
    studentGrowth: 4.2,
    staffSatisfaction: 92,
    region: 'East',
    city: 'Bangalore',
    board: 'CBSE'
  },
  {
    id: 'b-3',
    rank: 3,
    name: 'HSR Layout Branch',
    healthScore: 92.1,
    attendanceRate: 94.0,
    revenue: 2200000,
    examPassRate: 91.2,
    studentGrowth: 6.8,
    staffSatisfaction: 89,
    region: 'South',
    city: 'Bangalore',
    board: 'ICSE'
  },
  {
    id: 'b-4',
    rank: 4,
    name: 'Indiranagar Branch',
    healthScore: 90.3,
    attendanceRate: 88.5,
    revenue: 1900000,
    examPassRate: 85.0,
    studentGrowth: 2.1,
    staffSatisfaction: 86,
    region: 'East',
    city: 'Bangalore',
    board: 'ICSE'
  },
  {
    id: 'b-5',
    rank: 5,
    name: 'Gachibowli Branch',
    healthScore: 88.6,
    attendanceRate: 92.4,
    revenue: 1750000,
    examPassRate: 87.6,
    studentGrowth: 5.4,
    staffSatisfaction: 88,
    region: 'North',
    city: 'Hyderabad',
    board: 'CBSE'
  }
];
