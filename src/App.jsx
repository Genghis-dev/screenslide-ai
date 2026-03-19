import React, { useState, useEffect } from 'react';
import { Layers, Presentation, FlaskConical, Zap } from 'lucide-react';
import ExtractorTab from './tabs/ExtractorTab/ExtractorTab';
import BuilderTab from './tabs/BuilderTab/BuilderTab';
import { isDemoMode, setDemoMode } from './api/gemini';
import { useTokenStore } from './stores/tokenStore';
import { tokensToCSSVars } from './utils/tokenResolver';

const TABS = [
  { id: 'extractor', label: 'Component Extractor', icon: Layers },
  { id: 'builder', label: 'Slide Builder', icon: Presentation },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('extractor');
  const [demoMode, setDemo] = useState(isDemoMode());
  const tokens = useTokenStore((s) => s.tokens);
  const cssVars = tokensToCSSVars(tokens);

  // Apply token CSS variables to root
  useEffect(() => {
    const style = document.documentElement.style;
    const entries = cssVars.trim().split(';').filter(Boolean);
    entries.forEach((entry) => {
      const [prop, ...rest] = entry.split(':');
      const val = rest.join(':');
      if (prop && val) style.setProperty(prop.trim(), val.trim());
    });
  }, [cssVars]);

  const toggleDemo = () => {
    const next = !demoMode;
    setDemoMode(next);
    setDemo(next);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)',
        padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px', background: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>
            ScreenSlide <span style={{ color: 'var(--color-primary)' }}>AI</span>
          </span>
        </div>

        {/* Tabs */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                background: activeTab === id ? 'rgba(99,102,241,0.12)' : 'transparent',
                color: activeTab === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                border: activeTab === id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                borderRadius: '6px', padding: '6px 14px', fontSize: '0.85rem',
                fontFamily: 'var(--font-body)', cursor: 'pointer', fontWeight: activeTab === id ? 600 : 400,
                display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        {/* Demo mode toggle */}
        <button
          onClick={toggleDemo}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: demoMode ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${demoMode ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`,
            borderRadius: '6px', padding: '6px 12px', cursor: 'pointer',
            color: demoMode ? '#F59E0B' : '#10B981', fontSize: '0.8rem',
            fontFamily: 'var(--font-body)', fontWeight: 600,
          }}
        >
          <FlaskConical size={13} />
          {demoMode ? 'Demo Mode' : 'Live AI'}
        </button>
      </header>

      {/* Tab content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'extractor' && <ExtractorTab />}
        {activeTab === 'builder' && <BuilderTab />}
      </main>
    </div>
  );
}
