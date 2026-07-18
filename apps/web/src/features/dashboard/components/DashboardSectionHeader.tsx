interface Props {
  title: string;
  accentColor?: string;
}

export default function DashboardSectionHeader({ title, accentColor = 'var(--accent-primary)' }: Props) {
  return (
    <h2 style={{
      fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)',
      margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      <span style={{
        width: '4px', height: '18px', borderRadius: '2px',
        background: accentColor,
      }} />
      {title}
    </h2>
  );
}
