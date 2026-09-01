import type { ReactNode } from "react";

const INLINE_MARKUP = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function ContentText({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  const parts = text.split(INLINE_MARKUP);

  return parts.map((part, index): ReactNode => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="font-mono text-[0.92em] text-ink">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}
