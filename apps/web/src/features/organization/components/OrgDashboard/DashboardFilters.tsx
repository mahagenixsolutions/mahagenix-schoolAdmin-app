import React from 'react';
import type { DashboardFiltersState } from '../../hooks/useOrganizationDashboard';

interface FiltersProps {
  filters: DashboardFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<DashboardFiltersState>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: { category: string; title: string; subtitle: string; to: string }[];
  onResultClick: (to: string) => void;
}

export default function DashboardFilters({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  searchResults,
  onResultClick
}: FiltersProps) {
  const handleChange = (key: keyof DashboardFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif',
        position: 'sticky',
        top: '0',
        zIndex: 10
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1, minWidth: '280px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <input
            type="text"
            placeholder="🔍 Search branches, staff, recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              fontSize: '13px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              boxSizing: 'border-box',
              outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          />
          {searchQuery && searchResults.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)',
                marginTop: '4px',
                zIndex: 100,
                maxHeight: '200px',
                overflowY: 'auto'
              }}
            >
              {searchResults.map((res, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onResultClick(res.to);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '10px 12px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      background: '#eff6ff',
                      color: '#2563eb',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginRight: '6px'
                    }}
                  >
                    {res.category}
                  </span>
                  <strong>{res.title}</strong>
                  <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>{res.subtitle}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Board Select */}
        <select
          value={filters.board}
          onChange={(e) => handleChange('board', e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#374151'
          }}
        >
          <option value="All Boards">All Boards</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
        </select>

        {/* Region Select */}
        <select
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#374151'
          }}
        >
          <option value="All Regions">All Regions</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="North">North</option>
          <option value="West">West</option>
        </select>

        {/* City Select */}
        <select
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#374151'
          }}
        >
          <option value="All Cities">All Cities</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        {/* Date Range Select */}
        <select
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#374151'
          }}
        >
          <option value="This Month">This Month</option>
          <option value="This Quarter">This Quarter</option>
          <option value="This Academic Year">This Academic Year</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() =>
            setFilters({
              academicYear: '2026-27',
              board: 'All Boards',
              region: 'All Regions',
              city: 'All Cities',
              status: 'All',
              dateRange: 'This Month'
            })
          }
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#4b5563',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
