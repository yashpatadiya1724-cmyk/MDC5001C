import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return `<code class="text-rose-500 font-mono">${math}</code>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`overflow-x-auto py-1 max-w-full text-center scrollbar-none touch-pan-x ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span 
      className={`inline-block align-middle max-w-full overflow-x-auto scrollbar-none touch-pan-x ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
