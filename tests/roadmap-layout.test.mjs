import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../src/components/roadmap.tsx", import.meta.url),
  "utf8",
);

test("long roadmap status labels wrap inside the stage card", () => {
  assert.match(source, /grid-cols-\[auto_minmax\(0,1fr\)\]/);
  assert.match(source, /max-w-full break-words/);
  assert.match(source, /whitespace-normal sm:max-w-\[70%\]/);
  assert.doesNotMatch(source, /className=\{`shrink-0 rounded-full border px-2/);
});
