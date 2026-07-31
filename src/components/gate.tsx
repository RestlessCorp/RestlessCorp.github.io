"use client";

import { useEffect, useState } from "react";
import { decryptReport, type Report } from "@/lib/report";
import { ReportView } from "@/components/report-view";
import { ui, useLang } from "@/lib/i18n";
import { LangSwitch } from "@/components/lang-switch";

// Remembering the unlock for the tab means switching between the report and the
// board does not ask again, while closing the tab forgets it.
const STORAGE_KEY = "yf-report-key";

export function Gate() {
  const [report, setReport] = useState<Report | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [lang, setLang] = useLang();
  const t = ui[lang];

  const unlock = async (value: string, remember: boolean) => {
    setBusy(true);
    setError(null);
    try {
      // `no-store` тут не перестраховка. GitHub Pages віддає report.enc з
      // `Cache-Control: max-age=600`, тож браузер, який уже відкривав звіт,
      // до десяти хвилин показував би стару версію — і саме в ті хвилини,
      // коли людині сказали «звіт оновлено, подивись». Звіт маленький і
      // читається раз на день; свіжість тут дорожча за економію запиту.
      const envelope = await fetch("report.enc", { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error("report.enc " + r.status);
        return r.json();
      });
      const decrypted = await decryptReport(envelope, value);
      if (remember) sessionStorage.setItem(STORAGE_KEY, value);
      setReport(decrypted);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      setError(t.wrongPassword);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setRestoring(false);
      return;
    }
    unlock(saved, false).finally(() => setRestoring(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (report) return <ReportView report={report} lang={lang} setLang={setLang} />;

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] font-bold text-green">
            Yoga Fusion
          </p>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <h1 className="display mt-3 text-4xl leading-none">
          {t.statusTitle}
        </h1>
        <p className="mt-4 text-ink-soft">{t.gateIntro}</p>

        <form
          className="mt-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (passphrase) unlock(passphrase, true);
          }}
        >
          <input
            type="password"
            autoFocus
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder={t.passwordPlaceholder}
            aria-label={t.passwordPlaceholder}
            className="w-full rounded-2xl border border-ink/25 bg-surface px-5 py-3 text-ink outline-none placeholder:text-ink-soft focus:border-ink"
          />
          {error && <p className="mt-2 text-sm text-rose">{error}</p>}
          <button
            type="submit"
            disabled={busy || restoring || !passphrase}
            className="display mt-4 w-full rounded-full border border-ink bg-lime px-6 py-2.5 text-lg text-[#1a1a12] transition-colors hover:bg-green disabled:opacity-50 disabled:hover:bg-lime"
          >
            {busy || restoring ? t.busy : t.openButton}
          </button>
        </form>
      </div>
    </main>
  );
}
