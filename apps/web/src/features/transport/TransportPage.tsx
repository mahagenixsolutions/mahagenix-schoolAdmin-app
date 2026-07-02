import React from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';

const TransportPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Transport Fleet"
        subtitle="Manage routes, drivers, student bus allocations, and status tracking"
        breadcrumbs={[{ label: 'Transport' }]}
      />
      <div className="card" style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome to the Transport Hub. Under active construction.</p>
      </div>
    </PageLayout>
  );
};

export default TransportPage;
