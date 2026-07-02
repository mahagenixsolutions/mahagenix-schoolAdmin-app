import React from 'react';

export interface FilterDropdownOption {
  value: string;
  label: string;
}

export interface FilterDropdown {
  name: string;
  label: string;
  options: FilterDropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface FilterChip {
  key: string;
  label: string;
  onClear: () => void;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  dropdowns?: FilterDropdown[];
  chips?: FilterChip[];
  onClearAllChips?: () => void;
  rightActions?: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  dropdowns = [],
  chips = [],
  onClearAllChips,
  rightActions,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1, alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px', height: '38px', width: '100%' }}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {dropdowns.map((dropdown, idx) => (
            <select
              key={idx}
              className="form-select"
              style={{ height: '38px', width: 'auto', minWidth: '140px' }}
              value={dropdown.value}
              onChange={(e) => dropdown.onChange(e.target.value)}
            >
              <option value="">All {dropdown.label}</option>
              {dropdown.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>

        {rightActions && <div style={{ display: 'flex', gap: '8px' }}>{rightActions}</div>}
      </div>

      {chips.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Filters applied:</span>
          {chips.map((chip) => (
            <span
              key={chip.key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: 'var(--bg-surface-raised)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                color: 'var(--text-primary)',
              }}
            >
              {chip.label}
              <button
                onClick={chip.onClear}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          {onClearAllChips && (
            <button
              onClick={onClearAllChips}
              className="btn btn-secondary"
              style={{ fontSize: '11px', height: '24px', padding: '0 8px' }}
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};
