import { create } from 'zustand';

const defaultTokens = {
  colors: {
    primary: '#6366F1',
    secondary: '#0EA5E9',
    accent: '#F59E0B',
    background: '#0F172A',
    surface: '#1E293B',
    textPrimary: '#F8FAFC',
    textMuted: '#94A3B8',
    border: '#334155',
  },
  typography: {
    headingFont: 'DM Sans',
    bodyFont: 'IBM Plex Sans',
    style: 'clean',
  },
  spacing: 'default',
  radius: 'md',
};

export const useTokenStore = create((set) => ({
  tokens: defaultTokens,
  overrides: {},
  rawPerScreenshot: [],

  setTokens: (tokens) => set({ tokens }),

  overrideToken: (path, value) =>
    set((state) => {
      const overrides = { ...state.overrides, [path]: value };
      // Deep-merge overrides into tokens
      const tokens = applyOverrides(state.tokens, overrides);
      return { overrides, tokens };
    }),

  addRawScreenshotTokens: (tokens) =>
    set((state) => ({
      rawPerScreenshot: [...state.rawPerScreenshot, tokens],
    })),

  resetTokens: () => set({ tokens: defaultTokens, overrides: {}, rawPerScreenshot: [] }),
}));

function applyOverrides(tokens, overrides) {
  const result = JSON.parse(JSON.stringify(tokens));
  for (const [path, value] of Object.entries(overrides)) {
    const parts = path.split('.');
    let obj = result;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }
  return result;
}
