# Build Plan — ScreenSlide AI: Screenshot → Components → Slides Pipeline

## Overview

A React-based demo app with **two tabs**:

1. **Component Extractor** — Upload up to 3 screenshots. Claude Vision analyzes each, extracts design tokens, identifies components (cards, headers, CTAs, stat blocks, etc.), tags them by type, and generates reusable React code for each.
2. **Slide Builder** — Paste structured text (slide-by-slide). AI analyzes the text, suggests optimal slide structure, then assembles slides using the extracted components + design tokens. Live preview with real-time token tweaks.

Final output is React-rendered slides with a **Builder.io** script in the `<head>` so the user can push to Figma.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18 + Vite** | Fast HMR, best component reuse story, JSX for generated components |
| Styling | **Tailwind CSS 3** | Utility classes map cleanly to extracted tokens; easy to override via CSS variables |
| AI | **Google Gemini Flash** (`gemini-flash-latest`) | Vision for screenshot analysis, code gen for components, text analysis for slide structure. Fast, cheap, great vision. |
| Figma Bridge | **Builder.io `elements-api` script** | Inject in `<head>`, enables "Send to Figma" from rendered React output |
| State | **Zustand** | Lightweight, perfect for cross-tab shared state (tokens, components) |
| Icons | **lucide-react** | Already available, clean icon set |

---

## Project Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Tab router (Extractor | Builder)
├── stores/
│   ├── componentStore.js       # Zustand: extracted components, tags, code
│   └── tokenStore.js           # Zustand: design tokens (auto-extracted + overrides)
├── api/
│   ├── claude.js               # All Claude API call wrappers
│   └── mockData.js             # Complete mock responses for demo mode (no API key needed)
├── tabs/
│   ├── ExtractorTab/
│   │   ├── ExtractorTab.jsx    # Main tab layout
│   │   ├── ScreenshotUploader.jsx
│   │   ├── AnalysisPanel.jsx   # Shows extracted tokens + components
│   │   ├── ComponentCard.jsx   # Single extracted component preview + code
│   │   └── TokenEditor.jsx     # Editable token panel (color pickers, font selects)
│   └── BuilderTab/
│       ├── BuilderTab.jsx      # Main tab layout
│       ├── TextInput.jsx       # Paste structured slide text
│       ├── SlideTypeSelector.jsx
│       ├── AIStructurePanel.jsx # AI's suggested structure before generation
│       ├── SlidePreview.jsx    # Live rendered slide preview
│       └── SlideCarousel.jsx   # Navigate between slides
├── components/
│   └── generated/              # AI-generated component files land here at runtime
├── slide-templates/
│   ├── TitleSlide.jsx
│   ├── ContentSlide.jsx
│   ├── TwoColumnSlide.jsx
│   ├── ImageTextSlide.jsx
│   ├── StatBlockSlide.jsx
│   └── ClosingSlide.jsx
└── utils/
    ├── tokenResolver.js        # Merges auto-extracted + user-override tokens
    ├── componentRegistry.js    # Maps component tags → React components
    └── figmaBridge.js          # Builder.io integration helpers
```

---

## Demo Mode (No API Key Required)

The app must be fully testable without an Anthropic API key. This is critical for demos, reviews, and development.

### How It Works

A global toggle in the app header: **"Demo Mode" ↔ "Live AI"**

- **Demo Mode ON** (default when no `VITE_ANTHROPIC_API_KEY` env var is set): All Claude API calls are intercepted and return realistic hardcoded mock data with a simulated 1–2s delay (to mimic API latency). The full UI flow works end-to-end.
- **Live AI ON** (when API key is present): Real Claude API calls. Toggle lets the user switch back to demo mode to save credits during UI development.

### `api/claude.js` — Dual-mode wrapper

Every exported function checks the mode before calling:

```javascript
import { mockAnalyzeScreenshot, mockGenerateComponent, ... } from './mockData';

const DEMO_MODE = !import.meta.env.VITE_ANTHROPIC_API_KEY;
let forceDemo = DEMO_MODE;

