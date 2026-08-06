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
    if (saved === "uk" || saved === "en") {
      // Читаємо мову після гідрації: lazy initializer дав би серверу UK, а браузеру
      // збережену EN і створив би різну першу розмітку.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
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
    statDecisions: "питань до вас",
    nowTitle: "Зараз",
    nowInProgress: "У роботі",
    nowWaiting: "Чекає вашого слова",
    nowLatest: "Останнє у проді",
    nowOpenBoard: "відкрити дошку →",
    releaseShowAll: "показати всі",
    releaseShowLess: "згорнути",
    tabReport: "Звіт",
    tabBoard: "Дошка",
    tabRoadmap: "Roadmap",
    weeksTitle: "По тижнях",
    weeksDesc: "Кожен тиждень — окремий блок із годинами. Найновіший зверху.",
    hoursSuffix: "год",
    boardTitle: "Що в роботі",
    boardDesc:
      "Дошка оновлюється разом зі звітом. Ліворуч — те, що чекає вашого слова; далі — те, що робиться й що попереду.",
    roadmapTitle: "Куди рухаємось",
    closedQuestionsLabel: "Питання, які вже закриті",
    closedQuestionsDesc: "Історія рішень: що ви обрали і що з цього вийшло.",
    decisionLabel: "Рішення:",
    priorityLabel: "Пріоритет робіт.",
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
    statDecisions: "questions for you",
    nowTitle: "Right now",
    nowInProgress: "In progress",
    nowWaiting: "Waiting on your call",
    nowLatest: "Latest in production",
    nowOpenBoard: "open the board →",
    releaseShowAll: "show all",
    releaseShowLess: "collapse",
    tabReport: "Report",
    tabBoard: "Board",
    tabRoadmap: "Roadmap",
    weeksTitle: "By week",
    weeksDesc: "Each week is its own block with hours logged. Newest first.",
    hoursSuffix: "h",
    boardTitle: "What's in progress",
    boardDesc:
      "The board updates together with the report. On the left is what's waiting on your call; further along is what's being worked on and what's next.",
    roadmapTitle: "Where we're headed",
    closedQuestionsLabel: "Already-closed questions",
    closedQuestionsDesc: "A decision log: what you chose and what came of it.",
    decisionLabel: "Decision:",
    priorityLabel: "Work priority.",
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
