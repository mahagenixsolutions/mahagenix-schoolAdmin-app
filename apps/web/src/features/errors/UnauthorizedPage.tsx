import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>403</h1>
      <h2 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Access Denied</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        You don't have permission to access this page. If you believe this is a mistake, please contact your administrator.
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
        Return to Dashboard
      </button>
    </div>
  );
};
