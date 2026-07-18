import { useOrganizationDashboard } from '../../hooks/useOrganizationDashboard';

// Subcomponents
import DashboardHeader from './DashboardHeader';
import DashboardFilters from './DashboardFilters';
import DashboardQuickActions from './DashboardQuickActions';
import DashboardKPIs from './DashboardKPIs';
import DashboardCharts from './DashboardCharts';
import OrganizationHealth from './OrganizationHealth';
import AICopilotPanel from './AICopilotPanel';
import BranchRanking from './BranchRanking';
import PendingApprovals from './PendingApprovals';
import RiskCompliance from './RiskCompliance';
import AlertsCenter from './AlertsCenter';
import AcademicCommandCenter from './AcademicCommandCenter';
import FinancialCommandCenter from './FinancialCommandCenter';
import TimelineActivities from './TimelineActivities';
import CommunicationCalendar from './CommunicationCalendar';
import DashboardPreferences from './DashboardPreferences';

export default function OrgDashboardIndex() {
  const {
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
  } = useOrganizationDashboard();

  const handleActionClick = (type: string) => {
    if (type === 'branding') {
      window.location.href = '/org/branding';
    } else {
      alert(`Executive Action: ${type.replace('-', ' ').toUpperCase()} initiated.`);
    }
  };

  const handleAIActionClick = (id: string, action: string) => {
    alert(`Copilot action "${action}" triggered for recommendation reference: ${id}`);
  };

  const spacing = preferences.compactMode ? '16px' : '24px';
  const gridItemSpacing = preferences.compactMode ? '12px' : '20px';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
        padding: '24px 0',
        fontFamily: 'Inter, sans-serif',
        background: '#f8fafc',
        minHeight: '100vh',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Header */}
      <DashboardHeader
        onOpenPreferences={() => setPreferencesOpen(true)}
        onGenerateReport={() => alert('Generating Executive Report PDF... Check downloads shortly.')}
        onExportExcel={() => alert('Exporting raw dataset payload... Check downloads shortly.')}
      />

      {/* 2. Smart Filters */}
      <DashboardFilters
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        onResultClick={(to) => {
          window.location.href = to;
        }}
      />

      {/* Preferences Drawer */}
      <DashboardPreferences
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        preferences={preferences}
        setPreferences={setPreferences}
      />

      {/* 3. Tab Selectors */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { key: 'overview', label: 'Executive Overview' },
          { key: 'academics', label: 'Academics Control' },
          { key: 'financial', label: 'Financial Control' },
          { key: 'operations', label: 'Operations & Safety' },
          { key: 'timeline', label: 'System Logs' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid var(--color-primary)' : '2px solid transparent',
              background: 'transparent',
              color: activeTab === tab.key ? 'var(--color-primary)' : '#64748b',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Renderers */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          {/* Quick Command & Alerts Area */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: gridItemSpacing }}>
            <DashboardQuickActions onActionClick={handleActionClick} />
            <AlertsCenter />
          </div>

          {/* Grouped KPIs & Health Scoring */}
          {preferences.favoriteWidgets.includes('health') && (
            <OrganizationHealth healthMetrics={healthMetrics} />
          )}

          {preferences.favoriteWidgets.includes('ai-insights') && (
            <AICopilotPanel insights={aiInsights} onActionClick={handleAIActionClick} />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: gridItemSpacing }}>
            {preferences.favoriteWidgets.includes('finance') && (
              <DashboardKPIs
                onKPIClick={handleKPIClick}
                academicData={academicData}
                financialData={financialData}
                complianceData={complianceData}
              />
            )}
            <DashboardCharts financialData={financialData} academicData={academicData} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: gridItemSpacing }}>
            {preferences.favoriteWidgets.includes('rankings') && (
              <BranchRanking rankings={rankings} onCompare={(id1, id2) => alert(`Comparing ${id1} and ${id2}`)} />
            )}
            {preferences.favoriteWidgets.includes('calendar') && (
              <CommunicationCalendar events={calendarEvents} />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: gridItemSpacing }}>
            <PendingApprovals approvals={pendingApprovals} onApprove={approveRequest} onReject={rejectRequest} />
            <RiskCompliance complianceData={complianceData} />
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <AcademicCommandCenter academicData={academicData} />
      )}

      {activeTab === 'financial' && (
        <FinancialCommandCenter financialData={financialData} />
      )}

      {activeTab === 'operations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          <RiskCompliance complianceData={complianceData} />
          <PendingApprovals approvals={pendingApprovals} onApprove={approveRequest} onReject={rejectRequest} />
        </div>
      )}

      {activeTab === 'timeline' && (
        <TimelineActivities timelineLogs={timelineLogs} />
      )}
    </div>
  );
}
