import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import type { RootState } from '../../store';
import { NAVIGATION_CONFIG } from '../../core/navigation/navigation.config';
import { usePermission } from '../../core/hooks/usePermission';
import { UserRole } from '@edutrack/shared-types';
import { ROLE_PERMISSIONS } from '../../core/permissions/ROLE_PERMISSIONS';
import React from 'react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  
  // Create a helper to check permission directly since we can't call hooks in a map function easily
  const hasPermission = (permission?: string) => {
    if (!permission) return true;
    if (!user || !user.role) return false;
    const rolePermissions = ROLE_PERMISSIONS[user.role as UserRole];
    return rolePermissions?.includes(permission as any) ?? false;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const initials = user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : '??';

  // Filter navigation items by user permissions
  const filteredNavItems = NAVIGATION_CONFIG.map((section) => {
    const items = section.items.filter((item) => hasPermission(item.permission));
    return { ...section, items };
  }).filter((section) => section.items.length > 0);

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
            <path
              d="M2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="sidebar-logo-text">EduTrack AI</span>
        <button
          onClick={onToggle}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'var(--color-gray-400)',
            cursor: 'pointer',
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            flexShrink: 0,
          }}
        >
          <CollapseIcon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {filteredNavItems.map((section) => (
          <div key={section.section} style={{ marginBottom: 8 }}>
            <div className="sidebar-section-label">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="sidebar-item-icon">
                    <Icon />
                  </span>
                  <span className="sidebar-item-label">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Info & Settings */}
      <div className="sidebar-footer">
        <div className="sidebar-user" title={user?.full_name}>
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-details">
            <div className="sidebar-user-name">{user?.full_name}</div>
            <div
              className="sidebar-user-role"
              style={{
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
              }}
            >
              {user?.role?.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Collapse toggle (collapsed state) */}
        {collapsed && (
          <button
            onClick={onToggle}
            className="sidebar-item"
            style={{ width: '100%', justifyContent: 'center' }}
            title="Expand sidebar"
          >
            <span className="sidebar-item-icon">
              <ExpandIcon />
            </span>
          </button>
        )}

        {/* Logout */}
        <button
          id="sidebar-logout"
          onClick={handleLogout}
          className="sidebar-item"
          style={{ width: '100%', color: 'var(--color-danger)' }}
        >
          <span className="sidebar-item-icon">
            <LogoutIcon />
          </span>
          <span className="sidebar-item-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ─── Icon Components ──────────────────────────────────────────────────────────
const icon = (path: string) => () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

const LogoutIcon = icon(
  'M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z',
);
const CollapseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
  </svg>
);
const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </svg>
);
