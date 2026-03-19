import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Palette, Type } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

function Section({ icon: Icon, title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: '12px' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text)', fontFamily: 'var(--font-heading)', fontWeight: 600,
          fontSize: '0.85rem', padding: '8px 0',
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {Icon && <Icon size={14} style={{ color: 'var(--color-primary)' }} />}
        {title}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function ColorSwatch({ name, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '6px', background: value,
        border: '1px solid var(--color-border)', flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>{name}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{value}</div>
      </div>
    </div>
  );
}

export default function AnalysisPanel() {
  const tokens = useTokenStore((s) => s.tokens);

  if (!tokens) return null;

  const colors = tokens.colors || {};

  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)', padding: '16px',
    }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '0.95rem', margin: '0 0 16px' }}>
        Extracted Design System
      </h3>

      <Section icon={Palette} title="Color Palette">
        <div style={{ paddingLeft: '22px' }}>
          {Object.entries(colors).map(([role, value]) => (
            <ColorSwatch key={role} name={role} value={value} />
          ))}
        </div>
      </Section>

      <Section icon={Type} title="Typography">
        <div style={{ paddingLeft: '22px' }}>
          <div style={{
            fontFamily: tokens.typography?.headingFont || 'DM Sans',
            fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px',
          }}>
            Heading Font
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
            {tokens.typography?.headingFont || '—'}
          </div>
          <div style={{
            fontFamily: tokens.typography?.bodyFont || 'IBM Plex Sans',
            fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '4px',
          }}>
            Body text font for paragraphs and UI labels
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
            {tokens.typography?.bodyFont || '—'}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)',
              borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem',
            }}>
              {tokens.typography?.style || 'clean'}
            </span>
            <span style={{
              background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)',
              borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem',
            }}>
              {tokens.spacing} spacing
            </span>
            <span style={{
              background: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)',
              borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem',
            }}>
              {tokens.radius} radius
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}
