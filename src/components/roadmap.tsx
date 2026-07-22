"use client";

import type { Report, Stage, StageStatus } from "@/lib/report";

// A stage is one of four things, and the eye should be able to tell which
// without reading: filled dot = behind us, ringed dot = where we are now,
// hollow = ahead.
const STATUS: Record<
  StageStatus,
  { label: string; dot: string; text: string; line: string }
> = {
  done: {
    label: "готово",
    dot: "bg-green border-green",
    text: "text-green border-green",
    line: "bg-green",
  },
  current: {
    label: "зараз",
    dot: "bg-amber border-amber ring-4 ring-amber/25",
    text: "text-amber border-amber",
    line: "bg-line",
  },
  next: {
    label: "далі",
    dot: "bg-bg border-ink-soft",
    text: "text-ink-soft border-line-strong",
    line: "bg-line",
  },
  planned: {
    label: "потім",
    dot: "bg-bg border-line-strong",
    text: "text-ink-soft border-line",
    line: "bg-line",
  },
};

function StageRow({ stage, last }: { stage: Stage; last: boolean }) {
  const tone = STATUS[stage.status];
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
          <h4 className="font-bold">{stage.title}</h4>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide ${tone.text}`}
          >
            {tone.label} · {stage.when}
          </span>
        </div>
        <p className="mt-1 text-[0.9rem] text-ink-soft">{stage.text}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5 p-0">
          {stage.items.map((item) => (
            <li
              key={item}
              className="list-none rounded-full border border-line bg-bg px-2.5 py-0.5 text-[0.78rem] text-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Roadmap({ roadmap }: { roadmap: Report["roadmap"] }) {
  return (
    <div className="mt-5">
      <p className="text-sm text-ink-soft">{roadmap.note}</p>

      <div className="mt-7 grid gap-10 lg:grid-cols-2">
        {roadmap.tracks.map((track) => {
          const done = track.stages.filter((s) => s.status === "done").length;
          return (
            <section key={track.id}>
              <header className="flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="display text-2xl">{track.title}</h3>
                  <p className="text-xs text-ink-soft">{track.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-ink-soft tabular-nums">
                  {done} з {track.stages.length} етапів
                </span>
              </header>

              {/* a bar over the whole track, so the two are comparable at a glance */}
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-line">
                {track.stages.map((stage) => (
                  <span
                    key={stage.title}
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

              <ol className="mt-6 grid list-none p-0">
                {track.stages.map((stage, i) => (
                  <StageRow
                    key={stage.title}
                    stage={stage}
                    last={i === track.stages.length - 1}
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
