// Small hand-rolled i18n: no library, just a dictionary and a helper.
//
// Two independent things live here:
//  - `ui` / `t()` for the interface chrome (tab names, labels, buttons) — always
//    known at build time, so it is a plain object.
//  - `Localized<T>` / `t()` for content coming out of content/report.json,
//    which may be a bare string (legacy field, not yet translated) or an
//    { uk, en } pair. A bare string is returned unchanged for either language,
//    so nothing breaks if a field is forgotten in translation.

import { useEffect, useState } from "react";

export type Lang = "uk" | "en";

export type Localized<T = string> = T | { uk: T; en: T };

function isPair<T>(value: unknown): value is { uk: T; en: T } {
  return (
    typeof value === "object" &&
    value !== null &&
    "uk" in (value as object) &&
    "en" in (value as object)
  );
}

/** Reads a bilingual content field for the given language. Undefined/null
 *  pass through so optional fields (tag, notes, needs…) keep working. */
export function t<T = string>(
  value: Localized<T> | undefined | null,
  lang: Lang,
): T | undefined {
  if (value === undefined || value === null) return undefined;
  if (isPair<T>(value)) return value[lang];
  return value;
}

const LANG_KEY = "yf-lang";

/** Remembers the visitor's language choice in localStorage; defaults to
 *  Ukrainian on first visit (and keeps <html lang> in sync). */
export function useLang(): [Lang, (lang: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("uk");

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "uk" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANG_KEY, next);
  };

  return [lang, setLang];
}

export const ui = {
  uk: {
    forTeam: "для команди",
    statusTitle: "Статус розробки",
    gateIntro: "Сторінка закрита паролем. Його дає Андрій.",
    passwordPlaceholder: "пароль",
    wrongPassword: "Не підходить",
    busy: "хвилинку…",
    openButton: "відкрити",
    updatedLabel: "оновлено",
    statHoursTotal: "годин загалом",
    statShipped: "змін уже на сайті",
    statPending: "чекає викочування",
    statTzDone: "пунктів ТЗ готово",
    tabReport: "Звіт",
    tabBoard: "Дошка",
    tabRoadmap: "Roadmap",
    tabQuestions: "Питання",
    weeksTitle: "По тижнях",
    weeksDesc: "Кожен тиждень — окремий блок із годинами. Найновіший зверху.",
    hoursSuffix: "год",
    boardTitle: "Що в роботі",
    boardDesc:
      "Дошка оновлюється разом зі звітом. Ліворуч — те, що чекає вашого слова; далі — те, що робиться й що попереду.",
    roadmapTitle: "Куди рухаємось",
    questionsTitle: "Питання до вас",
    questionsDesc:
      "Це не технічні задачі, а вибір, від якого залежить, як робити далі. Поки на них немає відповіді, відповідна робота стоїть.",
    closedQuestionsLabel: "Питання, які вже закриті",
    closedQuestionsDesc: "Історія рішень: що ви обрали і що з цього вийшло.",
    decisionLabel: "Рішення:",
    footerText: "сторінка статусу для команди",
    deadlineLabel: "Дедлайн платформи.",
    statusDone: "готово",
    statusCurrent: "зараз",
    statusNext: "далі",
    statusPlanned: "потім",
    stagesProgress: (done: number, total: number) =>
      `${done} з ${total} етапів`,
  },
  en: {
    forTeam: "for the team",
    statusTitle: "Development status",
    gateIntro: "This page is password-protected. Andriy has the password.",
    passwordPlaceholder: "password",
    wrongPassword: "Wrong password",
    busy: "one moment…",
    openButton: "open",
    updatedLabel: "updated",
    statHoursTotal: "hours total",
    statShipped: "changes already live",
    statPending: "waiting to ship",
    statTzDone: "spec items done",
    tabReport: "Report",
    tabBoard: "Board",
    tabRoadmap: "Roadmap",
    tabQuestions: "Questions",
    weeksTitle: "By week",
    weeksDesc: "Each week is its own block with hours logged. Newest first.",
    hoursSuffix: "h",
    boardTitle: "What's in progress",
    boardDesc:
      "The board updates together with the report. On the left is what's waiting on your call; further along is what's being worked on and what's next.",
    roadmapTitle: "Where we're headed",
    questionsTitle: "Questions for you",
    questionsDesc:
      "These aren't technical tasks — they're choices that shape how we proceed. Until they're answered, the related work is on hold.",
    closedQuestionsLabel: "Already-closed questions",
    closedQuestionsDesc: "A decision log: what you chose and what came of it.",
    decisionLabel: "Decision:",
    footerText: "team status page",
    deadlineLabel: "Platform deadline.",
    statusDone: "done",
    statusCurrent: "now",
    statusNext: "next",
    statusPlanned: "later",
    stagesProgress: (done: number, total: number) =>
      `${done} of ${total} stages`,
  },
} as const;
