// ============================================================
// Mock Dataset 1 — SaaS Dashboard
// ============================================================
export const mockAnalysis1 = {
  tokens: {
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
  },
  components: [
    {
      id: 'stat-card',
      tag: 'stat-block',
      name: 'Metric Card',
      description: 'Card showing a KPI with value, label, and trend indicator',
      layout: 'Vertical stack: icon top-left, large number, label below, trend badge bottom-right',
      visualNotes: 'Surface background, subtle border, small shadow, green/red trend arrows',
      content: {
        headings: ['$48.2K'],
        body: ['Monthly Revenue', '+12.5% vs last month'],
        buttons: [],
        images: 'Small icon (24px) representing the metric category',
      },
    },
    {
      id: 'nav-sidebar',
      tag: 'nav',
      name: 'Sidebar Navigation',
      description: 'Vertical navigation with icon+label items and active state',
      layout: 'Vertical stack, full height, fixed width 240px, logo at top, nav items below',
      visualNotes: 'Dark surface bg, active item has primary color left border + subtle bg tint',
      content: {
        headings: ['ScreenSlide'],
        body: ['Dashboard', 'Analytics', 'Components', 'Settings'],
        buttons: [],
        images: 'Lucide icons per nav item',
      },
    },
    {
      id: 'data-table-card',
      tag: 'card',
      name: 'Data Table Card',
      description: 'Card containing a simple data table with header row and zebra striping',
      layout: 'Card wrapper with title bar, then table with 4 columns, 5 rows',
      visualNotes: 'Surface background, header row slightly darker, hover highlight on rows',
      content: {
        headings: ['Recent Activity'],
        body: ['User', 'Action', 'Date', 'Status'],
        buttons: ['View All'],
        images: 'none',
      },
    },
  ],
};

// ============================================================
// Mock Dataset 2 — Marketing Landing Page
// ============================================================
export const mockAnalysis2 = {
  tokens: {
    colors: {
      primary: '#7C3AED',
      secondary: '#10B981',
      accent: '#F97316',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      textPrimary: '#111827',
      textMuted: '#6B7280',
      border: '#E5E7EB',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      style: 'bold',
    },
    spacing: 'loose',
    radius: 'lg',
  },
  components: [
    {
      id: 'hero-section',
      tag: 'hero',
      name: 'Hero Section',
      description: 'Full-width hero with headline, subheadline, CTA button, and illustration',
      layout: 'Two-column: text left 60%, illustration right 40%, centered vertically',
      visualNotes: 'Gradient background, large bold headline, secondary CTA link below button',
      content: {
        headings: ['Ship faster with AI'],
        body: ['The platform that helps design teams move from mockup to production in minutes.'],
        buttons: ['Start free trial', 'Watch demo'],
        images: 'Product screenshot or illustration on right side',
      },
    },
    {
      id: 'feature-grid',
      tag: 'feature-grid',
      name: 'Feature Grid',
      description: '3-column grid of feature cards with icon, title, and description',
      layout: '3-col grid, equal width cards, icon top, title, then description',
      visualNotes: 'Light surface cards, colored icon backgrounds (subtle), bottom border on hover',
      content: {
        headings: ['Visual Editor', 'AI Generation', 'Export Anywhere'],
        body: ['Drag and drop interface', 'Generate components instantly', 'Figma, Code, or HTML'],
        buttons: [],
        images: 'Lucide icons in colored circles',
      },
    },
    {
      id: 'testimonial-card',
      tag: 'testimonial',
      name: 'Testimonial Card',
      description: 'Customer quote with avatar, name, and company',
      layout: 'Centered card, quote text, avatar + name below, star rating above',
      visualNotes: 'White card on gray bg, large quotation marks, subtle shadow',
      content: {
        headings: ['"This tool saved us 40 hours per week"'],
        body: ['Sarah Chen — Head of Design at Acme Corp'],
        buttons: [],
        images: 'Round avatar photo, 48px',
      },
    },
    {
      id: 'cta-banner',
      tag: 'cta',
      name: 'CTA Banner',
      description: 'Full-width banner with headline and primary CTA button',
      layout: 'Centered content, headline, subtext, button — all centered',
      visualNotes: 'Purple gradient background, white text, white button with dark text',
      content: {
        headings: ['Ready to get started?'],
        body: ['Join 10,000+ teams already using ScreenSlide AI'],
        buttons: ['Get started free'],
        images: 'none',
      },
    },
  ],
};

