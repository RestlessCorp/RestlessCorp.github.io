"use client";

import { useState } from "react";
import type { Report } from "@/lib/report";
import { Roadmap } from "@/components/roadmap";
import { t, ui, type Lang } from "@/lib/i18n";
import { LangSwitch } from "@/components/lang-switch";

// Same colour grammar as the internal report: rose for what needs a decision,
// amber for in flight, green for done, muted for later.
const COLUMN_TONE: Record<string, string> = {
  decision: "text-rose border-rose",
  progress: "text-amber border-amber",
  next: "text-green border-green",
  later: "text-ink-soft border-line-strong",
  resolved: "text-ink-soft border-line-strong",
};

// Settled questions are history, not work: the pile grows for good and would
// otherwise bury the three columns anyone actually opens the board for. It
// stays one click away, with its count visible while closed.
const COLLAPSED_COLUMNS = new Set(["resolved"]);

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-4 py-4">
      <div className="display text-3xl leading-none tabular-nums">{value}</div>
      <div className="mt-2 text-xs text-ink-soft">{label}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display inline-block border-b-2 border-lime pb-2 text-2xl">
      {children}
    </h2>
  );
}

export function ReportView({
  report,
  lang,
  setLang,
}: {
  report: Report;
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const [tab, setTab] = useState<
    "report" | "board" | "roadmap"
  >("report");
  const [openColumns, setOpenColumns] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const toggleColumn = (id: string) =>
    setOpenColumns((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const { totals } = report;
  const copy = ui[lang];

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:pt-14">
      <header>
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] font-bold text-green">
            {report.project} · {copy.forTeam}
          </p>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
        <h1 className="display mt-3 text-4xl leading-none sm:text-5xl">
          {copy.statusTitle}
        </h1>
        <p className="mt-4 text-ink-soft">
          {t(report.subtitle, lang)} · {copy.updatedLabel} {report.updatedAt}
        </p>
      </header>

      {/* Прогрес по початковому ТЗ прибраний: він перестав описувати роботу.
          Половина зробленого в ТЗ не значилась узагалі (імпорт розкладу
          текстом, власна панель, аналітика воронки), а частина пунктів ТЗ
          втратила сенс. Що лишилось із нього — видно на дошці. */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <Stat value={String(totals.hoursTotal)} label={copy.statHoursTotal} />
        <Stat value={String(totals.shipped)} label={copy.statShipped} />
        <Stat value={String(totals.pending)} label={copy.statPending} />
      </div>

      <nav className="mt-9 flex gap-2 border-b border-line" role="tablist">
        {(
          [
            ["report", copy.tabReport],
            ["board", copy.tabBoard],
            ["roadmap", copy.tabRoadmap],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={
              "-mb-px border-b-2 px-4 py-2 font-bold " +
              (tab === key
                ? "border-lime text-ink"
                : "border-transparent text-ink-soft hover:text-ink")
            }
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "report" && (
        <>
          <section className="mt-9">
            <SectionTitle>{t(report.release.title, lang)}</SectionTitle>
            <p className="mt-3 text-sm text-ink-soft">
              {t(report.release.note, lang)}
            </p>
            <div className="mt-5 grid gap-3">
              {report.release.items.map((item) => (
                <article
                  key={t(item.title, lang)}
                  className="rounded-2xl border border-line border-l-[3px] border-l-amber bg-surface-2 px-5 py-4"
                >
                  <h3 className="font-bold">{t(item.title, lang)}</h3>
                  <p className="mt-2 text-[0.93rem]">{t(item.text, lang)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionTitle>{copy.weeksTitle}</SectionTitle>
            <p className="mt-3 text-sm text-ink-soft">{copy.weeksDesc}</p>
            <div className="mt-5 grid gap-4">
              {report.weeks.map((week, index) => (
                <details
                  key={week.id}
                  open={index === 0}
                  className="rounded-2xl border border-line bg-surface px-5 py-4"
                >
                  <summary className="flex cursor-pointer items-baseline justify-between gap-3">
                    <span className="display text-xl">
                      {t(week.label, lang)}
                    </span>
                    <span className="shrink-0 rounded-full border border-green px-3 py-0.5 text-xs font-bold tabular-nums text-green">
                      {week.hours} {copy.hoursSuffix}
                    </span>
                  </summary>
                  <p className="mt-4 text-[0.95rem]">
                    {t(week.summary, lang)}
                  </p>
                  {week.groups.map((group) => (
                    <div key={t(group.title, lang)} className="mt-6">
                      <h4 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                        <span>{t(group.title, lang)}</span>
                        <span className="tabular-nums">
                          {group.items.length}
                        </span>
                        <span className="h-px flex-1 bg-line" />
                      </h4>
                      <ul className="mt-3 grid list-none gap-2 p-0">
                        {group.items.map((entry) => (
                          <li
                            key={t(entry.title, lang)}
                            className="rounded-xl bg-surface-2 px-4 py-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-bold">
                                {t(entry.title, lang)}
                              </span>
                              {entry.tag && (
                                <span className="shrink-0 rounded-full border border-rose px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-rose">
                                  {t(entry.tag, lang)}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-[0.9rem] text-ink-soft">
                              {t(entry.text, lang)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {week.notes && (
                    <p className="mt-5 border-l-2 border-line-strong pl-3 text-sm text-ink-soft">
                      {t(week.notes, lang)}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "board" && (
        <section className="mt-9">
          <SectionTitle>{copy.boardTitle}</SectionTitle>
          <p className="mt-3 text-sm text-ink-soft">{copy.boardDesc}</p>
          {/* Пояснення до дошки — звідки взялись картки й чому зник прогрес
              по ТЗ. Без нього зміна в шапці виглядала б як пропажа. */}
          {report.kanban.note && (
            <p className="mt-3 text-sm text-ink-soft">
              {t(report.kanban.note, lang)}
            </p>
          )}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {report.kanban.columns.map((column) => {
              const collapsible = COLLAPSED_COLUMNS.has(column.id);
              const open = !collapsible || openColumns.has(column.id);
              const heading = (
                <>
                  <span>{t(column.title, lang)}</span>
                  <span className="tabular-nums">{column.items.length}</span>
                  <span className="h-px flex-1 bg-line" />
                </>
              );
              return (
              <div key={column.id}>
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  {collapsible ? (
                    <button
                      type="button"
                      onClick={() => toggleColumn(column.id)}
                      aria-expanded={open}
                      aria-controls={`board-${column.id}`}
                      className="flex w-full cursor-pointer items-center gap-2 text-left uppercase tracking-[0.14em] transition-colors hover:text-ink"
                    >
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-strong text-[0.9rem] leading-none"
                      >
                        {open ? "−" : "+"}
                      </span>
                      {heading}
                    </button>
                  ) : (
                    <span className="flex items-center gap-2">{heading}</span>
                  )}
                </h3>
                <div
                  id={`board-${column.id}`}
                  hidden={!open}
                  className="mt-3 grid gap-3"
                >
                  {column.items.length === 0 && column.empty && (
                    <p className="rounded-2xl border border-dashed border-line px-4 py-4 text-[0.88rem] text-ink-soft">
                      {t(column.empty, lang)}
                    </p>
                  )}
                  {column.items.map((item) => (
                    <article
                      key={t(item.title, lang)}
                      className="rounded-2xl border border-line bg-surface px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold">{t(item.title, lang)}</h4>
                        {item.who && (
                          <span
                            className={
                              "shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide " +
                              (COLUMN_TONE[column.id] ??
                                "text-ink-soft border-line-strong")
                            }
                          >
                            {t(item.who, lang)}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[0.9rem] text-ink-soft">
                        {t(item.text, lang)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "roadmap" && (
        <section className="mt-9">
          <SectionTitle>{copy.roadmapTitle}</SectionTitle>
          <Roadmap roadmap={report.roadmap} lang={lang} />
        </section>
      )}

      <footer className="mt-16 border-t border-line pt-6 text-center text-xs text-ink-soft">
        Yoga Fusion · {copy.footerText} · {copy.updatedLabel} {report.updatedAt}
      </footer>
    </div>
  );
}
