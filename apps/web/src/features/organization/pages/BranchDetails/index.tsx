import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockBranchDetails } from './mockData';

// Subcomponents
import BranchHeader from './BranchHeader';
import BranchQuickActions from './BranchQuickActions';
import BranchKPIs from './BranchKPIs';

// Tabs Views
import BranchHealthCard from './overview/BranchHealthCard';
import AIInsightsCard from './overview/AIInsightsCard';
import BranchInformation from './overview/BranchInformation';
import BranchComparison from './overview/BranchComparison';
import RecentTimeline from './overview/RecentTimeline';
import Announcements from './overview/Announcements';

import AcademicInsights from './academics/AcademicInsights';
import FinancialSummary from './finance/FinancialSummary';
import PeopleSummary from './people/PeopleSummary';
import OperationsSummary from './operations/OperationsSummary';
import DocumentsSummary from './documents/DocumentsSummary';
import SettingsSummary from './settings/SettingsSummary';

type TabKey =
  | 'overview'
  | 'academics'
  | 'finance'
  | 'students'
  | 'teachers'
  | 'infrastructure'
  | 'transport'
  | 'documents'
  | 'activity'
  | 'settings';

export default function BranchDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const branch = mockBranchDetails[id || ''] || mockBranchDetails['branch-koramangala'];

  const handleActionClick = (actionName: string) => {
    alert(`Quick Action Triggered: ${actionName.replace('-', ' ').toUpperCase()} inside ${branch.name}`);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'academics', label: 'Academics' },
    { key: 'finance', label: 'Finance' },
    { key: 'students', label: 'Students' },
    { key: 'teachers', label: 'Teachers' },
    { key: 'infrastructure', label: 'Infrastructure' },
    { key: 'transport', label: 'Transport' },
    { key: 'documents', label: 'Documents' },
    { key: 'activity', label: 'Activity' },
    { key: 'settings', label: 'Settings' }
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'academics':
        return <AcademicInsights data={branch.academics} />;
      case 'finance':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FinancialSummary data={branch.finance} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <BranchComparison currentBranch={branch} />
            </div>
          </div>
        );
      case 'students':
        return <PeopleSummary students={branch.students} teachers={branch.teachers} />;
      case 'teachers':
        return <PeopleSummary students={branch.students} teachers={branch.teachers} />;
      case 'infrastructure':
        return <OperationsSummary infrastructure={branch.infrastructure} branchName={branch.name} />;
      case 'transport':
        return <OperationsSummary infrastructure={branch.infrastructure} branchName={branch.name} />;
      case 'documents':
        return <DocumentsSummary compliance={branch.compliance} />;
      case 'activity':
        return <RecentTimeline activities={branch.activities} />;
      case 'settings':
        return <SettingsSummary />;
      case 'overview':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Health & AI Insights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <BranchHealthCard health={branch.health} />
              <AIInsightsCard />
            </div>

            {/* Branch Details Profile */}
            <BranchInformation info={branch.info} />

            {/* Comparison & Broadcasts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <BranchComparison currentBranch={branch} />
              <Announcements announcements={branch.announcements} />
            </div>

            {/* Timelines */}
            <RecentTimeline activities={branch.activities} />
          </div>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      paddingBottom: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Back button link */}
      <div style={{ paddingTop: '20px' }}>
        <button
          onClick={() => navigate('/org/branches')}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0
          }}
        >
          ← Back to Branches Directory
        </button>
      </div>

      {/* Hero Header component */}
      <BranchHeader
        branch={branch}
        onEdit={() => handleActionClick('edit-branch')}
        onExport={() => handleActionClick('generate-report')}
      />

      {/* Sticky Quick Actions component */}
      <BranchQuickActions onActionClick={handleActionClick} />

      {/* Grouped Executive KPIs Dashboard */}
      <BranchKPIs branch={branch} />

      {/* Performance tab switcher navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #cbd5e1',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        gap: '28px',
        marginTop: '10px'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                padding: '12px 4px',
                color: isActive ? '#2563eb' : '#64748b',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Dynamic Tab Content */}
      <div style={{ minHeight: '300px' }}>
        {renderActiveTabContent()}
      </div>
    </div>
  );
}
