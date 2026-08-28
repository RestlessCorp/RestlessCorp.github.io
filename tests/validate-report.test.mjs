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
      uk: "19 розділів",
      en: "19 sections",
    },
    totals: { hoursTotal: 1 },
    weeks: [{ id: "2026-08-17", hours: 1 }],
    facts: {
      adminScreenCount: 19,
      productionRelease: {
        state: "production_verified",
        verifiedAt: "2026-08-21",
        sourceSha: "d38676a9e969e77325cea98c0228367fd9d2e922",
        siteDeploymentId: "dpl_site123",
        adminDeploymentId: "dpl_admin123",
        bffDeploymentId: "dpl_bff123",
      },
      teacherEditor: {
        state: "production_verified",
        currentRouteStatus: 401,
        recoveredSourceSha: "d38676a9e969e77325cea98c0228367fd9d2e922",
        recoveredAdminDeploymentId: "dpl_admin123",
        verifiedAt: "2026-08-21",
      },
    },
    kanban: {
      columns: [
        {
          id: "progress",
          items: [
            {
              title: {
                uk: "Мобільний застосунок",
                en: "Mobile app",
              },
            },
          ],
        },
        {
          id: "next",
          items: [
            {
              title: {
                uk: "Порожній слот у розкладі без акаунта",
                en: "An ordinary empty schedule slot without an account",
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
          priorityNote: {
            uk: "Керування практиками й напрямами завершено",
            en: "Classes and disciplines are complete",
          },
          stages: [
            {
              title: { uk: "Викладачі", en: "Teachers" },
              status: "done",
              when: {
                uk: "регресія 15–20 серпня · відновлено 21 серпня",
                en: "regression August 15–20 · recovered August 21",
              },
            },
            {
              title: {
                uk: "Практики, напрями й картинки",
                en: "Classes, disciplines and images",
              },
              status: "done",
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

test("teacher recovery evidence must point to the production deployment", () => {
  const report = validReport();
  report.facts.teacherEditor.recoveredAdminDeploymentId = "dpl_other";

  assert.throws(
    () => validateReport(report),
    /teacher recovery deployment must match the production admin deployment/,
  );
});

test("a completed recovery cannot remain in the in-progress kanban", () => {
  const report = validReport();
  report.kanban.columns[0].items[0].title.en = "Teacher editor recovery";

  assert.throws(
    () => validateReport(report),
    /completed teacher recovery cannot remain in the in-progress kanban/,
  );
});

test("the roadmap preserves the regression while recording recovery", () => {
  const report = validReport();
  const teacher = report.roadmap.tracks[0].stages[0];
  teacher.when = { uk: "відновлено", en: "recovered" };

  assert.throws(
    () => validateReport(report),
    /must preserve the historical regression in English/,
  );
});