export const setDemoMode = (val) => { forceDemo = val; };
export const isDemoMode = () => forceDemo;

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export async function analyzeScreenshot(base64Image) {
  if (forceDemo) {
    await delay(1500); // simulate API latency
    return mockAnalyzeScreenshot(base64Image);
  }
  // ... real API call
}
```

### `api/mockData.js` — What To Mock

This file contains **3 complete mock datasets** — one per "screenshot". Each dataset includes realistic tokens and 2–4 component descriptions, as if Claude had analyzed a real SaaS dashboard, marketing page, and pricing page.

**Mock dataset 1 — "SaaS Dashboard" screenshot:**
```javascript
export const mockAnalysis1 = {
  tokens: {
    colors: {
      primary: "#6366F1",
      secondary: "#0EA5E9",
      accent: "#F59E0B",
      background: "#0F172A",
      surface: "#1E293B",
      textPrimary: "#F8FAFC",
      textMuted: "#94A3B8",
      border: "#334155"
    },
    typography: {
      headingFont: "DM Sans",
      bodyFont: "IBM Plex Sans",
      style: "clean"
    },
    spacing: "default",
    radius: "md"
  },
  components: [
    {
      id: "stat-card",
      tag: "stat-block",
      name: "Metric Card",
      description: "Card showing a KPI with value, label, and trend indicator",
      layout: "Vertical stack: icon top-left, large number, label below, trend badge bottom-right",
      visualNotes: "Surface background, subtle border, small shadow, green/red trend arrows",
      content: {
        headings: ["$48.2K"],
        body: ["Monthly Revenue", "+12.5% vs last month"],
        buttons: [],
        images: "Small icon (24px) representing the metric category"
      }
    },
    {
      id: "nav-sidebar",
      tag: "nav",
      name: "Sidebar Navigation",
      description: "Vertical navigation with icon+label items and active state",
      layout: "Vertical stack, full height, fixed width 240px, logo at top, nav items below",
      visualNotes: "Dark surface bg, active item has primary color left border + subtle bg tint",
      content: {
        headings: ["ScreenSlide"],
        body: ["Dashboard", "Analytics", "Components", "Settings"],
        buttons: [],
        images: "Lucide icons per nav item"
      }
    },
    {
      id: "data-table-card",
      tag: "card",
      name: "Data Table Card",
      description: "Card containing a simple data table with header row and zebra striping",
      layout: "Card wrapper with title bar, then table with 4 columns, 5 rows",
      visualNotes: "Surface background, header row slightly darker, hover highlight on rows",
      content: {
        headings: ["Recent Activity"],
        body: ["User", "Action", "Date", "Status"],
        buttons: ["View All"],
        images: "none"
      }
    }
  ]
};
```

**Mock dataset 2 — "Marketing Landing Page":**
- Tokens: light theme, bold typography, large radius
- Components: hero section, feature grid (3-col), testimonial card, CTA banner

**Mock dataset 3 — "Pricing Page":**
- Tokens: clean/minimal, tight spacing
- Components: pricing card (3 tiers), comparison table header, FAQ accordion item

**Mock generated components:**
For each component spec above, provide a hardcoded React component string. Example:

```javascript
export const mockGeneratedComponents = {
  "stat-card": `
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({
  icon: Icon,
  value = "$48.2K",
  label = "Monthly Revenue",
  trend = "+12.5%",
  trendUp = true
}) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 'calc(var(--spacing-unit) * 3)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {Icon && <Icon size={20} style={{ color: 'var(--color-primary)' }} />}
      </div>
      <div style={{ marginTop: 'calc(var(--spacing-unit) * 2)' }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-text)',
        }}>{value}</div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          marginTop: 'var(--spacing-unit)',
        }}>{label}</div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: 'calc(var(--spacing-unit) * 2)',
        fontSize: '0.8rem',
        color: trendUp ? '#10B981' : '#EF4444',
      }}>
        {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trend}
      </div>
    </div>
  );
}`,
  // ... similar for each component
};
```

**Mock slide structure:**
A hardcoded response for `analyzeSlideText` that returns a 5-slide plan using the mock components.

**Mock composed slides:**
Hardcoded JSX strings for each of the 5 slides.

### Key Rule

**Every feature must work in demo mode.** When building each phase, implement the mock path FIRST, verify the UI works, then wire up the real API call. This also serves as a spec — the mock data defines exactly what shape the real API responses need to match.

---

## Phase 1 — Project Scaffolding

**Goal**: Runnable app shell with tabs, stores, and API wrapper.

### Tasks

1. **Init Vite + React project**
   ```bash
   npm create vite@latest screenslide-ai -- --template react
   cd screenslide-ai
   npm install
   npm install tailwindcss @tailwindcss/vite zustand lucide-react
   ```

2. **Configure Tailwind** via Vite plugin (v4 style) in `vite.config.js`

3. **Create `App.jsx`** with two-tab layout:
   - Tab bar at top: "Component Extractor" | "Slide Builder"
   - Active tab state, clean transition between panels
   - Minimal, dark UI — the slides themselves should be the visual focus

4. **Create Zustand stores** (empty but typed):
   - `tokenStore.js` — holds `{ colors, typography, spacing, radius, raw }` with `setTokens`, `overrideToken` actions
   - `componentStore.js` — holds `{ components: [], tags: {} }` with `addComponent`, `tagComponent` actions

5. **Create `api/claude.js`** — wrapper module:
   - `analyzeScreenshot(base64Image)` → returns extracted tokens + component descriptions
   - `generateComponent(description, tokens)` → returns React component code string
   - `analyzeSlideText(rawText)` → returns suggested slide structure
   - `composeSlide(slideData, components, tokens)` → returns slide JSX
   - All calls use `claude-sonnet-4-20250514`, `max_tokens: 4096`
   - Every call includes a well-structured system prompt (defined in Phase 2/4)

6. **Env setup** — `.env` with `VITE_ANTHROPIC_API_KEY` (for local dev; in prod the key is handled server-side). If no key present, app auto-enables demo mode.

7. **Demo mode toggle** — Add a small toggle in the app header bar: "Demo Mode" / "Live AI". Reads initial state from env var presence. Persists choice in Zustand or simple React state.

8. **`api/mockData.js`** — Create the full mock data file as specified in the "Demo Mode" section above. This is the FIRST file to complete in the API layer — all UI development in Phases 2–5 should be testable against mocks before any real API call is wired up.

### Deliverable
App runs, two tabs render placeholder content, stores initialize, API module exports stubs, **demo mode toggle works, mock data file is complete**. All subsequent phases can be built and tested without an API key.

---

## Phase 2 — Screenshot Upload & Analysis (Extractor Tab)

**Goal**: Upload 1–3 screenshots, Claude Vision extracts tokens + identifies components.

### Tasks

1. **`ScreenshotUploader.jsx`**
   - Drag-and-drop zone + file picker, accepts PNG/JPG/WEBP
   - Shows thumbnail previews of uploaded images (max 3)
   - "Analyze" button triggers extraction
   - Loading state with progress indication per image

2. **Claude Vision API call** — `analyzeScreenshot(base64Image)`:

   **System prompt** (critical — this is the brain of extraction):
   ```
   You are a senior UI/UX engineer. Analyze this screenshot and return ONLY a JSON object with:

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
         "layout": "Description of layout structure (grid cols, flex direction, alignment)",
         "visualNotes": "Border treatments, shadows, gradients, icon usage, image shapes",
         "content": {
           "headings": ["text found"],
           "body": ["text found"],
           "buttons": ["text found"],
           "images": "description of image placement and style"
         }
       }
     ]
   }

   Be extremely specific about layout structures and visual treatments.
   Identify EVERY distinct component — even repeating patterns should be noted.
   For colors, sample the ACTUAL dominant colors, not guesses.
   ```

   Send each screenshot as a `type: "image"` content block with base64.

3. **Token merging logic** (`tokenResolver.js`):
   - When multiple screenshots are analyzed, merge tokens:
     - Colors: take most frequently occurring value per role, or average
     - Typography: majority vote on fonts, fallback to first screenshot
     - Spacing/radius: majority vote
   - Store merged result in `tokenStore`
   - Keep per-screenshot raw tokens for reference

4. **`AnalysisPanel.jsx`**
   - After analysis completes, display:
     - Extracted color palette (swatches)
     - Typography preview
     - List of identified components with tags
   - Each section is collapsible

5. **`TokenEditor.jsx`**
   - Editable override panel for every token
   - Color pickers for each color role
   - Font family dropdowns (Google Fonts subset)
   - Spacing/radius toggles
   - Changes are "overrides" — original extraction is preserved
   - Live-updates the preview

### Deliverable
User uploads screenshots → sees extracted tokens + component list. Can edit tokens. Data flows into Zustand stores.

---

## Phase 3 — Component Generation (Extractor Tab)

**Goal**: For each identified component, generate reusable React code.

### Tasks

1. **Component generation trigger**
   - After analysis, each component card has a "Generate Code" button
   - Also a "Generate All" batch button
   - Components generate one at a time (visible progress)

2. **Claude API call** — `generateComponent(componentDescription, tokens)`:

   **System prompt**:
   ```
   You are an expert React developer. Generate a single reusable React component based on this description.

   RULES:
   - Use React functional component with default export
   - Use Tailwind CSS utilities for ALL styling
   - Use these EXACT design tokens as CSS variables (they will be provided via a wrapper):
     --color-primary, --color-secondary, --color-accent, --color-bg, --color-surface,
     --color-text, --color-text-muted, --color-border
     --font-heading, --font-body
     --radius (in px)
     --spacing-unit (in px)
   - Reference tokens via: style={{ color: 'var(--color-primary)' }} or Tailwind arbitrary values
   - Component must accept props for ALL text content (headings, body, buttons, labels)
   - Provide sensible default props matching the original screenshot content
   - Include prop types as JSDoc comments
   - Make layout responsive
   - NO external dependencies beyond React and lucide-react icons
   - Return ONLY the component code, no markdown fences, no explanation

   Design tokens: ${JSON.stringify(tokens)}
   Component spec: ${JSON.stringify(componentDescription)}
   ```

3. **`ComponentCard.jsx`**
   - Shows: component tag badge, name, description
   - Before generation: preview placeholder
   - After generation: **live rendered preview** of the component + collapsible code viewer
   - "Regenerate" button to re-roll
   - "Edit Code" — inline code editor (simple textarea is fine for demo)
   - Copy code button

4. **Runtime component rendering**
   - Use `new Function()` or a sandboxed `<iframe>` approach to render generated JSX at runtime
   - Wrap rendered component in a `<TokenProvider>` that injects CSS variables from the token store
   - Recommended approach: render in an iframe with a mini React runtime to avoid polluting the main app

5. **`componentStore` updates**
   - Each generated component is stored as: `{ id, tag, name, code, description, generatedAt }`
   - Components are available to the Slide Builder tab

6. **Component registry** (`componentRegistry.js`)
   - Maps `tag` → component code
   - When slide builder requests a "card" component, registry returns the generated one
   - Fallback: if no component of that tag was extracted, use a simple default template

### Deliverable
All identified components are generated as React code, live-previewed, editable, and stored in the registry for the Slide Builder.

---

## Phase 4 — Slide Text Analysis & Structure (Builder Tab)

**Goal**: User pastes text, AI analyzes and suggests optimal slide structure.

### Tasks

1. **`TextInput.jsx`**
   - Large textarea for pasting structured slide text
   - Syntax hint above the input showing the expected format:
     ```
     ---
     [Slide Title]
     Content for this slide...
     - Bullet points if any
     Key stat: 42%
     ---
     [Next Slide Title]
     ...
     ```
   - "Analyze Structure" button
   - Also accepts freeform unstructured text — AI will segment it

2. **Claude API call** — `analyzeSlideText(rawText, availableComponents, availableTokens)`:

   **System prompt**:
   ```
   You are a presentation design strategist. Analyze this text and create the optimal slide structure.

   Available component types from the user's design system:
   ${JSON.stringify(availableComponentTags)}

   Return ONLY a JSON object:
   {
     "slides": [
       {
         "slideNumber": 1,
         "type": "title|content|two-column|image-text|stat-block|quote|closing",
         "title": "Slide title",
         "layout": "Description of recommended layout",
         "components": ["tag1", "tag2"],
         "content": {
           "heading": "...",
           "subheading": "...",
           "body": "..." or ["bullet1", "bullet2"],
           "stats": [{"value": "42%", "label": "Growth"}],
           "cta": "Button text if applicable",
           "notes": "Speaker notes or context"
         },
         "designNotes": "Why this layout works for this content"
       }
     ],
     "overallNarrative": "Brief analysis of the presentation flow",
     "suggestions": ["Any improvements to content or ordering"]
   }

   GUIDELINES:
   - Match component types to the available ones from the design system
   - Vary slide types — never use the same layout 3x in a row
   - Lead with impact — most important info first on each slide
   - Keep text per slide minimal — if content is dense, split across slides
   - Suggest where visuals/images would strengthen the message
   - If the input text is unstructured, segment it intelligently
   ```

3. **`AIStructurePanel.jsx`**
   - Displays the AI's suggested structure as an editable outline:
     - Each slide shows: number, type badge, title, assigned components
     - Drag to reorder slides
     - Click to edit slide type, reassign components
     - "AI suggestion" callout shows the design reasoning
   - "Accept & Generate" button to proceed
   - "Re-analyze" button to re-run with different instructions

4. **Slide type templates** (`slide-templates/`):

   Create 6 base templates that act as layout shells. These are NOT the final slides — they're layout containers that slot in the user's generated components:

   | Template | Layout Description |
   |---|---|
   | `TitleSlide` | Centered title + subtitle, full-bleed background, optional logo |
   | `ContentSlide` | Title top, body content area, optional sidebar |
   | `TwoColumnSlide` | 50/50 or 60/40 split, independent content per column |
   | `ImageTextSlide` | Image on one side, text block on the other |
   | `StatBlockSlide` | Grid of stat components (2–4), title above |
   | `ClosingSlide` | Centered CTA or closing message, minimal |

   Each template:
   - Accepts `tokens` prop and applies CSS variables
   - Has named `slots` where generated components are inserted
   - Has a 16:9 aspect ratio container (1280×720 or scaled)
   - Handles overflow gracefully

### Deliverable
User pastes text → AI returns structured slide plan → user can review/edit the plan before generation.

---

## Phase 5 — Slide Generation & Live Preview (Builder Tab)

**Goal**: Generate final slides, render live, enable tweaking.

### Tasks

1. **Slide composition** — `composeSlide(slideData, components, tokens)`:

   For each slide in the accepted structure:
   - Pick the matching template from `slide-templates/`
   - Inject the relevant generated components (by tag) into the template slots
   - Pass slide content (headings, body, stats) as props to the components
   - Apply design tokens as CSS variables on the slide wrapper

   **This step may or may not need another Claude call** depending on complexity:
   - **Simple case**: Template + component + content props = direct assembly (no AI needed)
   - **Complex case**: If the AI needs to adapt component usage or create slide-specific overrides, make a call:
     ```
     Given this slide template (${type}), these components (${code}), and this content (${JSON.stringify(content)}),
     compose a single React component that renders this slide.
     Apply these tokens: ${JSON.stringify(tokens)}.
     Return ONLY the JSX code.
     ```

2. **`SlidePreview.jsx`**
   - Renders each slide at 16:9 aspect ratio in a preview container
   - Scaled to fit the viewport (CSS `transform: scale()`)
   - Shows slide number overlay
   - Bordered frame to distinguish slide from app UI

3. **`SlideCarousel.jsx`**
   - Horizontal navigation: prev/next arrows + dot indicators
   - Thumbnail strip at the bottom showing all slides as mini-previews
   - Keyboard navigation (arrow keys)
   - Current slide index state

4. **Live preview loop (token tweaking)**
   - Token changes in `TokenEditor` (from Extractor tab or a mini version in Builder tab) immediately re-render all slides
   - Component code edits also trigger re-render
   - Debounced updates (300ms) to avoid jank

5. **Per-slide controls**
   - "Regenerate this slide" — re-runs composition for just this slide
   - "Change slide type" — dropdown to switch template
   - "Edit content" — inline edit the text content for this slide

### Deliverable
Full slide deck rendered live in the browser. User can navigate, tweak tokens, edit content, and see instant updates.

---

## Phase 6 — Figma Bridge & Export

**Goal**: Enable "Send to Figma" via Builder.io.

### Tasks

1. **Inject Builder.io script** in `index.html`:
   ```html
   <script src="https://cdn.builder.io/js/elements-api" async></script>
   ```

2. **`figmaBridge.js`** utility:
   - Function to serialize the currently rendered slide DOM to a Builder.io-compatible format
   - Trigger Builder.io's element capture on the slide container
   - Handle the Figma plugin handshake

3. **Export button** on each slide and a "Export All" button:
   - "Send to Figma" — triggers Builder.io capture
   - "Copy JSX" — copies the composed slide code
   - "Download HTML" — saves the slide as a standalone HTML file

4. **Standalone HTML export**:
   - For each slide (or all slides), generate a self-contained HTML file:
     - Inline the CSS variables (tokens)
     - Inline the component code
     - Include a minimal React CDN runtime
     - Wrap in 16:9 viewport

### Deliverable
User can push slides to Figma or download as standalone files.

---

## Phase 7 — Polish & UX

**Goal**: Make the demo feel complete and impressive.

### Tasks

1. **App shell design**
   - Dark mode UI (the slides are the star, not the app chrome)
   - Clean tab transitions (fade or slide)
   - Status indicators: extraction progress, generation progress, token sync status
   - Toast notifications for actions (copied, exported, regenerated)

2. **Empty states**
   - Extractor tab before upload: show example/tutorial flow
   - Builder tab before components exist: prompt user to extract first
   - Builder tab before text: show format example

3. **Error handling**
   - API failures: retry button + error message
   - Invalid screenshots: graceful message
   - Component render failures: fallback UI in the preview

4. **Keyboard shortcuts**
   - `Ctrl+Enter` to trigger analysis/generation
   - Arrow keys for slide navigation
   - `Ctrl+E` to export current slide

5. **Responsive layout**
   - App works on desktop (primary) and tablet
   - Slide preview scales proportionally

---

## API Call Summary

| Function | Input | Output | When Called |
|---|---|---|---|
| `analyzeScreenshot` | base64 image | tokens + component specs (JSON) | User clicks "Analyze" |
| `generateComponent` | component spec + tokens | React component code (string) | Per component, after analysis |
| `analyzeSlideText` | raw text + available components | slide structure plan (JSON) | User clicks "Analyze Structure" |
| `composeSlide` | slide data + component code + tokens | composed slide JSX (string) | Per slide, after structure accepted |

**Estimated API calls per full flow**: 3 (screenshots) + 6–10 (components) + 1 (text analysis) + 5–8 (slides) = **~15–22 calls**

---

## Design Tokens Schema

This is the canonical shape used across the entire app:

```typescript
interface DesignTokens {
  colors: {
    primary: string;      // Main brand color
    secondary: string;    // Supporting color
    accent: string;       // Highlight/CTA color
    background: string;   // Page/slide background
    surface: string;      // Card/component background
    textPrimary: string;  // Main text color
    textMuted: string;    // Secondary text color
    border: string;       // Border/divider color
  };
  typography: {
    headingFont: string;  // Google Font family for headings
    bodyFont: string;     // Google Font family for body text
    style: 'clean' | 'bold' | 'editorial' | 'playful' | 'corporate' | 'minimal';
  };
  spacing: 'tight' | 'default' | 'loose';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'pill';
}
```

---

## Build Order for Claude Code

Execute phases in order. Each phase should be a self-contained working increment:

```
Phase 1 → npm run dev shows app shell with tabs + demo mode toggle + mock data ready
Phase 2 → Upload screenshots, see extracted tokens + components (works in demo mode)
Phase 3 → Generate and preview React components (works in demo mode)
Phase 4 → Paste text, get AI-suggested slide structure (works in demo mode)
Phase 5 → See rendered slides, navigate, tweak (works in demo mode)
Phase 6 → Export to Figma / HTML / JSX
Phase 7 → Polish, error handling, empty states
```

**Rule: Every phase must be fully testable in demo mode before wiring up real API calls.**
