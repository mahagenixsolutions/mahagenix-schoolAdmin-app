import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Award, Zap, Star, Trophy, ArrowLeft, RefreshCw } from 'lucide-react';

interface PuzzleCategory {
  id: string;
  name: string;
  description: string;
  emoji: string;
  colorLight: string;
  colorDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  difficulty: 'Easy' | 'Medium' | 'Tricky';
  status: 'New' | 'Solved';
  question: string;
  options: string[];
  answer: string;
  hint: string;
}

export default function PuzzlesPage() {
  const user = useSelector((s: RootState) => s.auth.user);
  
  // Game states in localStorage/state
  const [stars, setStars] = useState(120);
  const [streak, setStreak] = useState(5);
  const [logicLevel, setLogicLevel] = useState(4);
  const [solvedCount, setSolvedCount] = useState(0);

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sound generator
  const playSoundChime = (isSuccess: boolean) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (isSuccess) {
        // Success: double beep (high pitch)
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        
        setTimeout(() => {
          osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        }, 150);
        
        setTimeout(() => {
          osc.stop();
          ctx.close();
        }, 350);
      } else {
        // Fail: low buzzer beep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        
        setTimeout(() => {
          osc.stop();
          ctx.close();
        }, 300);
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by browser policies.', e);
    }
  };

  const [categories, setCategories] = useState<PuzzleCategory[]>([
    {
      id: 'pattern',
      name: 'Pattern Matching',
      description: 'Train your eyes to spot sequence repeating loops!',
      emoji: '🌈',
      colorLight: '#E0F2FE', // soft blue
      colorDark: 'rgba(14, 165, 233, 0.12)',
      borderLight: '#BAE6FD',
      borderDark: 'rgba(14, 165, 233, 0.25)',
      textLight: '#0369A1',
      textDark: '#38BDF8',
      difficulty: 'Easy',
      status: 'New',
      question: 'Complete the pattern sequence: 🍎 🔵 🍎 🔵 ?',
      options: ['🍎', '🔵', '🍌'],
      answer: '🍎',
      hint: 'Look at what comes after 🔵 in the pattern.',
    },
    {
      id: 'riddle',
      name: 'Brain Teasers',
      description: 'Read tricky word play puzzles to solve riddles.',
      emoji: '🧠',
      colorLight: '#F3E8FF', // soft purple
      colorDark: 'rgba(168, 85, 247, 0.12)',
      borderLight: '#E9D5FF',
      borderDark: 'rgba(168, 85, 247, 0.25)',
      textLight: '#6B21A8',
      textDark: '#C084FC',
      difficulty: 'Medium',
      status: 'New',
      question: 'What has keys but no locks, space but no room, and you can enter but not go outside?',
      options: ['A Clock', 'A Keyboard', 'A Map'],
      answer: 'A Keyboard',
      hint: 'Think about a device you use to type code!',
    },
    {
      id: 'sudoku',
      name: 'Number Grids',
      description: 'Fill the tracks using math logic tracks.',
      emoji: '🔢',
      colorLight: '#FEF3C7', // soft yellow
      colorDark: 'rgba(245, 158, 11, 0.12)',
      borderLight: '#FDE68A',
      borderDark: 'rgba(245, 158, 11, 0.25)',
      textLight: '#92400E',
      textDark: '#FBBF24',
      difficulty: 'Tricky',
      status: 'New',
      question: 'Help the logic robot finish the track: 3 ➔ 6 ➔ 9 ➔ ?',
      options: ['10', '11', '12'],
      answer: '12',
      hint: 'Count upwards by adding 3 each time.',
    },
    {
      id: 'shapes',
      name: 'Shape Sorting',
      description: 'Find matching geometrics and count corners.',
      emoji: '📐',
      colorLight: '#D1FAE5', // soft green
      colorDark: 'rgba(16, 185, 129, 0.12)',
      borderLight: '#A7F3D0',
      borderDark: 'rgba(16, 185, 129, 0.25)',
      textLight: '#065F46',
      textDark: '#34D399',
      difficulty: 'Easy',
      status: 'New',
      question: 'Which shape has exactly 3 straight lines and 3 corners?',
      options: ['Square', 'Circle', 'Triangle'],
      answer: 'Triangle',
      hint: 'Try sketching shapes on a paper. Which has three points?',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<PuzzleCategory | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Badge status list
  const [badges, setBadges] = useState([
    { id: 'b1', name: 'Pattern Detective', emoji: '🔍', desc: 'Solve pattern match', unlocked: false },
    { id: 'b2', name: 'Riddle Master', emoji: '🧙‍♂️', desc: 'Crack a brain teaser', unlocked: false },
    { id: 'b3', name: 'Grid Wizard', emoji: '🧙', desc: 'Solve a number grid', unlocked: false },
    { id: 'b4', name: 'Shape Ranger', emoji: '🪐', desc: 'Complete shape sort', unlocked: false },
  ]);

  const selectOption = (opt: string) => {
    setSelectedOption(opt);
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!activeCategory || !selectedOption) return;

    if (selectedOption === activeCategory.answer) {
      playSoundChime(true);
      setFeedback({ type: 'success', message: 'Hooray! That is correct! ⭐ +20 Stars' });
      
      // Update stats
      setStars((prev) => prev + 20);
      setSolvedCount((prev) => prev + 1);

      // Unlock corresponding badge
      setBadges((prev) =>
        prev.map((b) => {
          if (activeCategory.id === 'pattern' && b.id === 'b1') return { ...b, unlocked: true };
          if (activeCategory.id === 'riddle' && b.id === 'b2') return { ...b, unlocked: true };
          if (activeCategory.id === 'sudoku' && b.id === 'b3') return { ...b, unlocked: true };
          if (activeCategory.id === 'shapes' && b.id === 'b4') return { ...b, unlocked: true };
          return b;
        })
      );

      // Mark card category solved
      setCategories((prev) =>
        prev.map((c) => (c.id === activeCategory.id ? { ...c, status: 'Solved' } : c))
      );

      // Level up progress check
      if (solvedCount + 1 >= 3 && logicLevel === 4) {
        setLogicLevel(5);
        setStreak((s) => s + 1);
      }
    } else {
      playSoundChime(false);
      setFeedback({ type: 'error', message: 'Oops! Let’s think and try again!' });
    }
  };

  const closeGame = () => {
    setActiveCategory(null);
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="puzzles-layout-container" style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        /* child friendly bubble theme style overrides */
        .puzzle-card {
          border-radius: 20px;
          border: 1px solid var(--puz-border-val);
          background: var(--puz-bg-card-val);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .puzzle-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 28px rgba(0,0,0,0.06);
        }
        
        .pulse-star {
          animation: pulseStar 1.5s infinite alternate;
        }
        @keyframes pulseStar {
          from { transform: scale(1); filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.4)); }
          to { transform: scale(1.15); filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.8)); }
        }

        .bouncy-hover:hover {
          transform: scale(1.05);
        }

        /* Confetti bubbles effect */
        @keyframes confettiFall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
        }
        .confetti-pop {
          position: absolute; width: 8px; height: 8px; border-radius: 50%;
          animation: confettiFall 1.2s forwards ease-out;
        }
      `}</style>

      {/* Dynamic theme mappings */}
      <div style={{ display: 'none' }}>
        <span id="theme-detector" />
      </div>

      <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Main Content Area */}
        <div style={{ gridColumn: 'span 8' }} className="col-span-12 lg-span-8">
          
          {/* Header welcoming banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFEDD5, #FFD6A5)',
              border: 'none',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(251, 146, 60, 0.15)',
            }}
          >
            {/* Background design elements */}
            <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', top: '-80px', right: '-40px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '100px', height: '100px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', bottom: '-40px', left: '20%', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
              <img
                src="/puzzles_mascot.png"
                alt="Mascot"
                style={{
                  width: '96px',
                  height: '96px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  background: 'white',
                  padding: '6px',
                  border: '3px solid #FB923C',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              />
              <div>
                <span style={{ background: '#EA580C', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Brain Gym
                </span>
                <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px 0', color: '#7C2D12' }}>
                  Hi, {user?.first_name || 'Explorer'}! 🦊
                </h1>
                <p style={{ fontSize: '14px', color: '#9A3412', margin: 0, opacity: 0.9, fontWeight: 500 }}>
                  Ready to train your brain? Solved exercises build your streaks!
                </p>
              </div>
            </div>

            {/* Quick Level Tracker */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '130px',
                border: '1px solid rgba(251, 146, 60, 0.25)',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                position: 'relative',
                zIndex: 1,
              }}
              className="md-visible-flex"
            >
              <span style={{ fontSize: '11px', color: '#7C2D12', fontWeight: 700, textTransform: 'uppercase' }}>
                Logic Level
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Trophy size={18} style={{ color: '#EA580C' }} />
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#7C2D12' }}>
                  Lvl {logicLevel}
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(solvedCount % 3) * 33.3 + 20}%`, height: '100%', background: '#EA580C', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '9px', color: '#9A3412', marginTop: '4px' }}>
                {solvedCount % 3}/3 puzzles solved to Lvl {logicLevel + 1}
              </span>
            </div>
          </div>

          {/* Gamified counters banner */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '16px 24px',
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px', background: '#FEF3C7', padding: '8px', borderRadius: '12px' }}>🔥</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>STREAK</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{streak} Days</div>
              </div>
            </div>

            <div
              style={{ width: '1px', height: '32px', background: 'var(--border-subtle)' }}
              className="hidden md-block"
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px', background: '#FEE2E2', padding: '8px', borderRadius: '12px' }} className="pulse-star">⭐</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>STARS COLLECTED</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{stars} Stars</div>
              </div>
            </div>

            <div
              style={{ width: '1px', height: '32px', background: 'var(--border-subtle)' }}
              className="hidden md-block"
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '24px', background: '#D1FAE5', padding: '8px', borderRadius: '12px' }}>🧩</div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>TODAY'S MISSION</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {solvedCount >= 1 ? 'Complete! 🎉' : '0 / 1 Puzzles Solved'}
                </div>
              </div>
            </div>

            <div
              style={{ width: '1px', height: '32px', background: 'var(--border-subtle)' }}
              className="hidden md-block"
            />

            {/* Sound Toggler */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSoundChime(true);
              }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{soundEnabled ? '🔊 Sound On' : '🔇 Muted'}</span>
            </button>
          </div>

          {/* Puzzle Categories Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {categories.map((cat) => {
              const isDark = document.documentElement.dataset.theme === 'dark';
              const cardBg = isDark ? cat.colorDark : cat.colorLight;
              const cardBorder = isDark ? cat.borderDark : cat.borderLight;
              const cardText = isDark ? cat.textDark : cat.textLight;

              return (
                <div
                  key={cat.id}
                  className="puzzle-card"
                  onClick={() => {
                    setActiveCategory(cat);
                    setFeedback(null);
                    setSelectedOption(null);
                  }}
                  style={{
                    background: cardBg,
                    borderColor: cardBorder,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div>
                    {/* Card Top: Icon & Difficulty badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '36px' }}>{cat.emoji}</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '10px',
                          background: 'white',
                          color: '#1E293B',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        }}
                      >
                        {cat.difficulty}
                      </span>
                    </div>

                    {/* Card Body */}
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: cardText, margin: '0 0 6px 0' }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4, opacity: 0.9 }}>
                      {cat.description}
                    </p>
                  </div>

                  {/* Card Action footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: cat.status === 'Solved' ? '#22C55E' : 'rgba(255,255,255,0.4)',
                        color: cat.status === 'Solved' ? 'white' : cardText,
                      }}
                    >
                      {cat.status === 'Solved' ? 'Solved ✅' : 'New ✨'}
                    </span>

                    <button
                      className="bouncy-hover"
                      style={{
                        background: cat.status === 'Solved' ? '#22C55E' : 'var(--text-primary)',
                        color: cat.status === 'Solved' ? 'white' : 'var(--bg-canvas)',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      {cat.status === 'Solved' ? 'Replay' : 'Play'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Rewards and progress */}
        <div style={{ gridColumn: 'span 4' }} className="col-span-12 lg-span-4">
          
          {/* Daily Quests Widget */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              🎯 Daily Quests
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Quest 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '20px' }}>{solvedCount >= 1 ? '✅' : '⏳'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Solve 1 Puzzle</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reward: +20 Stars</div>
                </div>
              </div>

              {/* Quest 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '20px' }}>{solvedCount >= 3 ? '✅' : '⏳'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Level up Logic Level</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reward: +1 Streak Day</div>
                </div>
              </div>

            </div>
          </div>

          {/* Badges Collection Widget */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                🏅 Earned Badges
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 700 }}>
                {badges.filter((b) => b.unlocked).length} / {badges.length}
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {badges.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: b.unlocked ? 'var(--bg-secondary)' : 'transparent',
                    border: b.unlocked ? '1.5px solid var(--color-primary-surface)' : '1.5px dashed var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '16px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    opacity: b.unlocked ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px', filter: b.unlocked ? 'none' : 'grayscale(1)' }}>
                    {b.emoji}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>
                    {b.name}
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.2 }}>
                    {b.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Playable Logic Game Overlay Modal */}
      {activeCategory && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 17, 23, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
            animation: 'fadeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '28px',
              width: '100%',
              maxWidth: '540px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Confetti container for success answers */}
            {feedback?.type === 'success' && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {[...Array(20)].map((_, i) => {
                  const colors = ['#FFC700', '#FF0000', '#2E93F3', '#FF4E00', '#A1E533', '#E3197E'];
                  const randColor = colors[Math.floor(Math.random() * colors.length)];
                  const left = Math.random() * 100;
                  const delay = Math.random() * 0.5;
                  const size = Math.random() * 8 + 4;
                  return (
                    <div
                      key={i}
                      className="confetti-pop"
                      style={{
                        background: randColor,
                        left: `${left}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${delay}s`,
                        top: '-10px',
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '28px' }}>{activeCategory.emoji}</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeCategory.name} Challenge
                </span>
              </div>
              <button
                onClick={closeGame}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                }}
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            {/* Puzzle Question */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                {activeCategory.question}
              </p>
            </div>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeCategory.options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => selectOption(opt)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--color-primary-surface)' : 'var(--bg-secondary)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                      fontSize: '15px',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{opt}</span>
                    {isSelected && <span style={{ fontSize: '18px' }}>🎯</span>}
                  </button>
                );
              })}
            </div>

            {/* Hints Section */}
            {showHint ? (
              <div style={{ background: 'rgba(254, 243, 199, 0.05)', border: '1px solid #FEF3C720', borderRadius: '16px', padding: '12px 16px', fontSize: '12px', color: '#FBBF24', display: 'flex', gap: '8px' }}>
                <span>💡 <strong>Hint:</strong> {activeCategory.hint}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  padding: 0,
                }}
              >
                💡 Need a Hint?
              </button>
            )}

            {/* Action Feedback alerts */}
            {feedback && (
              <div
                style={{
                  background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: feedback.type === 'success' ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                  color: feedback.type === 'success' ? '#22C55E' : '#EF4444',
                  borderRadius: '16px',
                  padding: '16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={closeGame}
                style={{
                  flex: 1,
                  background: 'none',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                Quit Game
              </button>
              
              <button
                onClick={checkAnswer}
                disabled={!selectedOption}
                style={{
                  flex: 2,
                  background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: selectedOption ? 'pointer' : 'not-allowed',
                  opacity: selectedOption ? 1 : 0.6,
                  boxShadow: selectedOption ? '0 4px 14px rgba(236, 72, 153, 0.3)' : 'none',
                }}
              >
                Check Answer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
