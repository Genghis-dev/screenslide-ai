import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideCarousel({ slides, currentIndex, onNavigate }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(slides.length - 1, currentIndex + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, slides.length, onNavigate]);

  return (
    <div>
      {/* Navigation row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            ...navBtn,
            opacity: currentIndex === 0 ? 0.3 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              style={{
                width: i === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: i === currentIndex ? 'var(--color-primary)' : 'var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => onNavigate(currentIndex + 1)}
          disabled={currentIndex === slides.length - 1}
          style={{
            ...navBtn,
            opacity: currentIndex === slides.length - 1 ? 0.3 : 1,
            cursor: currentIndex === slides.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnail strip */}
      {slides.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              style={{
                flexShrink: 0, width: '100px', aspectRatio: '16/9',
                border: i === currentIndex ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                borderRadius: '4px', background: 'var(--color-surface)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)',
                flexDirection: 'column', gap: '4px', padding: '4px',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{
                fontSize: '0.55rem', fontWeight: 700, color: i === currentIndex ? 'var(--color-primary)' : 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}>{slide.type}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--color-text)', textAlign: 'center', lineHeight: 1.2, maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {slide.title}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const navBtn = {
  background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)',
  borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
};
