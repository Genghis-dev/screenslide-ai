import React, { useState } from 'react';
import { Layers, Presentation } from 'lucide-react';
import TextInput from './TextInput';
import AIStructurePanel from './AIStructurePanel';
import SlidePreview from './SlidePreview';
import SlideCarousel from './SlideCarousel';
import { useComponentStore } from '../../stores/componentStore';
import { useTokenStore } from '../../stores/tokenStore';
import { analyzeSlideText, composeSlide } from '../../api/gemini';

export default function BuilderTab() {
  const [step, setStep] = useState('input'); // 'input' | 'structure' | 'preview'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [structure, setStructure] = useState(null);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState(null);

  const { components } = useComponentStore();
  const { tokens } = useTokenStore();

  const handleAnalyzeText = async (text) => {
    setRawText(text);
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeSlideText(text, components);
      setStructure(result);
      setStep('structure');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptStructure = async (acceptedStructure) => {
    setIsComposing(true);
    setError(null);
    setStep('preview');
    setSlides(acceptedStructure.slides.map((s) => ({ ...s, jsx: null })));
    setCurrentSlideIndex(0);

    try {
      // Compose slides one by one
      for (const slideData of acceptedStructure.slides) {
        const jsx = await composeSlide(slideData, components, tokens);
        setSlides((prev) =>
          prev.map((s) => s.slideNumber === slideData.slideNumber ? { ...s, jsx } : s)
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsComposing(false);
    }
  };

  const handleReanalyze = () => {
    setStep('input');
    setStructure(null);
  };

  // Empty state: no components extracted yet
  const noComponents = components.length === 0;

  return (
    <div style={{ padding: '24px', minHeight: 'calc(100vh - 60px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.2rem', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Presentation size={20} style={{ color: 'var(--color-primary)' }} />
          Slide Builder
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', margin: 0 }}>
          Paste your slide content and AI will structure it into a branded slide deck using your extracted components.
        </p>
      </div>

      {/* Prompt to extract first */}
      {noComponents && (
        <div style={{
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 'var(--radius)', padding: '16px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <Layers size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', color: '#F59E0B', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>
              No components extracted yet
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              Go to the Component Extractor tab to upload screenshots and extract your design system. The builder works without components too — it will use default templates.
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444',
          borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '16px',
          color: '#EF4444', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
        }}>
          {error}
        </div>
      )}

      {/* Step: Input */}
      {step === 'input' && (
        <TextInput onAnalyze={handleAnalyzeText} isAnalyzing={isAnalyzing} />
      )}

      {/* Step: Structure review */}
      {step === 'structure' && structure && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1rem', margin: '0 0 16px' }}>
            AI Suggested Structure
          </h3>
          <AIStructurePanel
            structure={structure}
            onAccept={handleAcceptStructure}
            onReanalyze={handleReanalyze}
          />
        </div>
      )}

      {/* Step: Preview */}
      {step === 'preview' && slides.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1rem', margin: 0 }}>
              {slides[currentSlideIndex]?.title || `Slide ${currentSlideIndex + 1}`}
              {isComposing && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '12px' }}>Generating slides…</span>}
            </h3>
            <button
              onClick={() => { setStep('input'); setSlides([]); }}
              style={{
                background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)', padding: '6px 14px', fontSize: '0.8rem',
                cursor: 'pointer', fontFamily: 'var(--font-body)',
              }}
            >
              Start over
            </button>
          </div>

          <div style={{ maxWidth: '900px' }}>
            <SlidePreview
              slide={slides[currentSlideIndex]}
              slideNumber={currentSlideIndex + 1}
              totalSlides={slides.length}
            />
            <SlideCarousel
              slides={slides}
              currentIndex={currentSlideIndex}
              onNavigate={setCurrentSlideIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
}
