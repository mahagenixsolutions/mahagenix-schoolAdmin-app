import type { RoleDashboardConfig } from './types';

export const transportDashboard: RoleDashboardConfig = {
  roleLabel: 'Transport Manager',
  roleColor: '#0284C7',
  greeting: "Here's your fleet overview.",
  stats: [
    {
      label: 'Active Routes',
      value: 18,
      icon: '🛣️',
      color: 'primary',
      change: 'All operational',
      changeDir: 'up',
    },
    {
      label: 'Vehicles',
      value: 24,
      icon: '🚌',
      color: 'info',
      change: '2 in maintenance',
      changeDir: 'neutral',
    },
    {
      label: 'Drivers On Duty',
      value: 20,
      icon: '👨‍✈️',
      color: 'success',
      change: '2 on leave',
      changeDir: 'neutral',
    },
    {
      label: 'GPS Alerts',
      value: 3,
      icon: '📡',
      color: 'warning',
      change: '1 speed violation',
      changeDir: 'down',
    },
    {
      label: 'Students Using',
      value: 684,
      icon: '👨‍🎓',
      color: 'violet',
      change: '55% of total',
      changeDir: 'neutral',
    },
    {
      label: 'Maintenance Due',
      value: 4,
      icon: '🔧',
      color: 'danger',
      change: '2 this week',
      changeDir: 'down',
    },
  ],
  quickActions: [
    { label: 'Assign Route', icon: '🛣️', to: '/transport', color: '#0284C7' },
    { label: 'View Tracking', icon: '📡', to: '/transport', color: '#10B981' },
    { label: 'Report Incident', icon: '⚠️', to: '/transport', color: '#EF4444' },
  ],
  activities: [
    {
      id: 'tr1',
      text: 'Bus KA-01-AB-1234 completed morning route',
      time: '30 min ago',
      icon: '✅',
      type: 'success',
    },
    {
      id: 'tr2',
      text: 'Speed alert: Bus KA-01-CD-5678 (72 km/h in school zone)',
      time: '45 min ago',
      icon: '⚠️',
      type: 'warning',
    },
    {
      id: 'tr3',
      text: 'Driver Ramesh assigned to Route 7 (substitute)',
      time: '1 hour ago',
      icon: '🔄',
      type: 'info',
    },
    {
      id: 'tr4',
      text: 'Vehicle KA-01-EF-9012 sent for servicing',
      time: '3 hours ago',
      icon: '🔧',
      type: 'info',
    },
    {
      id: 'tr5',
      text: 'Fuel log updated for 18 vehicles',
      time: '5 hours ago',
      icon: '⛽',
      type: 'success',
    },
  ],
  widgets: [
    {
      id: 'route-status',
      title: 'Route Status',
      type: 'status',
      items: [
        { label: 'Route 1 — Koramangala', value: 'Completed', status: 'success', icon: '🟢' },
        { label: 'Route 5 — Whitefield', value: 'In Transit', status: 'info', icon: '🔵' },
        { label: 'Route 12 — Electronic City', value: 'Delayed', status: 'warning', icon: '🟡' },
        { label: 'Route 18 — Yelahanka', value: 'Completed', status: 'success', icon: '🟢' },
      ],
    },
    {
      id: 'maintenance',
      title: 'Upcoming Maintenance',
      type: 'list',
      items: [
        { label: 'Bus KA-01-GH-3456 — Oil change', value: 'Jul 18', status: 'warning' },
        { label: 'Bus KA-01-IJ-7890 — Tire replacement', value: 'Jul 20', status: 'warning' },
        { label: 'Bus KA-01-KL-2345 — Annual inspection', value: 'Jul 25', status: 'info' },
      ],
    },
  ],
};

export interface BusData {
  id: string;
  busNumber: string;
  vehicleReg: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DELAYED';
  driverName: string;
  driverPhone: string;
  speed: number;
  capacity: string;
  fuelLevel: string;
  gpsStatus: string;
  branch: string;
}

export const mockBuses: BusData[] = [
  {
    id: 'b1',
    busNumber: 'Bus 1',
    vehicleReg: 'KA-01-AB-1234',
    status: 'ACTIVE',
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 98765 43210',
    speed: 42,
    capacity: '38 / 50',
    fuelLevel: '78%',
    gpsStatus: 'Signal Strong',
    branch: 'Koramangala Branch',
  },
  {
    id: 'b2',
    busNumber: 'Bus 5',
    vehicleReg: 'KA-01-CD-5678',
    status: 'DELAYED',
    driverName: 'Suresh Singh',
    driverPhone: '+91 98765 43211',
    speed: 0,
    capacity: '42 / 50',
    fuelLevel: '45%',
    gpsStatus: 'Signal Weak',
    branch: 'Koramangala Branch',
  },
  {
    id: 'b3',
    busNumber: 'Bus 9',
    vehicleReg: 'KA-01-EF-9012',
    status: 'MAINTENANCE',
    driverName: 'Mohan Lal',
    driverPhone: '+91 98765 43212',
    speed: 0,
    capacity: '0 / 50',
    fuelLevel: '92%',
    gpsStatus: 'Offline',
    branch: 'Koramangala Branch',
  },
  {
    id: 'b4',
    busNumber: 'Bus 12',
    vehicleReg: 'KA-01-GH-3456',
    status: 'ACTIVE',
    driverName: 'Vijay Yadav',
    driverPhone: '+91 98765 43213',
    speed: 55,
    capacity: '48 / 50',
    fuelLevel: '60%',
    gpsStatus: 'Signal Strong',
    branch: 'Whitefield Branch',
  },
];

export const mockRoutes = [
  { id: 'r1', routeName: 'Route 1 — Koramangala Layout', stops: 8, studentCount: 38, status: 'Active' },
  { id: 'r2', routeName: 'Route 5 — Whitefield Circle', stops: 12, studentCount: 42, status: 'Active' },
  { id: 'r3', routeName: 'Route 12 — Electronic City Ph 1', stops: 6, studentCount: 22, status: 'Delayed' },
];

export const mockDrivers = [
  { id: 'd1', name: 'Ramesh Kumar', phone: '+91 98765 43210', rating: 4.8, experience: '6 Years' },
  { id: 'd2', name: 'Suresh Singh', phone: '+91 98765 43211', rating: 4.5, experience: '4 Years' },
  { id: 'd3', name: 'Mohan Lal', phone: '+91 98765 43212', rating: 4.2, experience: '8 Years' },
];

