import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExportReportDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const options = [
    { label: 'Attendance Summary', category: 'Attendance' },
    { label: 'Fee Collection Report', category: 'Finance' },
    { label: 'Student List', category: 'Operations' },
    { label: 'Academic Performance', category: 'Academic' },
    { label: 'Class-wise Report', category: 'Academic' },
    { label: 'Full Dashboard PDF', category: 'Executive' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button 
        className="btn btn-secondary btn-sm" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', gap: 4 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        Export Report ▾
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 4,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          width: 220,
          zIndex: 100,
          padding: '4px 0'
        }}>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                navigate('/reports', { state: { category: opt.category } });
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                fontSize: 13,
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

