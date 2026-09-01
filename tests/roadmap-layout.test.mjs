import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../src/components/roadmap.tsx", import.meta.url),
  "utf8",
);

test("roadmap status labels sit below titles and wrap inside the stage card", () => {
  assert.match(source, /grid-cols-\[auto_minmax\(0,1fr\)\]/);
  assert.match(source, /<div className="grid min-w-0 gap-2">/);
  assert.match(source, /max-w-full break-words/);
  assert.doesNotMatch(source, /sm:max-w-\[70%\]/);
  assert.doesNotMatch(source, /className=\{`shrink-0 rounded-full border px-2/);
});
