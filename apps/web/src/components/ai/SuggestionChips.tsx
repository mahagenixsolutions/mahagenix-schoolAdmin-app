import type { AISuggestion } from '../../types/ai';

interface SuggestionChipsProps {
  suggestions: AISuggestion[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export default function SuggestionChips({ suggestions, onSelect, disabled }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        padding: '4px 0',
      }}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion.prompt)}
          disabled={disabled}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-secondary)',
            fontSize: 12,
            fontWeight: 500,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'var(--transition-fast)',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = 'var(--color-primary-surface)';
              e.currentTarget.style.borderColor = 'var(--color-primary-light)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-primary)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <span style={{ fontSize: 13 }}>{suggestion.icon}</span>
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}
