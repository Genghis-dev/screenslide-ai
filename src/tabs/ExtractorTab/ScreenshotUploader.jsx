import React, { useRef, useState } from 'react';
import { Upload, ImagePlus, X, Loader2 } from 'lucide-react';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ScreenshotUploader({ onAnalyze, isAnalyzing }) {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    const valid = Array.from(incoming)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, 3 - files.length);
    setFiles((prev) => [...prev, ...valid].slice(0, 3));
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleAnalyze = async () => {
    if (!files.length) return;
    const processed = await Promise.all(
      files.map(async (file, i) => ({
        base64: await toBase64(file),
        mimeType: file.type,
        index: i,
        name: file.name,
      }))
    );
    onAnalyze(processed);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => files.length < 3 && inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius)',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: files.length < 3 ? 'pointer' : 'default',
          background: dragging ? 'rgba(99,102,241,0.05)' : 'transparent',
          transition: 'all 0.2s',
        }}
      >
        <Upload size={32} style={{ color: 'var(--color-text-muted)', margin: '0 auto 12px' }} />
        <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
          Drop screenshots here or click to upload
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
          PNG, JPG, or WEBP — up to 3 screenshots
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Thumbnails */}
      {files.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          {files.map((file, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{
                  width: '120px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--color-border)',
                }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#EF4444',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                <X size={10} />
              </button>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name}
              </div>
            </div>
          ))}
          {files.length < 3 && (
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                width: '120px',
                height: '80px',
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--radius)',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '0.75rem',
              }}
            >
              <ImagePlus size={20} />
              Add more
            </button>
          )}
        </div>
      )}

      {/* Analyze button */}
      {files.length > 0 && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          style={{
            marginTop: '20px',
            background: isAnalyzing ? 'var(--color-surface)' : 'var(--color-primary)',
            color: isAnalyzing ? 'var(--color-text-muted)' : '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '12px 28px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: isAnalyzing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
          }}
        >
          {isAnalyzing ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : `Analyze ${files.length} Screenshot${files.length > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  );
}
