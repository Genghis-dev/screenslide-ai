import React, { useState } from 'react';
import { GripVertical, ChevronDown, ChevronRight, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

const SLIDE_TYPE_COLORS = {
  title: '#7C3AED',
  content: '#2563EB',
  'two-column': '#0891B2',
  'image-text': '#059669',
  'stat-block': '#D97706',
  quote: '#DB2777',
  closing: '#DC2626',
};

const SLIDE_TYPES = ['title', 'content', 'two-column', 'image-text', 'stat-block', 'quote', 'closing'];

function SlideRow({ slide, onTypeChange, index }) {
  const [expanded, setExpanded] = useState(false);
  const color = SLIDE_TYPE_COLORS[slide.type] || 'var(--color-primary)';

  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)', marginBottom: '8px', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
        <GripVertical size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0, cursor: 'grab' }} />
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%', background: color + '22', color,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
          fontWeight: 700, flexShrink: 0,
        }}>{index + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.9rem' }}>
            {slide.title}
          </div>
          {slide.content?.subheading && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>
              {slide.content.subheading}
            </div>
          )}
        </div>
        <select
          value={slide.type}
          onChange={(e) => onTypeChange(slide.slideNumber, e.target.value)}
          style={{
            background: color + '22', color, border: `1px solid ${color}44`,
            borderRadius: '4px', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 600,
            cursor: 'pointer', textTransform: 'uppercase',
          }}
        >
          {SLIDE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {expanded && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--color-border)' }}>
          {slide.components?.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Components</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {slide.components.map((tag) => (
                  <span key={tag} style={{
                    background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)',
                    borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontFamily: 'var(--font-body)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          )}
          {slide.designNotes && (
            <div style={{ marginTop: '12px', background: 'rgba(99,102,241,0.05)', borderLeft: '2px solid var(--color-primary)', padding: '8px 12px', borderRadius: '0 4px 4px 0' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', marginBottom: '4px', fontWeight: 600 }}>AI SUGGESTION</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{slide.designNotes}</div>
            </div>
          )}
          {slide.content?.notes && (
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
              Speaker notes: {slide.content.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AIStructurePanel({ structure, onAccept, onReanalyze }) {
  const [slides, setSlides] = useState(structure?.slides || []);

  const handleTypeChange = (slideNumber, newType) => {
    setSlides((prev) => prev.map((s) => s.slideNumber === slideNumber ? { ...s, type: newType } : s));
  };

  if (!structure) return null;

  return (
    <div>
      {/* Narrative */}
      {structure.overallNarrative && (
        <div style={{
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '20px',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <Sparkles size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '4px' }}>AI ANALYSIS</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>{structure.overallNarrative}</div>
          </div>
        </div>
      )}

      {/* Slides */}
      <div style={{ marginBottom: '20px' }}>
        {slides.map((slide, i) => (
          <SlideRow key={slide.slideNumber} slide={slide} onTypeChange={handleTypeChange} index={i} />
        ))}
      </div>

      {/* Suggestions */}
      {structure.suggestions?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suggestions</div>
          {structure.suggestions.map((s, i) => (
            <div key={i} style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginBottom: '4px', display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--color-accent)' }}>→</span> {s}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onAccept({ ...structure, slides })}
          style={{
            background: 'var(--color-primary)', color: '#fff', border: 'none',
            borderRadius: 'var(--radius)', padding: '10px 20px', fontSize: '0.9rem',
            fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-body)',
          }}
        >
          Accept & Generate <ArrowRight size={14} />
        </button>
        <button
          onClick={onReanalyze}
          style={{
            background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', padding: '10px 16px', fontSize: '0.875rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)',
          }}
        >
          <RotateCcw size={14} /> Re-analyze
        </button>
      </div>
    </div>
  );
}
