# Yoga Fusion — сторінка статусу

Захищена паролем сторінка для команди студії: що зроблено, що в роботі й
скільки годин за тиждень. Цей public-репозиторій містить renderer та
зашифрований `public/report.enc`; plaintext тут не зберігається.

## Де джерело

Канонічний versioned plaintext: приватний репозиторій
`RestlessCorp/yoga-fusion-workspace`, файл `report-source/report.json`.
Технічний production-стан звіряється з приватними
`yoga-fusion-frontend/docs/production-status.md`,
`docs/state/release-state.json` і changelog. Локальний
`content/report.json` — лише стара gitignored-копія, не джерело.

## Як оновити звіт

1. Оновити private `report-source/report.json` в окремій гілці й переглянути
   звичайний Git diff.
2. У PowerShell запустити валідацію. На цій робочій машині безпечний default
   береться з `report-source.manifest.json` і веде у dedicated private worktree
   `yoga-fusion/.worktrees/workspace-report-source/report-source/report.json`:

   ```powershell
   npm run validate:report
   ```

   Для іншого checkout явно передати versioned source; явний шлях має пріоритет
   над локальним default:

   ```powershell
   $env:REPORT_SOURCE_PATH = 'D:\private-worktree\report-source\report.json'
   npm run validate:report
   Remove-Item Env:REPORT_SOURCE_PATH
   ```

   Validator також вимагає простежуваний
   `sourceRevision: yoga-fusion/release-state@YYYY-MM-DD`; його дата має
   збігатися з `sourceAsOf` у звіті.

3. Передати новий пароль лише через env (щонайменше 16 символів) і зібрати:

   ```powershell
   $env:REPORT_PASSPHRASE = '<пароль, якого немає в git>'
   npm run report
   Remove-Item Env:REPORT_PASSPHRASE
   ```

4. Перевірити сторінку локально. Пуш у `main` автоматично публікує GitHub
   Pages, тому він робиться лише після прямого підтвердження Andriy.

Новий тиждень = ще один об'єкт на початок `weeks`; поточна черга —
`kanban.columns`. Roadmap зберігає історію й напрям, але не визначає поточне
«далі».

## Чому шифрування

GitHub Pages — статика, серверу нема де перевіряти пароль. Тому шифрується сам
звіт: AES-256-GCM, ключ із passphrase через PBKDF2-SHA256, 300k ітерацій. У
репозиторій потрапляє лише ciphertext. Пароль передається команді окремо; у
коді немає і не може бути fallback-значення.
