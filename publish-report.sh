#!/usr/bin/env bash
# Публікація звіту на https://restlesscorp.github.io/
#
# Пароль НЕ зберігається ніде — ні в git, ні в архіві ключів, ні в цьому файлі.
# Скрипт питає його прихованим вводом і тримає лише в памʼяті процесу.
#
#   ./publish-report.sh            — зібрати, показати діф, спитати про пуш
#   ./publish-report.sh --no-push  — лише зібрати локально
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="${REPORT_SOURCE_PATH:-$HOME/Projects/yoga-fusion/workspace/report-source/report.json}"
PUSH=1
[ "${1:-}" = "--no-push" ] && PUSH=0

cd "$REPO"

[ -f "$SOURCE" ] || { echo "✖ Немає джерела: $SOURCE"; exit 1; }

echo "── джерело ──"
python3 - "$SOURCE" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
print(f"  оновлено: {d['updatedAt']}   годин усього: {d['totals']['hoursTotal']}")
for w in d['weeks'][:2]:
    print(f"  {w['label']['uk']} — {w['hours']} год")
PY

echo
echo "── валідація ──"
REPORT_SOURCE_PATH="$SOURCE" npm run --silent validate:report

echo
# -s ховає ввід; -r не з'їдає бекслеші. Пароль не потрапляє ні в історію
# оболонки, ні в список процесів (передається змінною оточення, не аргументом).
REPORT_PASSPHRASE=""
# `|| true` — інакше EOF (запуск без термінала) обриває скрипт мовчки під set -e.
read -rsp "Пароль звіту: " REPORT_PASSPHRASE || true
echo
[ -n "$REPORT_PASSPHRASE" ] || {
  echo "✖ Пароль не введено — публікувати нічого."
  echo "  Скрипт треба запускати в терміналі: ./publish-report.sh"
  exit 1
}
export REPORT_PASSPHRASE

BEFORE=$(shasum -a 256 public/report.enc | cut -d' ' -f1)

echo "── збірка ──"
REPORT_SOURCE_PATH="$SOURCE" npm run --silent report
unset REPORT_PASSPHRASE

AFTER=$(shasum -a 256 public/report.enc | cut -d' ' -f1)
if [ "$BEFORE" = "$AFTER" ]; then
  echo "✖ report.enc не змінився — публікувати нічого"
  exit 1
fi
echo "✓ report.enc перезібрано"

if [ "$PUSH" -eq 0 ]; then
  echo
  echo "Зупиняюсь без пушу (--no-push). Відкотити: git checkout -- public/report.enc"
  exit 0
fi

echo
git status --short
echo
read -rp "Запушити в main? Це одразу оновить публічну сторінку. [y/N] " ANSWER
case "$ANSWER" in
  [yY]*)
    git add public/report.enc
    git commit -m "звіт: 24 серпня — +8 годин, розклад адмінки і дві грошові поломки"
    git push origin main
    echo
    echo "✓ Запушено. GitHub Actions збере й викотить Pages за хвилину-дві:"
    echo "  https://github.com/RestlessCorp/RestlessCorp.github.io/actions"
    ;;
  *)
    echo "Не пушу. Зібраний файл лишився локально."
    echo "Відкотити: git checkout -- public/report.enc"
    ;;
esac
