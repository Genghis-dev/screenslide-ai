import {
  mockAnalyzeScreenshot,
  mockGenerateComponent,
  mockSlideStructure,
  mockComposedSlides,
} from './mockData';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-2.0-flash';

const DEMO_MODE = !API_KEY;
let forceDemo = DEMO_MODE;

export const setDemoMode = (val) => { forceDemo = val; };
export const isDemoMode = () => forceDemo;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ============================================================
// Core helpers
// ============================================================

async function callGeminiJSON(parts, systemInstruction = null) {
  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(`${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];
  if (!candidate || candidate.finishReason === 'SAFETY') {
    throw new Error('Response blocked by safety filters. Try a different input.');
  }
  const text = candidate.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

async function callGeminiText(parts, systemInstruction = null) {
  const body = {
    contents: [{ parts }],
    generationConfig: { temperature: 0.4 },
  };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(`${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];
  if (!candidate || candidate.finishReason === 'SAFETY') {
    throw new Error('Response blocked by safety filters.');
  }
  let code = candidate.content?.parts?.[0]?.text || '';
  // Strip markdown fences
  code = code.replace(/^```(?:jsx|javascript|js|react)?\n?/m, '').replace(/\n?```$/m, '').trim();
  return code;
}

// ============================================================
// System prompts
// ============================================================

const SCREENSHOT_ANALYSIS_SYSTEM_PROMPT = `You are a senior UI/UX engineer. Analyze this screenshot and return ONLY a JSON object with:

{
  "tokens": {
    "colors": {
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "background": "#hex",
      "surface": "#hex",
      "textPrimary": "#hex",
      "textMuted": "#hex",
      "border": "#hex"
    },
    "typography": {
      "headingFont": "font-family string (guess closest Google Font)",
      "bodyFont": "font-family string",
      "style": "clean|bold|editorial|playful|corporate|minimal"
    },
    "spacing": "tight|default|loose",
    "radius": "none|sm|md|lg|pill"
  },
  "components": [
    {
      "id": "unique-slug",
      "tag": "hero|card|stat-block|cta|nav|testimonial|feature-grid|list|header|footer|image-text|pricing|form",
      "name": "Human readable name",
      "description": "What this component does and contains",
      "layout": "Description of layout structure",
      "visualNotes": "Border treatments, shadows, gradients, icon usage",
      "content": {
        "headings": ["text found"],
        "body": ["text found"],
        "buttons": ["text found"],
        "images": "description of image placement"
      }
    }
  ]
}

Be extremely specific. Identify EVERY distinct component. Sample ACTUAL dominant colors.`;

const COMPONENT_GEN_SYSTEM_PROMPT = `You are an expert React developer. Generate a single reusable React component.

RULES:
- Use React functional component with default export
- Use inline styles referencing these CSS variables: --color-primary, --color-secondary, --color-accent, --color-bg, --color-surface, --color-text, --color-text-muted, --color-border, --font-heading, --font-body, --radius, --spacing-unit
- Component must accept props for ALL text content with sensible defaults
- Include JSDoc prop types comment
- NO external dependencies beyond React and lucide-react
- Return ONLY the component code, no markdown fences, no explanation`;

const SLIDE_ANALYSIS_SYSTEM_PROMPT = (availableComponentTags) => `You are a presentation design strategist. Analyze this text and create the optimal slide structure.

Available component types: ${JSON.stringify(availableComponentTags)}

Return ONLY a JSON object:
{
  "slides": [
    {
      "slideNumber": 1,
      "type": "title|content|two-column|image-text|stat-block|quote|closing",
      "title": "Slide title",
      "layout": "Description of recommended layout",
      "components": ["tag1"],
      "content": {
        "heading": "...",
        "subheading": "...",
        "body": "..." or ["bullet1"],
        "stats": [{"value": "42%", "label": "Growth"}],
        "cta": "Button text",
        "notes": "Speaker notes"
      },
      "designNotes": "Why this layout works"
    }
  ],
  "overallNarrative": "Brief analysis of presentation flow",
  "suggestions": ["Improvement suggestions"]
}

GUIDELINES: Vary slide types, lead with impact, keep text minimal, split dense content.`;

// ============================================================
// Public API functions
// ============================================================

/** Analyze a screenshot and return design tokens + component specs */
export async function analyzeScreenshot(base64Image, mimeType = 'image/png', screenshotIndex = 0) {
  if (forceDemo) {
    await delay(1500);
    return mockAnalyzeScreenshot(base64Image, screenshotIndex);
  }
  return callGeminiJSON(
    [
      { inline_data: { mime_type: mimeType, data: base64Image } },
      { text: 'Analyze this screenshot. Return JSON following the schema in your instructions.' },
    ],
    SCREENSHOT_ANALYSIS_SYSTEM_PROMPT
  );
}

/** Generate React component code from a component description + tokens */
export async function generateComponent(description, tokens) {
  if (forceDemo) {
    await delay(1200);
    return mockGenerateComponent(description);
  }
  const prompt = `Generate a React component.\n\nDesign tokens: ${JSON.stringify(tokens)}\nComponent spec: ${JSON.stringify(description)}`;
  return callGeminiText([{ text: prompt }], COMPONENT_GEN_SYSTEM_PROMPT);
}

/** Analyze pasted slide text and return suggested slide structure */
export async function analyzeSlideText(rawText, availableComponents = []) {
  if (forceDemo) {
    await delay(1800);
    return mockSlideStructure;
  }
  const tags = [...new Set(availableComponents.map((c) => c.tag))];
  const prompt = `Analyze this presentation text and create an optimal slide structure:\n\n${rawText}`;
  return callGeminiJSON([{ text: prompt }], SLIDE_ANALYSIS_SYSTEM_PROMPT(tags));
}

/** Compose a single slide given slide data, components, and tokens */
export async function composeSlide(slideData, components, tokens) {
  if (forceDemo) {
    await delay(800);
    const mock = mockComposedSlides.find((s) => s.slideNumber === slideData.slideNumber);
    return mock?.jsx || `<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',background:'var(--color-bg)',color:'var(--color-text)',fontFamily:'var(--font-heading)',fontSize:'2rem'}}>${slideData.content?.heading || slideData.title}</div>`;
  }
  const relevantComponents = components.filter((c) =>
    slideData.components?.includes(c.tag)
  );
  const prompt = `Compose a slide as JSX (no imports, just the JSX element).

Slide type: ${slideData.type}
Content: ${JSON.stringify(slideData.content)}
Tokens available as CSS variables: --color-primary, --color-surface, --color-bg, --color-text, --color-text-muted, --color-border, --font-heading, --font-body, --radius, --spacing-unit
Components available: ${JSON.stringify(relevantComponents.map((c) => ({ name: c.name, tag: c.tag })))}
Applied tokens: ${JSON.stringify(tokens)}

Return ONLY the JSX element (starting with <div ...). No imports. No export.`;
  return callGeminiText([{ text: prompt }]);
}