// ============================================================
// Mock Dataset 3 — Pricing Page
// ============================================================
export const mockAnalysis3 = {
  tokens: {
    colors: {
      primary: '#2563EB',
      secondary: '#64748B',
      accent: '#059669',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      textPrimary: '#0F172A',
      textMuted: '#64748B',
      border: '#E2E8F0',
    },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      style: 'corporate',
    },
    spacing: 'tight',
    radius: 'sm',
  },
  components: [
    {
      id: 'pricing-card',
      tag: 'pricing',
      name: 'Pricing Card',
      description: '3-tier pricing card with features list and CTA',
      layout: 'Vertical card, plan name, price, features list, CTA button at bottom',
      visualNotes: 'Middle card (Pro) has primary color border and "Popular" badge, others are neutral',
      content: {
        headings: ['Starter', 'Pro', 'Enterprise'],
        body: ['$0/mo', '$49/mo', 'Custom'],
        buttons: ['Get started', 'Start free trial', 'Contact sales'],
        images: 'none',
      },
    },
    {
      id: 'faq-accordion',
      tag: 'list',
      name: 'FAQ Accordion',
      description: 'Expandable FAQ item with question and answer',
      layout: 'Full-width row: question text left, chevron icon right, answer below when open',
      visualNotes: 'Bottom border divider, smooth expand animation, accent color chevron when open',
      content: {
        headings: ['How does billing work?'],
        body: ['You are billed monthly or annually. Cancel anytime.'],
        buttons: [],
        images: 'none',
      },
    },
  ],
};

// ============================================================
// Mock generated component code
// ============================================================
export const mockGeneratedComponents = {
  'stat-card': `import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

/** @param {{ icon: React.ElementType, value: string, label: string, trend: string, trendUp: boolean }} props */
export default function MetricCard({
  icon: Icon = DollarSign,
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
      minWidth: '200px',
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

  'nav-sidebar': `import React from 'react';
import { LayoutDashboard, BarChart2, Box, Settings } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', icon: BarChart2 },
  { label: 'Components', icon: Box },
  { label: 'Settings', icon: Settings },
];

/** @param {{ brand: string, activeItem: string }} props */
export default function SidebarNav({ brand = "ScreenSlide", activeItem = "Dashboard" }) {
  return (
    <nav style={{
      background: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      width: '240px',
      minHeight: '100%',
      padding: 'calc(var(--spacing-unit) * 2)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--color-text)',
        padding: 'calc(var(--spacing-unit) * 2)',
        marginBottom: 'var(--spacing-unit)',
      }}>{brand}</div>
      {navItems.map(({ label, icon: Icon }) => (
        <div key={label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'calc(var(--spacing-unit) * 1.5)',
          padding: 'calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2)',
          borderRadius: 'var(--radius)',
          borderLeft: label === activeItem ? '3px solid var(--color-primary)' : '3px solid transparent',
          background: label === activeItem ? 'rgba(99,102,241,0.1)' : 'transparent',
          color: label === activeItem ? 'var(--color-primary)' : 'var(--color-text-muted)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-body)',
        }}>
          <Icon size={18} />
          {label}
        </div>
      ))}
    </nav>
  );
}`,

  'data-table-card': `import React from 'react';

