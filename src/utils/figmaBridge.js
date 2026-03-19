/**
 * Builder.io Figma bridge helpers.
 * The Builder.io elements-api script must be loaded in index.html for sendToFigma to work.
 */

export function isBuilderLoaded() {
  return typeof window !== 'undefined' && typeof window.builderWC !== 'undefined';
}

export function sendToFigma(elementId) {
  if (!isBuilderLoaded()) {
    console.warn('Builder.io elements-api script not loaded');
    return;
  }
  try {
    const el = document.getElementById(elementId);
    if (el && window.builderWC?.capture) {
      window.builderWC.capture(el);
    } else {
      console.warn('Element not found or Builder capture not available:', elementId);
    }
  } catch (err) {
    console.error('Figma bridge error:', err);
  }
}

export function generateStandaloneHTML(slideJSX, tokens, slideNumber) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Slide ${slideNumber}</title>
  <style>
    :root {
      --color-primary: ${tokens.colors?.primary || '#6366F1'};
      --color-secondary: ${tokens.colors?.secondary || '#0EA5E9'};
      --color-accent: ${tokens.colors?.accent || '#F59E0B'};
      --color-bg: ${tokens.colors?.background || '#0F172A'};
      --color-surface: ${tokens.colors?.surface || '#1E293B'};
      --color-text: ${tokens.colors?.textPrimary || '#F8FAFC'};
      --color-text-muted: ${tokens.colors?.textMuted || '#94A3B8'};
      --color-border: ${tokens.colors?.border || '#334155'};
      --font-heading: '${tokens.typography?.headingFont || 'DM Sans'}', sans-serif;
      --font-body: '${tokens.typography?.bodyFont || 'IBM Plex Sans'}', sans-serif;
      --radius: 8px;
      --spacing-unit: 8px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--color-bg); display: flex; align-items: center; justify-content: center; height: 100vh; }
    .slide { width: 1280px; height: 720px; overflow: hidden; position: relative; }
  </style>
</head>
<body>
  <div class="slide" id="slide-root"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- Slide content rendered here -->
</body>
</html>`;
}
