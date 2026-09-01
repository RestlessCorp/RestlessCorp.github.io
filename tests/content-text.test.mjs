import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = readFileSync(
  new URL("../src/components/content-text.tsx", import.meta.url),
  "utf8",
);

test("report inline markup is rendered without exposing raw markers", () => {
  assert.match(source, /part\.startsWith\("\*\*"\)/);
  assert.match(source, /part\.startsWith\("`"\)/);
  assert.match(source, /<strong key=/);
  assert.match(source, /<code key=/);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});
