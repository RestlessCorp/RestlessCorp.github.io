# Restless status report — правила для AI

Спочатку прочитати `D:\Unity Projects\AGENTS.md`.

## Джерело правди

- Цей public-репозиторій — renderer і зашифрована проєкція, не канонічний
  project state.
- Версіонований plaintext живе у приватному
  `RestlessCorp/yoga-fusion-workspace`, шлях `report-source/report.json`.
- Технічний production-стан береться з приватного
  `yoga-fusion-frontend/docs/production-status.md`, machine-readable gate —
  `docs/state/release-state.json`, хронологія — changelog.
- Локальний `content/report.json` — legacy-копія, git її ігнорує. Не редагувати
  її як джерело і не відновлювати з неї новіший canonical source.

## Статуси й історія

- `done/live` дозволено лише з deployment ID, source SHA, досяжністю з
  `origin/main` і live smoke.
- Старий реліз не видаляти, якщо функцію перезаписано. Лишити історичний факт і
  додати поточний стан `регресія`.
- Roadmap не визначає «що робимо далі». Поточна черга — лише `kanban`; roadmap
  зберігає послідовність і історію продукту.
- Години не змінювати заднім числом без прямого рішення Andriy.

## Оновлення

1. Окремий worktree/branch, task claim через Yoga `scripts/ai-work.ps1`.
2. Змінити private `report-source/report.json`.
3. Запустити `npm run validate:report` із `REPORT_SOURCE_PATH`, потім
   `npm run report` із чинним погодженим командним `REPORT_PASSPHRASE`.
   Не ротувати й не замінювати пароль без окремої прямої команди Andriy.
4. Переглянути diff private source і public encrypted artifact.
5. Пуш `main` цього repo автоматично публікує GitHub Pages, тому commit/push
   зашифрованого звіту — лише після прямого підтвердження Andriy.

Пароля або fallback у коді не може бути. Значення env не читати й не виводити.
Технічне оновлення звіту саме по собі не є дозволом змінювати пароль.
