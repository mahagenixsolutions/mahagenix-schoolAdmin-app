import { Zap, Search, ChevronDown, Filter } from 'lucide-react';
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
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', width: '240px' }}>
            <Search size={16} className="text-muted" style={{ marginRight: 8 }} />
            <input 
              type="text" 
              placeholder="Search student..." 
              style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Context Selector */}
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', 
            background: 'var(--color-primary)', color: '#fff', border: 'none', 
            borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' 
          }}>
            Class 8 - Section A - Science <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* 3-Column Mission Control Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.2fr) minmax(600px, 3fr) minmax(250px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
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
