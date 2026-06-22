import { Sparkles } from 'lucide-react';

export default function AiCopilotPage() {
  return (
    <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          padding: 20,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          borderRadius: '50%',
          color: 'var(--color-primary)',
        }}
      >
        <Sparkles size={48} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
        EduTrack AI Copilot
      </h2>
      <p
        style={{
          color: 'var(--text-secondary)',
          maxWidth: 400,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        An intelligent assistant to help teachers generate report card comments and proactively
        identify student risk trends.
        <br />
        <br />
        <span className="badge badge-primary">Coming in Phase 3</span>
      </p>
    </div>
  );
}
