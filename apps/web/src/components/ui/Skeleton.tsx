import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style,
}: SkeletonProps) {
  const getStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'block',
      width: width ?? (variant === 'circular' ? 40 : '100%'),
      height: height ?? (variant === 'text' ? '1em' : variant === 'circular' ? 40 : 120),
      borderRadius:
        variant === 'circular'
          ? '50%'
          : variant === 'text'
          ? 'var(--radius-sm)'
          : 'var(--radius-md)',
      ...style,
    };
    return baseStyle;
  };

  return <span className={`skeleton ${className}`} style={getStyle()} />;
}

// ─── COMPOSITE SKELETONS ──────────────────────────────────────────────────────

// Renders a full layout matching a dashboard page structure
export function PageSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
      {/* Header Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div>
          <Skeleton variant="text" width={200} height={28} style={{ marginBottom: 8 }} />
          <Skeleton variant="text" width={320} height={16} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Skeleton variant="rectangular" width={100} height={36} style={{ borderRadius: 'var(--radius-md)' }} />
          <Skeleton variant="rectangular" width={120} height={36} style={{ borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-body" style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" width="40%" height={38} style={{ borderRadius: 'var(--radius-md)', flex: 1, minWidth: 200 }} />
          <Skeleton variant="rectangular" width={120} height={38} style={{ borderRadius: 'var(--radius-md)' }} />
          <Skeleton variant="rectangular" width={120} height={38} style={{ borderRadius: 'var(--radius-md)' }} />
          <Skeleton variant="rectangular" width={120} height={38} style={{ borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>

      {/* Metric Cards Row (4 cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="circular" width={24} height={24} />
            </div>
            <Skeleton variant="text" width={60} height={32} style={{ marginBottom: 8 }} />
            <Skeleton variant="text" width={120} height={14} />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <TableSkeleton rows={5} cols={5} />
        </div>
      </div>
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <div className="table-container" style={{ margin: 0 }}>
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <Skeleton variant="text" width="60%" height={16} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  {c === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <div style={{ flex: 1 }}>
                        <Skeleton variant="text" width="80%" height={14} style={{ marginBottom: 4 }} />
                        <Skeleton variant="text" width="50%" height={10} />
                      </div>
                    </div>
                  ) : (
                    <Skeleton variant="text" width={c === cols - 1 ? '40%' : '70%'} height={14} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', padding: '10px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
        <Skeleton variant="text" width={160} height={22} />
        <Skeleton variant="text" width={280} height={14} />
      </div>

      <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 28, marginLeft: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ position: 'relative', display: 'flex', gap: 16 }}>
            {/* Timeline Dot Skeleton */}
            <div
              style={{
                position: 'absolute',
                left: -35,
                top: 4,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '3px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <Skeleton variant="circular" width={10} height={10} />
            </div>

            {/* Timeline Card */}
            <div className="card" style={{ flex: 1, padding: 18, marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Skeleton variant="circular" width={28} height={28} />
                  <div>
                    <Skeleton variant="text" width={120} height={14} style={{ marginBottom: 4 }} />
                    <Skeleton variant="text" width={80} height={10} />
                  </div>
                </div>
                <Skeleton variant="text" width={60} height={12} />
              </div>
              <Skeleton variant="text" width="90%" height={14} style={{ marginBottom: 8 }} />
              <Skeleton variant="text" width="75%" height={14} style={{ marginBottom: 12 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Skeleton variant="rectangular" width={60} height={20} style={{ borderRadius: 'var(--radius-sm)' }} />
                <Skeleton variant="rectangular" width={80} height={20} style={{ borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
      <div>
        <Skeleton variant="text" width={220} height={26} style={{ marginBottom: 6 }} />
        <Skeleton variant="text" width={300} height={14} style={{ marginBottom: 20 }} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
            }}
          >
            {/* Shimmering Image */}
            <Skeleton variant="rectangular" width="100%" height={200} style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
            
            {/* Content Area */}
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={18} style={{ borderRadius: 999 }} />
                <Skeleton variant="text" width={60} height={12} />
              </div>
              <Skeleton variant="text" width="85%" height={16} style={{ marginTop: 4 }} />
              <Skeleton variant="text" width="50%" height={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
