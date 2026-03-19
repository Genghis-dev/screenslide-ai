import React, { useRef } from 'react';
import { Send, Copy, Download } from 'lucide-react';
import { useTokenStore } from '../../stores/tokenStore';
import { tokensToCSSVars } from '../../utils/tokenResolver';
import { sendToFigma, generateStandaloneHTML } from '../../utils/figmaBridge';

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

export default function SlidePreview({ slide, slideNumber, totalSlides }) {
  const containerRef = useRef(null);
  const tokens = useTokenStore((s) => s.tokens);
  const cssVars = tokensToCSSVars(tokens);

  const handleCopyJSX = () => {
    if (slide?.jsx) navigator.clipboard.writeText(slide.jsx);
  };

  const handleDownload = () => {
    if (!slide?.jsx) return;
    const html = generateStandaloneHTML(slide.jsx, tokens, slideNumber);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide-${slideNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const slideSrcDoc = `<!DOCTYPE html>
<html>
<head>
<style>
  :root { ${cssVars} }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${SLIDE_WIDTH}px; height: ${SLIDE_HEIGHT}px; overflow: hidden; background: var(--color-bg); }
  #slide { width: 100%; height: 100%; }
</style>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.js" crossorigin></script>
</head>
<body>
<div id="slide"></div>
<script type="text/babel" data-presets="react">
const { TrendingUp, TrendingDown, DollarSign, Check, ArrowRight, Play, Sparkles } = LucideReact;
function SlideContent() {
  return (
    ${slide?.jsx || `<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--color-text-muted)',fontFamily:'var(--font-body)'}}>Slide ${slideNumber}</div>`}
  );
}
const root = ReactDOM.createRoot(document.getElementById('slide'));
root.render(React.createElement(SlideContent));
</script>
</body>
</html>`;

  return (
    <div>
      {/* Slide container — scales to fit */}
      <div style={{ position: 'relative' }}>
        {/* Aspect ratio wrapper */}
        <div style={{ position: 'relative', paddingBottom: `${(SLIDE_HEIGHT / SLIDE_WIDTH) * 100}%`, background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden', border: '2px solid var(--color-border)' }}>
          <div
            ref={containerRef}
            id={`slide-${slideNumber}`}
            style={{ position: 'absolute', inset: 0 }}
          >
            <iframe
              srcDoc={slideSrcDoc}
              style={{
                width: `${SLIDE_WIDTH}px`,
                height: `${SLIDE_HEIGHT}px`,
                border: 'none',
                transformOrigin: 'top left',
                transform: 'scale(var(--slide-scale, 0.5))',
              }}
              title={`Slide ${slideNumber}`}
              sandbox="allow-scripts"
            />
          </div>
          <ScaleIframe containerId={`slide-${slideNumber}`} />
        </div>

        {/* Slide number badge */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: '4px',
          padding: '4px 10px', fontSize: '0.75rem', fontFamily: 'var(--font-body)',
        }}>
          {slideNumber} / {totalSlides}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
        <button onClick={() => sendToFigma(`slide-${slideNumber}`)} style={actionBtn}>
          <Send size={13} /> Send to Figma
        </button>
        <button onClick={handleCopyJSX} style={actionBtn}>
          <Copy size={13} /> Copy JSX
        </button>
        <button onClick={handleDownload} style={actionBtn}>
          <Download size={13} /> Download HTML
        </button>
      </div>
    </div>
  );
}

const actionBtn = {
  background: 'var(--color-surface)', color: 'var(--color-text-muted)',
  border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
  padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)',
};

// Injects --slide-scale CSS variable based on container width
function ScaleIframe({ containerId }) {
  React.useEffect(() => {
    const update = () => {
      const el = document.getElementById(containerId);
      if (!el) return;
      const scale = el.clientWidth / 1280;
      el.style.setProperty('--slide-scale', scale);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [containerId]);
  return null;
}
