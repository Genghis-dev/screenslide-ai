import React, { useState } from 'react';
import { Layers, Zap } from 'lucide-react';
import ScreenshotUploader from './ScreenshotUploader';
import AnalysisPanel from './AnalysisPanel';
import TokenEditor from './TokenEditor';
import ComponentCard from './ComponentCard';
import { useTokenStore } from '../../stores/tokenStore';
import { useComponentStore } from '../../stores/componentStore';
import { analyzeScreenshot, generateComponent } from '../../api/gemini';
import { mergeTokens } from '../../utils/tokenResolver';

export default function ExtractorTab() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingIds, setAnalyzingIds] = useState(new Set());
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState(null);

  const { setTokens, addRawScreenshotTokens } = useTokenStore();
  const { components, addComponent, updateComponentCode } = useComponentStore();

  const handleAnalyze = async (files) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const results = await Promise.all(
        files.map(({ base64, mimeType, index }) =>
          analyzeScreenshot(base64, mimeType, index)
        )
      );

      // Merge tokens
      const allTokens = results.map((r) => r.tokens);
      const merged = mergeTokens(allTokens);
      setTokens(merged);
      results.forEach((r) => addRawScreenshotTokens(r.tokens));

      // Collect components (deduplicated by id)
      const seen = new Set();
      results.forEach((r) => {
        r.components?.forEach((comp) => {
          if (!seen.has(comp.id)) {
            seen.add(comp.id);
            addComponent(comp);
          }
        });
      });

      setAnalyzed(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async (component) => {
    const tokens = useTokenStore.getState().tokens;
    setAnalyzingIds((s) => new Set([...s, component.id]));
    try {
      const code = await generateComponent(component, tokens);
      updateComponentCode(component.id, code);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzingIds((s) => { const n = new Set(s); n.delete(component.id); return n; });
    }
  };

  const handleGenerateAll = async () => {
    const pending = components.filter((c) => !c.code);
    for (const comp of pending) {
      await handleGenerate(comp);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', padding: '24px', minHeight: 'calc(100vh - 60px)' }}>
      {/* Main area */}
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.2rem', margin: '0 0 8px' }}>
            Upload Screenshots
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', margin: 0 }}>
            Upload up to 3 screenshots. Gemini Vision will extract design tokens and identify reusable components.
          </p>
        </div>

        <ScreenshotUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

        {error && (
          <div style={{
            marginTop: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444',
            borderRadius: 'var(--radius)', padding: '12px 16px', color: '#EF4444',
            fontSize: '0.875rem', fontFamily: 'var(--font-body)',
          }}>
            {error}
          </div>
        )}

        {/* Components section */}
        {components.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} style={{ color: 'var(--color-primary)' }} />
                Extracted Components ({components.length})
              </h2>
              {components.some((c) => !c.code) && (
                <button
                  onClick={handleGenerateAll}
                  style={{
                    background: 'var(--color-accent)', color: '#000', border: 'none',
                    borderRadius: 'var(--radius)', padding: '8px 16px', fontSize: '0.85rem',
                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <Zap size={14} /> Generate All
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {components.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  component={comp}
                  onGenerate={handleGenerate}
                  onRegenerate={handleGenerate}
                  generating={analyzingIds.has(comp.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!analyzed && !isAnalyzing && components.length === 0 && (
          <div style={{
            marginTop: '48px', textAlign: 'center', color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            <Layers size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: '1rem', marginBottom: '8px' }}>No screenshots analyzed yet</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Upload screenshots above to extract your design system</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {analyzed && <AnalysisPanel />}
        <TokenEditor />
      </div>
    </div>
  );
}
