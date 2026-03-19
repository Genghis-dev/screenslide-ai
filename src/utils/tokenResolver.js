/**
 * Merges tokens from multiple screenshot analyses into one unified token set.
 * Colors: majority vote per role. Typography: majority vote. Spacing/radius: majority vote.
 */
export function mergeTokens(tokenSets) {
  if (!tokenSets || tokenSets.length === 0) return null;
  if (tokenSets.length === 1) return tokenSets[0];

  const merged = {
    colors: {},
    typography: {},
    spacing: majorityVote(tokenSets.map((t) => t.spacing)),
    radius: majorityVote(tokenSets.map((t) => t.radius)),
  };

  // Merge colors by role
  const colorRoles = ['primary', 'secondary', 'accent', 'background', 'surface', 'textPrimary', 'textMuted', 'border'];
  for (const role of colorRoles) {
    const values = tokenSets.map((t) => t.colors?.[role]).filter(Boolean);
    merged.colors[role] = majorityVote(values) || values[0];
  }

  // Merge typography
  merged.typography = {
    headingFont: majorityVote(tokenSets.map((t) => t.typography?.headingFont).filter(Boolean)),
    bodyFont: majorityVote(tokenSets.map((t) => t.typography?.bodyFont).filter(Boolean)),
    style: majorityVote(tokenSets.map((t) => t.typography?.style).filter(Boolean)),
  };

  return merged;
}

function majorityVote(values) {
  if (!values || values.length === 0) return null;
  const counts = {};
  let max = 0;
  let winner = values[0];
  for (const v of values) {
    counts[v] = (counts[v] || 0) + 1;
    if (counts[v] > max) {
      max = counts[v];
      winner = v;
    }
  }
  return winner;
}

/** Convert token object into CSS custom property declarations */
export function tokensToCSSVars(tokens) {
  if (!tokens) return '';
  const radiusMap = { none: '0px', sm: '4px', md: '8px', lg: '16px', pill: '9999px' };
  const spacingMap = { tight: '6px', default: '8px', loose: '12px' };

  return `
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
    --radius: ${radiusMap[tokens.radius] || '8px'};
    --spacing-unit: ${spacingMap[tokens.spacing] || '8px'};
  `;
}
