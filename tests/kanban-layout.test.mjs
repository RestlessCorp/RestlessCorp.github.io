import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../src/components/report-view.tsx", import.meta.url),
  "utf8",
);

test("kanban status labels sit below titles and wrap inside cards", () => {
  assert.doesNotMatch(source, /sm:grid-cols-\[minmax\(0,1fr\)_auto\]/);
  assert.match(source, /w-fit max-w-full break-words whitespace-normal/);
  assert.doesNotMatch(source, /sm:max-w-\[20rem\]/);
  assert.doesNotMatch(source, /"shrink-0 rounded-full border px-2 py-0\.5/);
});
