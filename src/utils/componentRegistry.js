/**
 * Maps component tags to the generated component code stored in componentStore.
 * Falls back to a simple placeholder if no component of that tag was extracted.
 */

export function getComponentByTag(tag, components) {
  const match = components.find((c) => c.tag === tag && c.code);
  return match || null;
}

export function getDefaultPlaceholder(tag) {
  return `import React from 'react';
export default function Placeholder({ heading = "${tag}", body = "Component not yet generated" }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px dashed var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 'calc(var(--spacing-unit) * 3)',
      color: 'var(--color-text-muted)',
      fontFamily: 'var(--font-body)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '0.75rem', marginBottom: '4px', opacity: 0.6 }}>[{heading}]</div>
      <div>{body}</div>
    </div>
  );
}`;
}
