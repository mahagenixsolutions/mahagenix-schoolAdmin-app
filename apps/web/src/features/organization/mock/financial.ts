export interface FinancialMetric {
  revenue: number;
  expenses: number;
  profit: number;
  pendingFees: number;
  monthlyCollection: number;
  salaryExpenses: number;
  operationalCost: number;
  transportCost: number;
  collectionRate: number;
}

export const mockFinancial: FinancialMetric = {
  revenue: 8500000,
  expenses: 6820000,
  profit: 1680000,
  pendingFees: 420000,
  monthlyCollection: 900000,
  salaryExpenses: 4200000,
  operationalCost: 1800000,
  transportCost: 820000,
  collectionRate: 95.3
};

export const mockMonthlyTrends = [
  { month: 'Jan', revenue: 7800000, expenses: 6200000, profit: 1600000 },
  { month: 'Feb', revenue: 8100000, expenses: 6300000, profit: 1800000 },
  { month: 'Mar', revenue: 8400000, expenses: 6500000, profit: 1900000 },
  { month: 'Apr', revenue: 7900000, expenses: 6400000, profit: 1500000 },
  { month: 'May', revenue: 8200000, expenses: 6600000, profit: 1600000 },
  { month: 'Jun', revenue: 8500000, expenses: 6820000, profit: 1680000 }
];

export const mockBranchRevenue = [
  { branch: 'Koramangala Branch', revenue: 3500000, collected: 3300000, pending: 200000 },
  { branch: 'Whitefield Branch', revenue: 2800000, collected: 2500000, pending: 300000 },
  { branch: 'Indiranagar Branch', revenue: 2200000, collected: 2100000, pending: 100000 }
];
