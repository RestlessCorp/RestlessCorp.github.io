"use client";

import { useEffect, useState } from "react";
import { decryptReport, type Report } from "@/lib/report";
import { ReportView } from "@/components/report-view";

// Remembering the unlock for the tab means switching between the report and the
// board does not ask again, while closing the tab forgets it.
const STORAGE_KEY = "yf-report-key";

export function Gate() {
  const [report, setReport] = useState<Report | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [restoring, setRestoring] = useState(true);

  const unlock = async (value: string, remember: boolean) => {
    setBusy(true);
    setError(null);
    try {
      const envelope = await fetch("report.enc").then((r) => {
        if (!r.ok) throw new Error("report.enc " + r.status);
        return r.json();
      });
      const decrypted = await decryptReport(envelope, value);
      if (remember) sessionStorage.setItem(STORAGE_KEY, value);
      setReport(decrypted);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      setError("Не підходить");
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

  if (report) return <ReportView report={report} />;

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] font-bold text-green">
          Yoga Fusion
        </p>
        <h1 className="display mt-3 text-4xl leading-none">Статус розробки</h1>
        <p className="mt-4 text-ink-soft">
          Сторінка закрита паролем. Його дає Андрій.
        </p>

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
            placeholder="пароль"
            aria-label="пароль"
            className="w-full rounded-2xl border border-ink/25 bg-surface px-5 py-3 text-ink outline-none placeholder:text-ink-soft focus:border-ink"
          />
          {error && <p className="mt-2 text-sm text-rose">{error}</p>}
          <button
            type="submit"
            disabled={busy || restoring || !passphrase}
            className="display mt-4 w-full rounded-full border border-ink bg-lime px-6 py-2.5 text-lg text-[#1a1a12] transition-colors hover:bg-green disabled:opacity-50 disabled:hover:bg-lime"
          >
            {busy || restoring ? "хвилинку…" : "відкрити"}
          </button>
        </form>
      </div>
    </main>
  );
}
