"use client";

import type { Lang } from "@/lib/i18n";

// Small pill toggle, same visual grammar as the rest of the page (rounded,
// lime accent for the active state). Lives in the header next to the title.
export function LangSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language / Мова"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-line-strong p-0.5"
    >
      {(["uk", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={
            "rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide transition-colors " +
            (lang === l
              ? "bg-lime text-[#1a1a12]"
              : "text-ink-soft hover:text-ink")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
