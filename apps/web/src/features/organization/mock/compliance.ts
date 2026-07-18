export interface ComplianceRecord {
  govRecognition: 'Valid' | 'Pending Renewal' | 'Expired';
  fireSafety: string; // Expiry description
  buildingCert: 'Valid' | 'Pending Renewal' | 'Expired';
  busFitness: string;
  staffVerificationPercent: number;
  documentCompletionPercent: number;
  auditStatus: 'Pending' | 'Completed' | 'In Progress';
}

export const mockCompliance: Record<string, ComplianceRecord> = {
  overall: {
    govRecognition: 'Valid',
    fireSafety: 'Expires 12 Days (Indiranagar)',
    buildingCert: 'Valid',
    busFitness: 'Pending (8 Buses)',
    staffVerificationPercent: 96,
    documentCompletionPercent: 88,
    auditStatus: 'In Progress'
  }
};

export const mockComplianceChecks = [
  { item: 'Fire safety inspection renewal', branch: 'Indiranagar Branch', status: 'Expires 12 Days', severity: 'critical' },
  { item: 'Government recognition certificate', branch: 'All Branches', status: 'Valid', severity: 'success' },
  { item: 'Bus RTO fitness assessment', branch: 'Koramangala Branch', status: 'Overdue (3 Buses)', severity: 'warning' },
  { item: 'Staff background checks', branch: 'Whitefield Branch', status: '96% Complete', severity: 'warning' },
  { item: 'IT Infrastructure audit', branch: 'Yelahanka Branch', status: 'Pending', severity: 'info' }
];
