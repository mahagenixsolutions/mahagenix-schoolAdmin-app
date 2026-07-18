import { orgMocks } from '../../../mock/organization/orgMocks';

export default function PrincipalsDirectory() {
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'user':
      case '👨‍💼':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>;
      case 'school':
      case '🏫':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M22 10v6M2 10l10-5 10 5-10 5-10 5-10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          {getIconSvg('👨‍💼', 24)} Branch Administrators Directory
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 4 }}>
          Organization-wide school branch administrators directory. Direct messaging and evaluation scores.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24,
      }}>
        {orgMocks.principals.map((principal, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            style={{
              padding: '24px', borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={principal.photo}
                alt={principal.name}
                style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--accent-primary)', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {principal.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600, margin: '2px 0 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {getIconSvg('🏫', 12)} {principal.branch}
                </p>
                <span style={{
                  display: 'inline-flex', padding: '2px 6px', fontSize: 10, fontWeight: 700,
                  background: 'var(--color-secondary-surface)', color: 'var(--accent-success)',
                  borderRadius: 4, marginTop: 6,
                }}>
                  Rating: {principal.rating}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '13px', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{principal.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{principal.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Leadership Exp:</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{principal.experience}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <a
                href={`mailto:${principal.email}`}
                className="btn btn-secondary"
                style={{ flex: 1, textDecoration: 'none', textAlign: 'center', fontSize: 12, padding: '8px 0', fontWeight: 600 }}
              >
                Send Email
              </a>
              <button
                className="btn btn-primary"
                onClick={() => alert(`Direct notice channel created with Principal ${principal.name}`)}
                style={{ flex: 1, fontSize: 12, padding: '8px 0', fontWeight: 600 }}
              >
                Send Notice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
