import assert from "node:assert/strict";
import { test } from "node:test";
import { validateRoadmap } from "../scripts/validate-report.mjs";

const track = (stage) => [{ id: "site", stages: [stage] }];

test("legacy roadmap stages may omit their optional bullet list", () => {
  for (const items of [undefined, null, [], [{ uk: "План", en: "Plan" }]]) {
    assert.doesNotThrow(() => validateRoadmap(track({ status: "planned", items })));
  }
});

test("all supported roadmap states validate", () => {
  for (const status of ["done", "current", "next", "planned"]) {
    assert.doesNotThrow(() => validateRoadmap(track({ status })));
  }
});

test("malformed roadmap lists are rejected before publication", () => {
  assert.throws(() => validateRoadmap(track({ status: "done", items: "not a list" })),
    /items must be an array/);
  assert.throws(() => validateRoadmap([{ id: "site" }]), /stages must be an array/);
});

test("unknown roadmap states and duplicate tracks are rejected", () => {
  assert.throws(() => validateRoadmap(track({ status: "unknown" })), /invalid stage status/);
  assert.throws(() => validateRoadmap([
    { id: "site", stages: [] }, { id: "site", stages: [] },
  ]), /duplicate id/);
});
