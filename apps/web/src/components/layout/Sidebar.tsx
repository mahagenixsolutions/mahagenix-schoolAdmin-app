import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import type { RootState } from '../../store';
import { NAVIGATION_CONFIG } from '../../core/navigation/navigation.config';
import { UserRole } from '@edutrack/shared-types';
import { ROLE_PERMISSIONS } from '../../core/permissions/ROLE_PERMISSIONS';
import { ROLE_NAVIGATION } from '../../core/navigation/roleNavigation.config';
import React from 'react';
import { motion } from 'framer-motion';

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

  const initials = user ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() : '??';

  // Use role-specific configuration if available, otherwise fall back to generic configuration
  const userRole = user?.role as UserRole;
  const activeNavConfig = (userRole && ROLE_NAVIGATION[userRole]) ? ROLE_NAVIGATION[userRole] : NAVIGATION_CONFIG;

  // Filter navigation items by user permissions
  const filteredNavItems = activeNavConfig.map((section) => {
    const items = section.items.filter((item) => hasPermission(item.permission));
    return { ...section, items };
  }).filter((section) => section.items.length > 0);

  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>(() => ({
    'Overview': false,
    'Core Directories': true,
    'Academic & Exams': true,
    'School Operations': true,
    'Insights & Core Settings': true,
    'Organization': false,
    'Analytics & Insights': true,
    'Setup & Logs': true,
  }));

  const toggleSection = (sectionName: string) => {
    if (collapsed) return;
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
          {!collapsed && <span className="sidebar-logo-text">EduTrack AI</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {filteredNavItems.map((section) => {
          const isSectionCollapsed = collapsed ? false : (collapsedSections[section.section] ?? true);
          return (
            <div key={section.section} style={{ marginBottom: 8 }}>
              <div
                className="sidebar-section-label"
                onClick={() => toggleSection(section.section)}
                style={{
                  cursor: collapsed ? 'default' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: '12px',
                  userSelect: 'none'
                }}
              >
                <span>{section.section}</span>
                {!collapsed && (
                  <span style={{
                    fontSize: '9px',
                    opacity: 0.6,
                    transform: isSectionCollapsed ? 'rotate(-90deg)' : 'none',
                    transition: 'transform 0.2s',
                    display: 'inline-block'
                  }}>
                    ▼
                  </span>
                )}
              </div>

              <motion.div
                initial={false}
                animate={{ height: isSectionCollapsed ? 0 : 'auto', opacity: isSectionCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
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
              </motion.div>
            </div>
          );
        })}
      </nav>


      {/* User Info & Settings */}
      <div
        className="sidebar-footer"
        style={{
          padding: collapsed ? '16px 8px' : '16px 12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 10,
        }}
      >
        {!collapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'var(--bg-surface-raised)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xs)',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
              <div
                className="avatar-fallback"
                style={{
                  width: 32,
                  height: 32,
                  fontSize: 11,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user ? `${user.first_name} ${user.last_name}` : 'School Admin'}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
              <button
                id="sidebar-theme-toggle"
                onClick={() => {
                  const html = document.documentElement;
                  const nextTheme = html.dataset.theme === 'dark' ? '' : 'dark';
                  html.dataset.theme = nextTheme;
                  localStorage.setItem('edutrack_theme', nextTheme);
                }}
                title="Toggle Theme"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-secondary)',
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-surface)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                </svg>
              </button>

              <motion.button
                id="sidebar-logout"
                onClick={handleLogout}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--color-danger-surface)' }}
                whileTap={{ scale: 0.95 }}
                title="Logout"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-danger)',
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'color 0.2s',
                }}
              >
                <LogoutIcon />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div
              className="avatar-fallback"
              style={{
                width: 32,
                height: 32,
                fontSize: 11,
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={user ? `${user.first_name} ${user.last_name}` : 'User'}
            >
              {initials}
            </div>
            
            <motion.button
              id="sidebar-logout-collapsed"
              onClick={handleLogout}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--color-danger-surface)' }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                color: 'var(--accent-danger)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface-raised)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LogoutIcon />
            </motion.button>
          </div>
        )}
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
