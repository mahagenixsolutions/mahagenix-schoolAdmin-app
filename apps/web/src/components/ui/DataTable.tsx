
import { useState, useEffect } from 'react';
import BaseModal from '../modals/BaseModal';

interface Column { key: string; label: string; render?: (val: unknown, row: Record<string, unknown>) => React.ReactNode; width?: string; }

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, loading, emptyMessage = 'No records found', onRowClick }: DataTableProps<T>) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showMobileTruncation = isMobile && columns.length > 2;
  const mobileLimit = (columns[0]?.label === '' || !columns[0]?.label) ? 3 : 2;
  const displayColumns = showMobileTruncation ? columns.slice(0, mobileLimit) : columns;

  return (
    <>
      <div className="table-container table-responsive">
        <table className="table">
          <thead>
            <tr>
              {displayColumns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>{col.label}</th>
              ))}
              {showMobileTruncation && <th style={{ width: '80px', textAlign: 'right' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {displayColumns.map((col) => (
                    <td key={col.key}>
                      <span className="skeleton" style={{ height: 16, display: 'block', width: '70%' }} />
                    </td>
                  ))}
                  {showMobileTruncation && (
                    <td>
                      <span className="skeleton" style={{ height: 24, display: 'block', width: '100%', borderRadius: 4 }} />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={displayColumns.length + (showMobileTruncation ? 1 : 0)} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                  {displayColumns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                  {showMobileTruncation && (
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRow(row);
                        }}
                        style={{ padding: '4px 8px', fontSize: 11, background: 'var(--bg-tertiary)' }}
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <BaseModal
        isOpen={selectedRow !== null}
        onClose={() => setSelectedRow(null)}
        title="Record Details"
        subtitle="Full information snapshot"
        accentColor="var(--accent-primary)"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="11" y2="17" />
          </svg>
        }
        width="max-w-md"
      >
        {selectedRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {columns.map((col) => (
              <div
                key={col.key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingBottom: 10,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.label}
                </span>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>
                  {col.render ? col.render(selectedRow[col.key], selectedRow) : String(selectedRow[col.key] ?? '—')}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedRow(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </BaseModal>
    </>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  total_pages: number;
  onPage: (p: number) => void;
}

export function Pagination({ page, total_pages, onPage }: PaginationProps) {
  const pages = Array.from({ length: Math.min(total_pages, 7) }, (_, i) => {
    if (total_pages <= 7) return i + 1;
    if (page <= 4) return i + 1 > total_pages - 2 && i > 4 ? '...' : i + 1;
    return i + 1;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 16 }}>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
      >‹ Prev</button>

      {pages.map((p, i) => (
        <button
          key={i}
          className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => typeof p === 'number' && onPage(p)}
          disabled={p === '...'}
        >
          {p}
        </button>
      ))}

      <button
        className="btn btn-secondary btn-sm"
        onClick={() => onPage(page + 1)}
        disabled={page >= total_pages}
      >Next ›</button>
    </div>
  );
}