const defaultRows = [
  { user: 'Alice M.', action: 'Exported slide', date: 'Mar 18', status: 'Done' },
  { user: 'Bob K.', action: 'Generated component', date: 'Mar 18', status: 'Done' },
  { user: 'Carol S.', action: 'Analyzed screenshot', date: 'Mar 17', status: 'Done' },
  { user: 'Dave L.', action: 'Pushed to Figma', date: 'Mar 17', status: 'Pending' },
  { user: 'Eve R.', action: 'Edited tokens', date: 'Mar 16', status: 'Done' },
];

/** @param {{ title: string, rows: Array<{user:string,action:string,date:string,status:string}> }} props */
export default function DataTableCard({ title = "Recent Activity", rows = defaultRows }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}>{title}</span>
        <button style={{
          background: 'transparent',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          color: 'var(--color-text-muted)',
          padding: '4px 12px',
          fontSize: '0.8rem',
          cursor: 'pointer',
        }}>View All</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
            {['User', 'Action', 'Date', 'Status'].map(h => (
              <th key={h} style={{ padding: 'calc(var(--spacing-unit) * 1.5)', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: '1px solid var(--color-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: 'calc(var(--spacing-unit) * 1.5)', color: 'var(--color-text)' }}>{row.user}</td>
              <td style={{ padding: 'calc(var(--spacing-unit) * 1.5)', color: 'var(--color-text-muted)' }}>{row.action}</td>
              <td style={{ padding: 'calc(var(--spacing-unit) * 1.5)', color: 'var(--color-text-muted)' }}>{row.date}</td>
              <td style={{ padding: 'calc(var(--spacing-unit) * 1.5)' }}>
                <span style={{
                  background: row.status === 'Done' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                  color: row.status === 'Done' ? '#10B981' : '#F59E0B',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                }}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,

  'hero-section': `import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

/** @param {{ heading: string, subheading: string, ctaPrimary: string, ctaSecondary: string }} props */
export default function HeroSection({
  heading = "Ship faster with AI",
  subheading = "The platform that helps design teams move from mockup to production in minutes.",
  ctaPrimary = "Start free trial",
  ctaSecondary = "Watch demo",
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 6)',
      background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%)',
      borderRadius: 'var(--radius)',
      gap: 'calc(var(--spacing-unit) * 4)',
    }}>
      <div style={{ flex: '0 0 55%' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '3.5rem',
          fontWeight: 800,
          color: 'var(--color-text)',
          lineHeight: 1.1,
          margin: '0 0 calc(var(--spacing-unit) * 2)',
        }}>{heading}</h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
          margin: '0 0 calc(var(--spacing-unit) * 4)',
        }}>{subheading}</p>
        <div style={{ display: 'flex', gap: 'calc(var(--spacing-unit) * 2)', alignItems: 'center' }}>
          <button style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: 'calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>{ctaPrimary} <ArrowRight size={16} /></button>
          <button style={{
            background: 'transparent',
            color: 'var(--color-text-muted)',
            border: 'none',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}><Play size={14} /> {ctaSecondary}</button>
        </div>
      </div>
      <div style={{
        flex: '0 0 40%',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'calc(var(--radius) * 1.5)',
        aspectRatio: '16/10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
      }}>Product Screenshot</div>
    </div>
  );
}`,

  'pricing-card': `import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for individuals',
    features: ['5 screenshots/mo', '10 components', 'Basic export', 'Email support'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    description: 'For growing teams',
    features: ['Unlimited screenshots', 'Unlimited components', 'Figma export', 'Priority support', 'Custom tokens'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: ['Everything in Pro', 'SSO', 'Custom AI models', 'SLA guarantee', 'Dedicated support'],
    cta: 'Contact sales',
    highlighted: false,
  },
];

/** @param {{ tiers: Array }} props */
export default function PricingCard({ tiers: customTiers = tiers }) {
  return (
    <div style={{ display: 'flex', gap: 'calc(var(--spacing-unit) * 3)', justifyContent: 'center', flexWrap: 'wrap' }}>
      {customTiers.map((tier) => (
        <div key={tier.name} style={{
          background: 'var(--color-surface)',
          border: tier.highlighted ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
          padding: 'calc(var(--spacing-unit) * 4)',
          minWidth: '220px',
          flex: '1',
          position: 'relative',
        }}>
          {tier.highlighted && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '2px 12px',
              borderRadius: '999px',
            }}>Popular</div>
          )}
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)' }}>{tier.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'calc(var(--spacing-unit) * 2)' }}>{tier.description}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: 'calc(var(--spacing-unit) * 3)' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{tier.price}</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{tier.period}</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 calc(var(--spacing-unit) * 3)' }}>
            {tier.features.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-unit)', fontSize: '0.875rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                <Check size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
          <button style={{
            width: '100%',
            background: tier.highlighted ? 'var(--color-primary)' : 'transparent',
            color: tier.highlighted ? '#fff' : 'var(--color-text)',
            border: tier.highlighted ? 'none' : '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            padding: 'calc(var(--spacing-unit) * 1.5)',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}>{tier.cta}</button>
        </div>
      ))}
    </div>
  );
}`,
};

// Which analysis to return based on "screenshot index"
const analyses = [mockAnalysis1, mockAnalysis2, mockAnalysis3];

export function mockAnalyzeScreenshot(base64Image, index = 0) {
  return analyses[index % analyses.length];
}

export function mockGenerateComponent(description) {
  const code = mockGeneratedComponents[description.id];
  if (code) return code;
  // Generic fallback
  return `import React from 'react';
export default function ${description.name?.replace(/\s+/g, '') || 'Component'}(props) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 'calc(var(--spacing-unit) * 3)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-body)',
    }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>${description.name}</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>${description.description}</p>
    </div>
  );
}`;
}

// ============================================================
// Mock slide structure for analyzeSlideText
// ============================================================
export const mockSlideStructure = {
  slides: [
    {
      slideNumber: 1,
      type: 'title',
      title: 'ScreenSlide AI',
      layout: 'Centered title with gradient background and tagline',
      components: ['hero'],
      content: {
        heading: 'ScreenSlide AI',
        subheading: 'Screenshot → Components → Slides in minutes',
        body: null,
        stats: [],
        cta: 'Get Started',
        notes: 'Opening slide — focus on the value prop',
      },
      designNotes: 'Title slides benefit from a single bold statement. Use the hero component for maximum impact.',
    },
    {
      slideNumber: 2,
      type: 'stat-block',
      title: 'Results That Matter',
      layout: '3-column stat grid with title above',
      components: ['stat-block'],
      content: {
        heading: 'Results That Matter',
        subheading: 'Teams using ScreenSlide AI report:',
        body: null,
        stats: [
          { value: '10x', label: 'Faster prototyping' },
          { value: '80%', label: 'Less design handoff time' },
          { value: '3min', label: 'Screenshot to component' },
        ],
        cta: null,
        notes: 'Lead with concrete numbers — these are your strongest proof points',
      },
      designNotes: 'Stat slides are high-impact — use 3 stats max to avoid dilution.',
    },
    {
      slideNumber: 3,
      type: 'two-column',
      title: 'How It Works',
      layout: 'Two-column: steps left, visual right',
      components: ['card', 'feature-grid'],
      content: {
        heading: 'How It Works',
        subheading: null,
        body: ['1. Upload your screenshots', '2. AI extracts design tokens + components', '3. Paste your slide text', '4. Get a fully designed deck'],
        stats: [],
        cta: null,
        notes: 'Process slides benefit from numbered steps',
      },
      designNotes: 'Two-column layout keeps steps readable while showing the product.',
    },
    {
      slideNumber: 4,
      type: 'content',
      title: 'Built for Design Teams',
      layout: 'Title + bullet points with feature cards below',
      components: ['card'],
      content: {
        heading: 'Built for Design Teams',
        subheading: 'Everything your team needs',
        body: ['Real-time token editing', 'Component library extraction', 'One-click Figma export', 'Collaborative slide building'],
        stats: [],
        cta: null,
        notes: 'Feature slides should be concrete, not abstract',
      },
      designNotes: 'Content slides with bullets need strong visual hierarchy — use the card component for feature callouts.',
    },
    {
      slideNumber: 5,
      type: 'closing',
      title: 'Get Started Today',
      layout: 'Centered CTA with headline and button',
      components: ['cta'],
      content: {
        heading: 'Ready to transform your design workflow?',
        subheading: 'Join 10,000+ teams already using ScreenSlide AI',
        body: null,
        stats: [],
        cta: 'Start free trial',
        notes: 'Closing slides should have one clear action',
      },
      designNotes: 'Closing slides work best with a single, clear CTA — no competing elements.',
    },
  ],
  overallNarrative: 'Classic 5-slide SaaS pitch: hook → proof → process → features → CTA. Each slide has one job.',
  suggestions: [
    'Consider adding a "Social Proof" slide between Stats and How It Works',
    'The closing CTA could include a QR code for live demos',
  ],
};

// ============================================================
// Mock composed slide JSX (pre-assembled slides)
// ============================================================
export const mockComposedSlides = [
  {
    slideNumber: 1,
    type: 'title',
    jsx: `<div style={{
  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
  height:'100%',background:'linear-gradient(135deg,#0F172A 0%,#1E293B 100%)',
  textAlign:'center',padding:'60px',
}}>
  <div style={{fontFamily:'var(--font-body)',fontSize:'0.9rem',letterSpacing:'0.2em',color:'var(--color-primary)',textTransform:'uppercase',marginBottom:'24px'}}>Introducing</div>
  <h1 style={{fontFamily:'var(--font-heading)',fontSize:'4rem',fontWeight:800,color:'var(--color-text)',margin:'0 0 16px',lineHeight:1.1}}>ScreenSlide AI</h1>
  <p style={{fontFamily:'var(--font-body)',fontSize:'1.4rem',color:'var(--color-text-muted)',margin:'0 0 48px',maxWidth:'600px'}}>Screenshot → Components → Slides in minutes</p>
  <button style={{background:'var(--color-primary)',color:'#fff',border:'none',borderRadius:'var(--radius)',padding:'16px 40px',fontSize:'1.1rem',fontWeight:600,cursor:'pointer'}}>Get Started</button>
</div>`,
  },
  {
    slideNumber: 2,
    type: 'stat-block',
    jsx: `<div style={{height:'100%',background:'var(--color-bg)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px'}}>
  <h2 style={{fontFamily:'var(--font-heading)',fontSize:'2.5rem',fontWeight:700,color:'var(--color-text)',marginBottom:'16px'}}>Results That Matter</h2>
  <p style={{color:'var(--color-text-muted)',marginBottom:'48px',fontSize:'1.1rem',fontFamily:'var(--font-body)'}}>Teams using ScreenSlide AI report:</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'32px',width:'100%',maxWidth:'800px'}}>
    {[{value:'10x',label:'Faster prototyping'},{value:'80%',label:'Less handoff time'},{value:'3min',label:'Screenshot to component'}].map(s=>(
      <div key={s.value} style={{background:'var(--color-surface)',border:'1px solid var(--color-border)',borderRadius:'var(--radius)',padding:'40px 24px',textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-heading)',fontSize:'3.5rem',fontWeight:800,color:'var(--color-primary)'}}>{s.value}</div>
        <div style={{fontFamily:'var(--font-body)',color:'var(--color-text-muted)',marginTop:'8px'}}>{s.label}</div>
      </div>
    ))}
  </div>
</div>`,
  },
];
