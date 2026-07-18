import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orgMocks } from '../../../mock/organization/orgMocks';

export default function OrgBranches() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [branches, setBranches] = useState(orgMocks.branches);

  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'building':
      case '🏢':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM8 10h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>;
      case 'plus':
      case '➕':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
      case 'search':
      case '🔍':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
      case 'school':
      case '🏫':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M22 10v6M2 10l10-5 10 5-10 5-10 5-10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>;
      case 'pin':
      case '📍':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
      default:
        return null;
    }
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setBranches(orgMocks.branches);
    } else {
      const filtered = orgMocks.branches.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.location.toLowerCase().includes(query.toLowerCase())
      );
      setBranches(filtered);
    }
  };

  const handleCreateBranch = () => {
    const name = prompt('Enter new branch name:');
    if (!name) return;
    const location = prompt('Enter branch location:');
    if (!location) return;

    const newBranch = {
      id: `branch-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${name} Branch`,
      logo: '🏫',
      principal: 'To Be Appointed',
      vicePrincipal: 'To Be Appointed',
      location: location || 'Karnataka',
      students: 0,
      teachers: 0,
      nonTeaching: 0,
      parents: 0,
      attendance: '0%',
      revenue: '₹0',
      expenses: '₹0',
      performanceScore: 'N/A',
      status: 'Active' as const,
      recentActivities: ['Branch initialized.'],
      announcements: ['Welcome to the new branch portal.'],
    };

    setBranches([...branches, newBranch]);
    alert('Branch created successfully!');
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            {getIconSvg('🏢', 24)} School Branches Overview
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 4 }}>
            Manage and view academic & financial performance profiles of all group branches.
          </p>
        </div>
        <button
          onClick={handleCreateBranch}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {getIconSvg('➕', 12)} Create Branch
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            className="form-input"
            placeholder="Search branches by name or location..."
            style={{ width: '100%', height: 38, paddingLeft: 36, fontSize: 13 }}
          />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            {getIconSvg('🔍', 14)}
          </span>
        </div>
      </div>

      {/* Branch Cards Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px',
      }}>
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="dashboard-card"
            style={{
              padding: '24px', borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              display: 'flex', flexDirection: 'column', gap: '16px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                {getIconSvg('🏫', 24)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {branch.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {getIconSvg('📍', 11)} {branch.location} · <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>{branch.status}</span>
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Principal: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.principal}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Students: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.students}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Staff: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.teachers + branch.nonTeaching}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Attendance: </span>
                <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{branch.attendance}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Revenue: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{branch.revenue}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Score: </span>
                <span style={{ fontWeight: 600, color: 'var(--accent-violet)' }}>{branch.performanceScore}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate(`/org/branches/${branch.id}`)}
              style={{ width: '100%', padding: '10px 0', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
