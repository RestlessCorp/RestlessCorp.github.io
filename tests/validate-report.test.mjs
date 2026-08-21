import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, test } from "node:test";

import {
  resolveReportSource,
  validateReport,
} from "../scripts/validate-report.mjs";

const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

function temporaryDirectory() {
  const directory = mkdtempSync(join(tmpdir(), "yf-report-validator-"));
  temporaryDirectories.push(directory);
  return directory;
}

function validReport() {
  return {
    updatedAt: "2026-08-21",
    sourceAsOf: "2026-08-21",
    sourceRevision: "yoga-fusion/release-state@2026-08-21",
    statusSource: "yoga-fusion-frontend/docs/production-status.md",
    subtitle: {
      uk: "18 розділів",
      en: "18 sections",
    },
    totals: { hoursTotal: 1 },
    weeks: [{ id: "2026-08-17", hours: 1 }],
    facts: {
      adminScreenCount: 18,
      teacherEditor: { state: "regressed" },
    },
    kanban: {
      columns: [
        {
          id: "progress",
          items: [
            {
              title: {
                uk: "Відновлення редактора викладачів",
                en: "Teacher editor recovery",
              },
            },
          ],
        },
      ],
    },
    roadmap: {
      tracks: [
        {
          id: "platform",
          priorityNote: { uk: "Відновлення триває", en: "Recovery in progress" },
          stages: [
            {
              title: { uk: "Викладачі", en: "Teachers" },
              status: "current",
              when: { uk: "регресія", en: "regression" },
            },
          ],
        },
      ],
    },
  };
}

test("REPORT_SOURCE_PATH has priority over the documented local default", () => {
  const root = temporaryDirectory();
  const explicit = join(root, "private", "report.json");
  const manifestPath = join(root, "renderer", "report-source.manifest.json");
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(
    manifestPath,
    JSON.stringify({ defaultLocalPath: "../missing/report.json" }),
  );

  assert.equal(
    resolveReportSource({
      env: { REPORT_SOURCE_PATH: explicit },
      manifestPath,
      cwd: root,
    }),
    resolve(explicit),
  );
});

test("the default source path is resolved relative to its manifest", () => {
  const root = temporaryDirectory();
  const manifestPath = join(root, "renderer", "report-source.manifest.json");
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(
    manifestPath,
    JSON.stringify({ defaultLocalPath: "../private/report-source/report.json" }),
  );

  assert.equal(
    resolveReportSource({ env: {}, manifestPath, cwd: tmpdir() }),
    join(root, "private", "report-source", "report.json"),
  );
});

test("sourceRevision identifies the release-state date used by the report", () => {
  assert.equal(validateReport(validReport()).sourceAsOf, "2026-08-21");
});

test("sourceRevision rejects an untraceable free-form value", () => {
  const report = validReport();
  report.sourceRevision = "latest";

  assert.throws(
    () => validateReport(report),
    /sourceRevision must be yoga-fusion\/release-state@YYYY-MM-DD/,
  );
});

test("sourceRevision date must match sourceAsOf", () => {
  const report = validReport();
  report.sourceRevision = "yoga-fusion/release-state@2026-08-20";

  assert.throws(
    () => validateReport(report),
    /sourceRevision date must match sourceAsOf/,
  );
});
