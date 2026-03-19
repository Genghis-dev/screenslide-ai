import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const EXAMPLE_TEXT = `---
[The Problem]
Design teams waste 40% of their time on handoffs.
Developers misinterpret designs. Tokens get lost.
The gap between design and code is killing velocity.
---
[Our Solution]
ScreenSlide AI bridges design and code automatically.
- Upload a screenshot
- Get extracted design tokens instantly
- Generate reusable React components
- Build slides that match your brand
---
[Results]
Key stat: 10x faster prototyping
Key stat: 80% less handoff time
Key stat: 3 minutes from screenshot to component
---
[How It Works]
1. Upload your UI screenshots
2. AI extracts colors, fonts, spacing, and component patterns
3. Paste your presentation text
4. Get a fully designed, branded slide deck
---
[Get Started Today]
Join 10,000+ design teams already using ScreenSlide AI.
Start your free trial — no credit card required.`;

export default function TextInput({ onAnalyze, isAnalyzing }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) onAnalyze(text.trim());
  };

  return (
    <div>
      <div style={{
        background: 'var(--color-surface)', border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '12px', fontSize: '0.8rem',
        color: 'var(--color-text-muted)', fontFamily: 'monospace', lineHeight: 1.6,
      }}>
        <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', marginBottom: '8px', fontWeight: 600 }}>
          EXPECTED FORMAT
        </div>
        {['---', '[Slide Title]', 'Content for this slide...', '- Bullet points', 'Key stat: 42%', '---', '[Next Slide Title]', '...'].map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your slide content here, or click 'Load example' to see a sample..."
        style={{
          width: '100%', minHeight: '280px', background: 'var(--color-surface)',
          border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
          padding: '16px', color: 'var(--color-text)', fontSize: '0.875rem',
          fontFamily: 'var(--font-body)', resize: 'vertical', boxSizing: 'border-box',
          outline: 'none', lineHeight: 1.6,
        }}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit();
        }}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px', alignItems: 'center' }}>
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing || !text.trim()}
          style={{
            background: isAnalyzing || !text.trim() ? 'var(--color-surface)' : 'var(--color-primary)',
            color: isAnalyzing || !text.trim() ? 'var(--color-text-muted)' : '#fff',
            border: 'none', borderRadius: 'var(--radius)', padding: '10px 20px',
            fontSize: '0.9rem', fontWeight: 600, cursor: isAnalyzing || !text.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)',
          }}
        >
          {isAnalyzing
            ? <><Loader2 size={15} className="animate-spin" /> Analyzing…</>
            : <><Sparkles size={15} /> Analyze Structure</>}
        </button>

        <button
          onClick={() => setText(EXAMPLE_TEXT)}
          style={{
            background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)', padding: '10px 16px', fontSize: '0.875rem',
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          Load example
        </button>

        {text && (
          <button
            onClick={() => setText('')}
            style={{
              background: 'transparent', color: 'var(--color-text-muted)', border: 'none',
              fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}
          >
            Clear
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
          Ctrl+Enter to analyze
        </span>
      </div>
    </div>
  );
}
