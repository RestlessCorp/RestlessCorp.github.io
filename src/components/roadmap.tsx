"use client";

import type { Report, Stage, StageStatus } from "@/lib/report";
import { t, ui, type Lang } from "@/lib/i18n";
import { ContentText } from "@/components/content-text";

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
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-[12px] pb-6 last:pb-0">
      {/* rail + dot */}
      <div className="flex flex-col items-center">
        <span
          className={`mt-1.5 h-[14px] w-[14px] shrink-0 rounded-full border-2 ${tone.dot}`}
        />
        {!last && <span className={`mt-1 w-0.5 flex-1 ${tone.line}`} />}
      </div>

      <div
        className={
          "min-w-0 rounded-2xl border border-line px-[16px] py-3 " +
          (stage.status === "current" ? "bg-surface-2" : "bg-surface")
        }
      >
        <div className="grid min-w-0 gap-2">
          <h4 className="min-w-0 break-words font-bold">{t(stage.title, lang)}</h4>
          <span
            className={`w-fit max-w-full break-words rounded-2xl border px-2 py-0.5 text-left text-[0.62rem] font-bold uppercase leading-tight tracking-wide whitespace-normal ${tone.text}`}
          >
            {copy[tone.labelKey]} · {t(stage.when, lang)}
          </span>
        </div>
        <p className="mt-1 whitespace-pre-line text-[0.9rem] text-ink-soft">
          <ContentText text={t(stage.text, lang)} />
        </p>
        {stage.needs && (
          <p className="mt-2 flex items-start gap-1.5 text-[0.82rem] text-rose">
            <span aria-hidden>▸</span>
            <span>
              <ContentText text={t(stage.needs, lang)} />
            </span>
          </p>
        )}
        <ul className="mt-3 flex flex-wrap gap-1.5 p-0">
          {(stage.items ?? []).map((item) => (
            <li
              key={t(item, lang)}
              className="max-w-full list-none break-words rounded-full border border-line bg-bg px-2.5 py-0.5 text-[0.78rem] text-ink-soft"
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
      <p className="text-sm text-ink-soft">
        <ContentText text={t(roadmap.note, lang)} />
      </p>

      <div className="mt-7 grid gap-4">
        {roadmap.tracks.map((track) => {
          const done = track.stages.filter((s) => s.status === "done").length;
          return (
            <details key={track.id} className="min-w-0 rounded-2xl border border-line bg-surface px-[20px] pb-5">
              <summary className="min-h-11 cursor-pointer py-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green">
                <span className="ml-1 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2 align-middle">
                  <span className="display min-w-0 max-w-full break-words text-2xl">{t(track.title, lang)}</span>
                  <span className="text-xs text-ink-soft tabular-nums">
                    {lang === "uk" ? "архів" : "archive"} · {copy.stagesProgress(done, track.stages.length)}
                  </span>
                  <span className="text-xs font-bold text-green">
                    {lang === "uk" ? "розгорнути історію" : "expand history"}
                  </span>
                </span>
              </summary>

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
                  <ContentText text={t(track.note, lang)} />
                </p>
              )}
              {track.priorityNote && (
                <p className="mt-3 rounded-xl border border-line-strong bg-surface-2 px-3 py-2 text-[0.82rem]">
                  <span className="font-bold">{copy.priorityLabel} </span>
                  <ContentText text={t(track.priorityNote, lang)} />
                </p>
              )}
              {track.deadline && (
                <p className="mt-3 rounded-xl border border-amber/50 bg-surface-2 px-3 py-2 text-[0.82rem]">
                  <span className="font-bold text-amber">
                    {copy.deadlineLabel}{" "}
                  </span>
                  <ContentText text={t(track.deadline, lang)} />
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
            </details>
          );
        })}
      </div>
    </div>
  );
}
