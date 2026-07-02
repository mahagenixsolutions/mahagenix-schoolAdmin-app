import React from 'react';

export interface GridColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataGridProps<T> {
  columns: GridColumn<T>[];
  data: T[];
  keyField: keyof T;
  isLoading?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  emptyState?: React.ReactNode;
  actions?: (row: T) => React.ReactNode;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalRecords?: number;
}

export function DataGrid<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  selectedIds = [],
  onSelectionChange,
  sortBy,
  sortOrder,
  onSort,
  emptyState,
  actions,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalRecords = 0,
}: DataGridProps<T>) {
  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row) => String(row[keyField])));
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const handleSortClick = (key: string) => {
    if (!onSort) return;
    const newOrder = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newOrder);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid var(--border-subtle)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Loading records...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        {emptyState || (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>No records found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                {onSelectionChange && (
                  <th style={{ width: '48px', padding: '12px 16px' }}>
                    <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{
                      padding: '12px 16px',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: col.sortable ? 'pointer' : 'default',
                      userSelect: 'none',
                    }}
                    onClick={() => col.sortable && handleSortClick(String(col.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {col.header}
                      {col.sortable && (
                        <span style={{ display: 'inline-flex', flexDirection: 'column', color: sortBy === String(col.key) ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortBy === String(col.key) && sortOrder === 'desc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'} />
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && <th style={{ width: '80px', padding: '12px 16px', textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                const id = String(row[keyField]);
                const isSelected = selectedIds.includes(id);
                return (
                  <tr
                    key={id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(79, 142, 247, 0.04)' : 'transparent',
                    }}
                  >
                    {onSelectionChange && (
                      <td style={{ padding: '12px 16px' }}>
                        <input type="checkbox" checked={isSelected} onChange={() => handleSelectRow(id)} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={String(col.key)} style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-primary)' }}>
                        {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                      </td>
                    ))}
                    {actions && (
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>{actions(row)}</div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {onPageChange && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Showing {data.length} of {totalRecords} records
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '13px' }}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '13px' }}
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
