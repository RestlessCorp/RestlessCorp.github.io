"use client";

import type { Report, Stage, StageStatus } from "@/lib/report";
import { t, ui, type Lang } from "@/lib/i18n";

// A stage is one of four things, and the eye should be able to tell which
// without reading: filled dot = behind us, ringed dot = where we are now,
// hollow = ahead.
const STATUS: Record<
  StageStatus,
  { labelKey: "statusDone" | "statusCurrent" | "statusNext" | "statusPlanned"; dot: string; text: string; line: string }
> = {
  done: {
    labelKey: "statusDone",
    dot: "bg-green border-green",
    text: "text-green border-green",
    line: "bg-green",
  },
  current: {
    labelKey: "statusCurrent",
    dot: "bg-amber border-amber ring-4 ring-amber/25",
    text: "text-amber border-amber",
    line: "bg-line",
  },
  next: {
    labelKey: "statusNext",
    dot: "bg-bg border-ink-soft",
    text: "text-ink-soft border-line-strong",
    line: "bg-line",
  },
  planned: {
    labelKey: "statusPlanned",
    dot: "bg-bg border-line-strong",
    text: "text-ink-soft border-line",
    line: "bg-line",
  },
};

function StageRow({
  stage,
  last,
  lang,
}: {
  stage: Stage;
  last: boolean;
  lang: Lang;
}) {
  const tone = STATUS[stage.status];
  const copy = ui[lang];
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-4 pb-6 last:pb-0">
      {/* rail + dot */}
      <div className="flex flex-col items-center">
        <span
          className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${tone.dot}`}
        />
        {!last && <span className={`mt-1 w-0.5 flex-1 ${tone.line}`} />}
      </div>

      <div
        className={
          "rounded-2xl border border-line px-4 py-3 " +
          (stage.status === "current" ? "bg-surface-2" : "bg-surface")
        }
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-bold">{t(stage.title, lang)}</h4>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide ${tone.text}`}
          >
            {copy[tone.labelKey]} · {t(stage.when, lang)}
          </span>
        </div>
        <p className="mt-1 whitespace-pre-line text-[0.9rem] text-ink-soft">
          {t(stage.text, lang)}
        </p>
        {stage.needs && (
          <p className="mt-2 flex items-start gap-1.5 text-[0.82rem] text-rose">
            <span aria-hidden>▸</span>
            <span>{t(stage.needs, lang)}</span>
          </p>
        )}
        <ul className="mt-3 flex flex-wrap gap-1.5 p-0">
          {stage.items.map((item) => (
            <li
              key={t(item, lang)}
              className="list-none rounded-full border border-line bg-bg px-2.5 py-0.5 text-[0.78rem] text-ink-soft"
            >
              {t(item, lang)}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Roadmap({
  roadmap,
  lang,
}: {
  roadmap: Report["roadmap"];
  lang: Lang;
}) {
  const copy = ui[lang];
  return (
    <div className="mt-5">
      <p className="text-sm text-ink-soft">{t(roadmap.note, lang)}</p>

      {/* Three tracks now, not two. On a wide screen they sit side by side, so
          the roadmap breaks out past the article's reading width to give each
          timeline room; below xl they stack two-up, then one. */}
      <div className="mt-7 grid gap-10 sm:grid-cols-2 xl:-mx-24 xl:grid-cols-3">
        {roadmap.tracks.map((track) => {
          const done = track.stages.filter((s) => s.status === "done").length;
          return (
            <section key={track.id}>
              <header className="flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="display text-2xl">{t(track.title, lang)}</h3>
                  <p className="text-xs text-ink-soft">
                    {t(track.subtitle, lang)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-ink-soft tabular-nums">
                  {copy.stagesProgress(done, track.stages.length)}
                </span>
              </header>

              {/* a bar over the whole track, so the two are comparable at a glance */}
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-line">
                {track.stages.map((stage, i) => (
                  <span
                    key={i}
                    className={
                      "h-full flex-1 " +
                      (stage.status === "done"
                        ? "bg-green"
                        : stage.status === "current"
                          ? "bg-amber"
                          : "bg-transparent")
                    }
                  />
                ))}
              </div>

              {track.note && (
                <p className="mt-3 whitespace-pre-line text-[0.85rem] text-ink-soft">
                  {t(track.note, lang)}
                </p>
              )}
              {track.priorityNote && (
                <p className="mt-3 rounded-xl border border-line-strong bg-surface-2 px-3 py-2 text-[0.82rem]">
                  <span className="font-bold">{copy.priorityLabel} </span>
                  {t(track.priorityNote, lang)}
                </p>
              )}
              {track.deadline && (
                <p className="mt-3 rounded-xl border border-amber/50 bg-surface-2 px-3 py-2 text-[0.82rem]">
                  <span className="font-bold text-amber">
                    {copy.deadlineLabel}{" "}
                  </span>
                  {t(track.deadline, lang)}
                </p>
              )}

              <ol className="mt-6 grid list-none p-0">
                {track.stages.map((stage, i) => (
                  <StageRow
                    key={t(stage.title, lang) ?? i}
                    stage={stage}
                    last={i === track.stages.length - 1}
                    lang={lang}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
