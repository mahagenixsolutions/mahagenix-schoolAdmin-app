import { useState, useMemo } from 'react';
import { OrganizationDashboardService } from '../services/organizationDashboard.service';

export interface DashboardFiltersState {
  academicYear: string;
  board: string;
  region: string;
  city: string;
  status: string;
  dateRange: string;
}

export function useOrganizationDashboard() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Preferences side drawer
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);
  const [preferences, setPreferences] = useState({
    compactMode: false,
    defaultBranch: 'All Branches',
    refreshInterval: 'Manual',
    favoriteWidgets: ['health', 'finance', 'ai-insights', 'rankings', 'calendar']
  });

  // Global filters
  const [filters, setFilters] = useState<DashboardFiltersState>({
    academicYear: '2026-27',
    board: 'All Boards',
    region: 'All Regions',
    city: 'All Cities',
    status: 'All',
    dateRange: 'This Month'
  });

  // Local state for approvals (to simulate live action approval/rejection)
  const [pendingApprovals, setPendingApprovals] = useState(() => 
    OrganizationDashboardService.getPendingApprovals()
  );

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    return OrganizationDashboardService.searchOrganization(searchQuery);
  }, [searchQuery]);

  // Handle drill down logic
  const handleKPIClick = (kpiCategory: 'academic' | 'finance' | 'operations' | 'compliance') => {
    if (kpiCategory === 'academic') {
      setActiveTab('academics');
    } else if (kpiCategory === 'finance') {
      setActiveTab('financial');
    } else if (kpiCategory === 'operations') {
      setActiveTab('operations');
    } else if (kpiCategory === 'compliance') {
      setActiveTab('compliance');
    }
  };

  // Action methods
  const approveRequest = (id: string) => {
    setPendingApprovals(prev => prev.map(app => app.id === id ? { ...app, status: 'APPROVED' } : app));
    alert('Request approved successfully');
  };

  const rejectRequest = (id: string) => {
    setPendingApprovals(prev => prev.map(app => app.id === id ? { ...app, status: 'REJECTED' } : app));
    alert('Request rejected successfully');
  };

  // Filtered datasets based on selected filters (Region, City, Board)
  const rankings = useMemo(() => {
    let list = OrganizationDashboardService.getBranchRankings();
    if (filters.region !== 'All Regions') {
      list = list.filter(b => b.region === filters.region);
    }
    if (filters.city !== 'All Cities') {
      list = list.filter(b => b.city === filters.city);
    }
    if (filters.board !== 'All Boards') {
      list = list.filter(b => b.board === filters.board);
    }
    return list;
  }, [filters.region, filters.city, filters.board]);

  const timelineLogs = useMemo(() => {
    return OrganizationDashboardService.getTimelineLogs();
  }, []);

  const academicData = OrganizationDashboardService.getAcademicData();
  const financialData = OrganizationDashboardService.getFinancialData();
  const aiInsights = OrganizationDashboardService.getAIInsights();
  const complianceData = OrganizationDashboardService.getComplianceData();
  const healthMetrics = OrganizationDashboardService.getHealthMetrics();
  const calendarEvents = OrganizationDashboardService.getCalendarEvents();

  return {
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    preferencesOpen,
    setPreferencesOpen,
    preferences,
    setPreferences,
    pendingApprovals,
    approveRequest,
    rejectRequest,
    searchQuery,
    setSearchQuery,
    searchResults,
    handleKPIClick,
    rankings,
    timelineLogs,
    academicData,
    financialData,
    aiInsights,
    complianceData,
    healthMetrics,
    calendarEvents
  };
}
