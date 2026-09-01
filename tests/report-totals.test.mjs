import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const viewSource = readFileSync(
  new URL("../src/components/report-view.tsx", import.meta.url),
  "utf8",
);
const typeSource = readFileSync(
  new URL("../src/lib/report.ts", import.meta.url),
  "utf8",
);

test("a non-recounted shipped total is presented as an explicit lower bound", () => {
  assert.match(typeSource, /shippedIsLowerBound\?: boolean/);
  assert.match(viewSource, /totals\.shippedIsLowerBound \? "\+" : ""/);
});
