import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, actions }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" style={{ marginBottom: '8px', fontSize: '12px' }}>
            <ol style={{ display: 'flex', listStyle: 'none', gap: '8px', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
              <li>
                <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <li style={{ userSelect: 'none' }}>/</li>
                  <li>
                    {crumb.to ? (
                      <Link to={crumb.to} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {crumb.label}
                      </Link>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{crumb.label}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>{actions}</div>}
    </div>
  );
};
