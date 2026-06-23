import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGetParentGalleryQuery } from './parentApi';

const CATEGORIES = ['All', 'Academic', 'Sports', 'Cultural', 'Dance', 'Events', 'Certificates', 'Trips', 'Classroom'];

// Mock additional photos to demonstrate the categories
const MOCK_PHOTOS = [
  { id: 'm1', title: 'Science Exhibition', category: 'Academic', date: '2026-06-15', url: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&q=80' },
  { id: 'm2', title: 'Annual Sports Day', category: 'Sports', date: '2026-05-20', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80' },
  { id: 'm3', title: 'Diwali Celebration', category: 'Cultural', date: '2025-11-10', url: 'https://images.unsplash.com/photo-1603813950293-6eaf0027f8cc?w=800&q=80' },
  { id: 'm4', title: 'Math Olympiad Gold', category: 'Certificates', date: '2026-02-14', url: 'https://images.unsplash.com/photo-1589330694653-efa64f78bd31?w=800&q=80' },
  { id: 'm5', title: 'Field Trip to Museum', category: 'Trips', date: '2026-04-05', url: 'https://images.unsplash.com/photo-1565507158784-9dbb5f93de2f?w=800&q=80' },
  { id: 'm6', title: 'Reading Hour', category: 'Classroom', date: '2026-06-10', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80' },
];

export default function ParentGalleryPage() {
  const selectedStudent = useSelector((s: RootState) => s.auth.selected_student);
  const studentId = selectedStudent?.id;

  const { data: apiPhotos = [], isLoading } = useGetParentGalleryQuery({ studentId: studentId! }, { skip: !studentId });

  const [activePhoto, setActivePhoto] = useState<any | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Combine API photos with Mock photos
  const photos = useMemo(() => {
    return [...MOCK_PHOTOS, ...(Array.isArray(apiPhotos) ? apiPhotos : [])];
  }, [apiPhotos]);

  const filteredPhotos = useMemo(() => {
    if (filterCategory === 'All') return photos;
    return photos.filter((p: any) => p.category?.toLowerCase() === filterCategory.toLowerCase());
  }, [photos, filterCategory]);

  const handleDownload = (photoUrl: string) => {
    window.open(photoUrl, '_blank');
  };

  if (!studentId) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🖼️</div>
        <h2 style={{ color: 'var(--text-primary)', fontWeight: 600 }}>School Media Center</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a child to view their activity gallery.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 44, height: 44, border: '3px solid var(--border-color)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>Loading media center...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 80 }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>School Media Center</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>
          Photos, videos, and certificates for {selectedStudent?.first_name}
        </p>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 24, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: 24,
              background: filterCategory === cat ? 'var(--text-primary)' : 'var(--bg-surface)',
              color: filterCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s',
              border: filterCategory === cat ? '1px solid var(--text-primary)' : '1px solid var(--border-color)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PHOTO GRID */}
      {filteredPhotos.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {filteredPhotos.map((photo: any) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 24,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ position: 'relative', height: 220, width: '100%', background: 'var(--bg-secondary)' }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'rgba(15, 23, 42, 0.75)', color: 'white', backdropFilter: 'blur(8px)',
                  padding: '4px 12px', borderRadius: 16, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  {photo.category}
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {photo.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
                  {new Date(photo.date).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'var(--bg-surface)', borderRadius: 24, padding: 60, textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: 18, fontWeight: 800 }}>No Media Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>
            No photos available for the "{filterCategory}" category.
          </p>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000, backdropFilter: 'blur(12px)',
          }}
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'absolute', top: 24, right: 24,
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: 48, height: 48, color: 'white', fontSize: 24, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            ✕
          </button>

          <div style={{ maxWidth: '90%', maxHeight: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }} onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: 24, objectFit: 'contain', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
            />

            <div style={{ textAlign: 'center', color: 'white', background: 'rgba(0,0,0,0.4)', padding: '16px 32px', borderRadius: 24, backdropFilter: 'blur(8px)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px 0' }}>{activePhoto.title}</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 16px 0', fontWeight: 500 }}>
                {activePhoto.category} • {new Date(activePhoto.date).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <button
                onClick={() => handleDownload(activePhoto.url)}
                style={{
                  background: 'white', color: '#0f172a', padding: '10px 24px', borderRadius: 24,
                  fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto',
                  boxShadow: '0 4px 12px rgba(255,255,255,0.2)'
                }}
              >
                <span>📥</span> Download Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
