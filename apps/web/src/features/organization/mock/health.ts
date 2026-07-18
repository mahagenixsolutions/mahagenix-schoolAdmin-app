export interface HealthMetric {
  overall: number;
  academics: number;
  finance: number;
  operations: number;
  compliance: number;
  infrastructure: number;
  hr: number;
  studentSatisfaction: number;
  parentSatisfaction: number;
  teacherSatisfaction: number;
}

export const mockHealth: HealthMetric = {
  overall: 88.5,
  academics: 92.6,
  finance: 85.3,
  operations: 90.2,
  compliance: 84.1,
  infrastructure: 89.0,
  hr: 87.5,
  studentSatisfaction: 92,
  parentSatisfaction: 89,
  teacherSatisfaction: 94
};
