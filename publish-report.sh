#!/usr/bin/env bash
# Публікація звіту на https://restlesscorp.github.io/
#
# ПАРОЛЬ. Він не зберігається ні в git, ні в архіві ключів, ні в цьому файлі —
# і не має. Але вводити його щоразу руками означає, що публікацію не можна
# автоматизувати й вона щоразу відкладається. Тому пароль живе в Keychain
# macOS: зашифрований на диску, прив'язаний до облікового запису, і його
# віддає система, а не файл у репозиторії.
#
# ОДИН РАЗ, вручну (пароль вводиться прихованим вводом і нікуди більше не йде):
#   security add-generic-password -a "$USER" -s yoga-fusion-report -w
#
# Далі:
#   ./publish-report.sh              — зібрати, показати діф, спитати про пуш
#   ./publish-report.sh --yes        — зібрати й запушити без питань
#   ./publish-report.sh --no-push    — лише зібрати локально
#
# Порядок пошуку пароля: $REPORT_PASSPHRASE → Keychain → прихований ввід.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="${REPORT_SOURCE_PATH:-$HOME/Projects/yoga-fusion/workspace/report-source/report.json}"
KEYCHAIN_SERVICE="yoga-fusion-report"

PUSH=1; ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --no-push) PUSH=0 ;;
    --yes|-y)  ASSUME_YES=1 ;;
    *) echo "Невідомий аргумент: $arg"; exit 2 ;;
  esac
done

cd "$REPO"
[ -f "$SOURCE" ] || { echo "✖ Немає джерела: $SOURCE"; exit 1; }

echo "── джерело ──"
python3 - "$SOURCE" <<'PY'
import json, sys
d = json.load(open(sys.argv[1], encoding="utf-8"))
print(f"  оновлено: {d['updatedAt']}   годин усього: {d['totals']['hoursTotal']}")
for w in d["weeks"][:2]:
    print(f"  {w['label']['uk']} — {w['hours']} год")
PY

echo
echo "── валідація ──"
REPORT_SOURCE_PATH="$SOURCE" npm run --silent validate:report

# --- пароль -----------------------------------------------------------------
SAVE_TO_KEYCHAIN=0
if [ -n "${REPORT_PASSPHRASE:-}" ]; then
  echo "→ пароль зі змінної оточення"
elif REPORT_PASSPHRASE="$(security find-generic-password -a "$USER" -s "$KEYCHAIN_SERVICE" -w 2>/dev/null)"; then
  echo "→ пароль із Keychain ($KEYCHAIN_SERVICE)"
else
  echo
  echo "Пароля немає в Keychain. Введи його один раз — далі буде автоматично."
  REPORT_PASSPHRASE=""
  read -rsp "Пароль звіту: " REPORT_PASSPHRASE || true
  echo
  [ -n "$REPORT_PASSPHRASE" ] || {
    echo "✖ Пароль не введено."
    echo "  Запусти в терміналі, або збережи один раз:"
    echo "  security add-generic-password -a \"\$USER\" -s $KEYCHAIN_SERVICE -w"
    exit 1
  }
  SAVE_TO_KEYCHAIN=1
fi
export REPORT_PASSPHRASE

BEFORE="$(shasum -a 256 public/report.enc | cut -d' ' -f1)"

echo
echo "── збірка ──"
REPORT_SOURCE_PATH="$SOURCE" npm run --silent report

AFTER="$(shasum -a 256 public/report.enc | cut -d' ' -f1)"
if [ "$BEFORE" = "$AFTER" ]; then
  unset REPORT_PASSPHRASE
  echo "✖ report.enc не змінився — публікувати нічого"
  exit 1
fi
echo "✓ report.enc перезібрано"

# Зберігаємо лише ПІСЛЯ успішної збірки: інакше в Keychain ліг би хибний пароль.
if [ "$SAVE_TO_KEYCHAIN" -eq 1 ]; then
  if security add-generic-password -a "$USER" -s "$KEYCHAIN_SERVICE" \
       -w "$REPORT_PASSPHRASE" -U 2>/dev/null; then
    echo "✓ пароль збережено в Keychain — більше не питатиму"
  fi
fi
unset REPORT_PASSPHRASE

if [ "$PUSH" -eq 0 ]; then
  echo; echo "Без пушу (--no-push). Відкотити: git checkout -- public/report.enc"
  exit 0
fi

echo; git status --short; echo
if [ "$ASSUME_YES" -eq 0 ]; then
  read -rp "Запушити в main? Це одразу оновить публічну сторінку. [y/N] " ANSWER || ANSWER=""
  case "$ANSWER" in [yY]*) ;; *) echo "Не пушу. Відкотити: git checkout -- public/report.enc"; exit 0 ;; esac
fi

WEEK="$(python3 -c "import json,sys;d=json.load(open(sys.argv[1],encoding='utf-8'));print(d['weeks'][0]['label']['uk'])" "$SOURCE")"
HOURS="$(python3 -c "import json,sys;d=json.load(open(sys.argv[1],encoding='utf-8'));print(d['weeks'][0]['hours'])" "$SOURCE")"

git add public/report.enc
git commit -m "звіт: $WEEK — $HOURS год"
git push origin main

echo
echo "✓ Запушено. Pages збереться за хвилину-дві:"
echo "  https://github.com/RestlessCorp/RestlessCorp.github.io/actions"
echo "  https://restlesscorp.github.io/"
