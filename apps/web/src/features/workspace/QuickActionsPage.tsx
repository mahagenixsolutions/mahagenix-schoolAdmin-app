import { Zap, Search, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import CommandCenterLeftSidebar from './CommandCenterLeftSidebar';
import CommandCenterRightSidebar from './CommandCenterRightSidebar';
import BulkActionSpreadsheet from './BulkActionSpreadsheet';

export default function QuickActionsPage() {
  return (
    <div className="command-center-container" style={{ paddingBottom: '40px' }}>
      
      {/* Header Section */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
            <Zap className="text-secondary" size={28} />
            Teacher Command Center
          </h1>
          <p className="page-subtitle" style={{ margin: '8px 0 0 0' }}>
            Your daily productivity hub. Record attendance, marks, and remarks rapidly.
          </p>
        </div>
        
        {/* Global Controls */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Global Search */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', width: '100%', minWidth: '200px', flex: '1 1 auto' }}>
            <Search size={16} className="text-muted" style={{ marginRight: 8 }} />
            <input 
              type="text" 
              placeholder="Search student..." 
              style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Context Selector */}
          <Button variant="primary" endIcon={<ChevronDown size={16} />}>
            Class 8 - Section A - Science
          </Button>
        </div>
      </div>

      {/* 3-Column Mission Control Layout */}
      <div className="activity-layout-grid">
        
        {/* Left Sidebar: Context & AI */}
        <div className="command-sidebar-left">
          <CommandCenterLeftSidebar />
        </div>

        {/* Center Console: The Spreadsheet */}
        <div className="command-main-console" style={{ height: '100%' }}>
          <BulkActionSpreadsheet />
        </div>

        {/* Right Sidebar: Tasks & History */}
        <div className="command-sidebar-right">
          <CommandCenterRightSidebar />
        </div>

      </div>

    </div>
  );
}
