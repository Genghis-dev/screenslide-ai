import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';

const COLOR_ROLES = ['primary', 'secondary', 'accent', 'background', 'surface', 'textPrimary', 'textMuted', 'border'];
const FONTS = ['DM Sans', 'Inter', 'IBM Plex Sans', 'Plus Jakarta Sans', 'Nunito', 'Poppins', 'Roboto', 'Source Sans 3'];
const SPACING_OPTIONS = ['tight', 'default', 'loose'];
const RADIUS_OPTIONS = ['none', 'sm', 'md', 'lg', 'pill'];
const STYLE_OPTIONS = ['clean', 'bold', 'editorial', 'playful', 'corporate', 'minimal'];

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '16px' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text)', fontFamily: 'var(--font-heading)',
          fontWeight: 600, fontSize: '0.85rem', padding: '8px 0', width: '100%',
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>
      {open && <div style={{ paddingLeft: '20px' }}>{children}</div>}
    </div>
  );
}

function ColorRow({ label, path, value }) {
  const overrideToken = useTokenStore((s) => s.overrideToken);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
      <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: value, border: '1px solid var(--color-border)' }} />
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => overrideToken(path, e.target.value)}
          style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => overrideToken(path, e.target.value)}
          style={{
            width: '80px', background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: '4px', padding: '2px 6px', color: 'var(--color-text)', fontSize: '0.75rem',
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  );
}

function SelectRow({ label, value, options, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
      <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: '4px', padding: '4px 8px', color: 'var(--color-text)', fontSize: '0.8rem',
          cursor: 'pointer',
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function TokenEditor() {
  const { tokens, overrideToken } = useTokenStore();

  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)', padding: '16px',
    }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '0.95rem', margin: '0 0 16px' }}>
        Design Tokens
      </h3>

      <Section title="Colors">
        {COLOR_ROLES.map((role) => (
          <ColorRow
            key={role}
            label={role}
            path={`colors.${role}`}
            value={tokens.colors?.[role]}
          />
        ))}
      </Section>

      <Section title="Typography">
        <SelectRow
          label="Heading font"
          value={tokens.typography?.headingFont}
          options={FONTS}
          onChange={(v) => overrideToken('typography.headingFont', v)}
        />
        <SelectRow
          label="Body font"
          value={tokens.typography?.bodyFont}
          options={FONTS}
          onChange={(v) => overrideToken('typography.bodyFont', v)}
        />
        <SelectRow
          label="Style"
          value={tokens.typography?.style}
          options={STYLE_OPTIONS}
          onChange={(v) => overrideToken('typography.style', v)}
        />
      </Section>

      <Section title="Layout">
        <SelectRow
          label="Spacing"
          value={tokens.spacing}
          options={SPACING_OPTIONS}
          onChange={(v) => overrideToken('spacing', v)}
        />
        <SelectRow
          label="Border radius"
          value={tokens.radius}
          options={RADIUS_OPTIONS}
          onChange={(v) => overrideToken('radius', v)}
        />
      </Section>
    </div>
  );
}
