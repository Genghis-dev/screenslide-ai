import React, { useState } from 'react';
import { Code2, RefreshCw, Copy, Check, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';
import { tokensToCSSVars } from '../../utils/tokenResolver';

const TAG_COLORS = {
  hero: '#7C3AED',
  card: '#2563EB',
  'stat-block': '#059669',
  cta: '#DC2626',
  nav: '#D97706',
  testimonial: '#DB2777',
  'feature-grid': '#0891B2',
  list: '#65A30D',
  header: '#4338CA',
  footer: '#64748B',
  pricing: '#7C3AED',
  form: '#B45309',
};

export default function ComponentCard({ component, onGenerate, onRegenerate, generating }) {
  const [codeOpen, setCodeOpen] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const tokens = useTokenStore((s) => s.tokens);
  const cssVars = tokensToCSSVars(tokens);

  const displayCode = editedCode || component.code || '';
  const tagColor = TAG_COLORS[component.tag] || 'var(--color-primary)';

  const copy = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: tagColor + '22', color: tagColor, border: `1px solid ${tagColor}44`,
            borderRadius: '4px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 600,
            fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>{component.tag}</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>
            {component.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {component.code && (
            <button onClick={copy} title="Copy code" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
              {copied ? <Check size={16} style={{ color: '#10B981' }} /> : <Copy size={16} />}
            </button>
          )}
          {component.code ? (
            <button
              onClick={() => onRegenerate(component)}
              disabled={generating}
              title="Regenerate"
              style={{ background: 'none', border: 'none', cursor: generating ? 'not-allowed' : 'pointer', color: 'var(--color-text-muted)' }}
            >
              <RefreshCw size={16} className={generating ? 'animate-spin' : ''} />
            </button>
          ) : (
            <button
              onClick={() => onGenerate(component)}
              disabled={generating}
              style={{
                background: 'var(--color-primary)', color: '#fff', border: 'none',
                borderRadius: '4px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600,
                cursor: generating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                opacity: generating ? 0.7 : 1,
              }}
            >
              {generating ? <><Loader2 size={12} className="animate-spin" /> Generating…</> : <>
                <Code2 size={12} /> Generate Code
              </>}
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>
          {component.description}
        </p>
        {component.layout && (
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', margin: '4px 0 0', opacity: 0.7 }}>
            Layout: {component.layout}
          </p>
        )}
      </div>

      {/* Live preview */}
      {component.code && (
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>PREVIEW</div>
          <iframe
            srcDoc={buildPreviewHTML(component.code, cssVars)}
            style={{ width: '100%', height: '180px', border: 'none', borderRadius: '4px' }}
            title={`Preview: ${component.name}`}
            sandbox="allow-scripts"
          />
        </div>
      )}

      {/* Code viewer */}
      {component.code && (
        <div>
          <button
            onClick={() => setCodeOpen((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', width: '100%',
              background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px',
              color: 'var(--color-text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-body)',
            }}
          >
            {codeOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            {codeOpen ? 'Hide' : 'View'} code
          </button>
          {codeOpen && (
            <div style={{ padding: '0 16px 16px' }}>
              <textarea
                value={editedCode || component.code}
                onChange={(e) => setEditedCode(e.target.value)}
                style={{
                  width: '100%', minHeight: '200px', background: '#0D1117', border: '1px solid var(--color-border)',
                  borderRadius: '4px', padding: '12px', color: '#E2E8F0', fontSize: '0.75rem',
                  fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Strip imports and transform "export default function/class Name" → bare declaration, returning name
function prepareCode(raw) {
  let code = raw.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '').trim();
  let componentName = null;
  code = code.replace(/export\s+default\s+function\s+(\w+)/, (_, n) => { componentName = n; return 'function ' + n; });
  if (!componentName) {
    code = code.replace(/export\s+default\s+class\s+(\w+)/, (_, n) => { componentName = n; return 'class ' + n; });
  }
  if (!componentName) {
    const m = code.match(/export\s+default\s+(\w+)/);
    if (m) { componentName = m[1]; code = code.replace(/export\s+default\s+\w+\s*;?/, ''); }
  }
  return { code, componentName };
}

function buildPreviewHTML(rawCode, cssVars) {
  const { code, componentName } = prepareCode(rawCode);
  const renderLine = componentName
    ? `ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${componentName}));`
    : `document.getElementById('root').textContent = 'Preview unavailable';`;
  return `<!DOCTYPE html>
<html>
<head>
<style>
  :root { ${cssVars} }
  body { margin: 0; padding: 16px; background: var(--color-bg); font-family: var(--font-body); }
</style>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
<script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.js" crossorigin><\/script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-presets="react">
const { TrendingUp, TrendingDown, DollarSign, Check, ArrowRight, Play,
  LayoutDashboard, BarChart2, Box, Settings, ChevronDown, ChevronRight } = LucideReact;
${code}
${renderLine}
<\/script>
</body>
</html>`;
}
