"use client";

import { useState } from "react";
import type { Report } from "@/lib/report";
import { Roadmap } from "@/components/roadmap";

// Same colour grammar as the internal report: rose for what needs a decision,
// amber for in flight, green for done, muted for later.
const COLUMN_TONE: Record<string, string> = {
  decision: "text-rose border-rose",
  progress: "text-amber border-amber",
  next: "text-green border-green",
  later: "text-ink-soft border-line-strong",
};

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

export function ReportView({ report }: { report: Report }) {
  const [tab, setTab] = useState<
    "report" | "board" | "roadmap" | "questions"
  >("report");
  const { totals } = report;

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:pt-14">
      <header>
        <p className="text-[0.72rem] uppercase tracking-[0.22em] font-bold text-green">
          {report.project} · для команди
        </p>
        <h1 className="display mt-3 text-4xl leading-none sm:text-5xl">
          Статус розробки
        </h1>
        <p className="mt-4 text-ink-soft">
          {report.subtitle} · оновлено {report.updatedAt}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={String(totals.hoursTotal)} label="годин загалом" />
        <Stat value={String(totals.shipped)} label="змін уже на сайті" />
        <Stat value={String(totals.pending)} label="чекає викочування" />
        <Stat
          value={`${totals.tzDone}/${totals.tzTotal}`}
          label="пунктів ТЗ готово"
        />
      </div>

      <nav className="mt-9 flex gap-2 border-b border-line" role="tablist">
        {(
          [
            ["report", "Звіт"],
            ["board", "Дошка"],
            ["roadmap", "Roadmap"],
            ["questions", "Питання"],
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
            <SectionTitle>{report.release.title}</SectionTitle>
            <p className="mt-3 text-sm text-ink-soft">{report.release.note}</p>
            <div className="mt-5 grid gap-3">
              {report.release.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-line border-l-[3px] border-l-amber bg-surface-2 px-5 py-4"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-[0.93rem]">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <SectionTitle>По тижнях</SectionTitle>
            <p className="mt-3 text-sm text-ink-soft">
              Кожен тиждень — окремий блок із годинами. Найновіший зверху.
            </p>
            <div className="mt-5 grid gap-4">
              {report.weeks.map((week, index) => (
                <details
                  key={week.id}
                  open={index === 0}
                  className="rounded-2xl border border-line bg-surface px-5 py-4"
                >
                  <summary className="flex cursor-pointer items-baseline justify-between gap-3">
                    <span className="display text-xl">{week.label}</span>
                    <span className="shrink-0 rounded-full border border-green px-3 py-0.5 text-xs font-bold tabular-nums text-green">
                      {week.hours} год
                    </span>
                  </summary>
                  <p className="mt-4 text-[0.95rem]">{week.summary}</p>
                  {week.groups.map((group) => (
                    <div key={group.title} className="mt-6">
                      <h4 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                        <span>{group.title}</span>
                        <span className="tabular-nums">
                          {group.items.length}
                        </span>
                        <span className="h-px flex-1 bg-line" />
                      </h4>
                      <ul className="mt-3 grid list-none gap-2 p-0">
                        {group.items.map((entry) => (
                          <li
                            key={entry.title}
                            className="rounded-xl bg-surface-2 px-4 py-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-bold">{entry.title}</span>
                              {entry.tag && (
                                <span className="shrink-0 rounded-full border border-rose px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-rose">
                                  {entry.tag}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-[0.9rem] text-ink-soft">
                              {entry.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {week.notes && (
                    <p className="mt-5 border-l-2 border-line-strong pl-3 text-sm text-ink-soft">
                      {week.notes}
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
          <SectionTitle>Що в роботі</SectionTitle>
          <p className="mt-3 text-sm text-ink-soft">
            Дошка оновлюється разом зі звітом. Ліворуч — те, що чекає вашого
            слова; далі — те, що робиться й що попереду.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {report.kanban.columns.map((column) => (
              <div key={column.id}>
                <h3 className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  <span>{column.title}</span>
                  <span className="tabular-nums">{column.items.length}</span>
                  <span className="h-px flex-1 bg-line" />
                </h3>
                <div className="mt-3 grid gap-3">
                  {column.items.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-line bg-surface px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold">{item.title}</h4>
                        {item.who && (
                          <span
                            className={
                              "shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide " +
                              (COLUMN_TONE[column.id] ??
                                "text-ink-soft border-line-strong")
                            }
                          >
                            {item.who}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[0.9rem] text-ink-soft">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "roadmap" && (
        <section className="mt-9">
          <SectionTitle>Куди рухаємось</SectionTitle>
          <Roadmap roadmap={report.roadmap} />
        </section>
      )}

      {tab === "questions" && (
        <section className="mt-9">
          <SectionTitle>Питання до вас</SectionTitle>
          <p className="mt-3 text-sm text-ink-soft">
            Це не технічні задачі, а вибір, від якого залежить, як робити далі.
            Поки на них немає відповіді, відповідна робота стоїть.
          </p>

          <div className="mt-5 grid gap-3">
            {report.questions.open.map((q, i) => (
              <article
                key={q.title}
                className="rounded-2xl border border-line border-l-[3px] border-l-rose bg-surface-2 px-5 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold">
                    <span className="mr-2 text-ink-soft tabular-nums">
                      {i + 1}.
                    </span>
                    {q.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-rose px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-rose">
                    {q.who}
                  </span>
                </div>
                <p className="mt-2 text-[0.93rem]">{q.text}</p>
              </article>
            ))}
          </div>

          {/* History: every decision the team has already made, with what came
              of it. Folded away by default — it is for looking things up, not
              for reading top to bottom. */}
          <details className="mt-8 rounded-2xl border border-line bg-surface px-5 py-4">
            <summary className="flex cursor-pointer items-center gap-3 font-bold">
              <span
                aria-hidden
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink-soft text-sm leading-none"
              >
                +
              </span>
              <span>Питання, які вже закриті</span>
              <span className="text-sm font-normal text-ink-soft tabular-nums">
                {report.questions.closed.length}
              </span>
            </summary>
            <p className="mt-3 text-sm text-ink-soft">
              Історія рішень: що ви обрали і що з цього вийшло.
            </p>
            <div className="mt-4 grid gap-3">
              {report.questions.closed.map((q) => (
                <article
                  key={q.title}
                  className="rounded-xl border-l-2 border-green bg-surface-2 px-4 py-3"
                >
                  <h3 className="font-bold">{q.title}</h3>
                  <p className="mt-1 text-[0.9rem]">
                    <span className="font-bold text-green">Рішення: </span>
                    {q.decision}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-ink-soft">{q.result}</p>
                </article>
              ))}
            </div>
          </details>
        </section>
      )}

      <footer className="mt-16 border-t border-line pt-6 text-center text-xs text-ink-soft">
        Yoga Fusion · сторінка статусу для команди · оновлено {report.updatedAt}
      </footer>
    </div>
  );
}
