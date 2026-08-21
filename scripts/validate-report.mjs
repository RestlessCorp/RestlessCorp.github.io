import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const RELEASE_STATE_REVISION = /^yoga-fusion\/release-state@(\d{4}-\d{2}-\d{2})$/;
const COMMIT_SHA = /^[0-9a-f]{40}$/;
const DEPLOYMENT_ID = /^dpl_[A-Za-z0-9]+$/;
const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_MANIFEST = resolve(REPOSITORY_ROOT, "report-source.manifest.json");

function assert(condition, message) {
  if (!condition) throw new Error(`Report validation failed: ${message}`);
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    assert(typeof value === "string" && value.length > 0, `${label} contains an empty id`);
    assert(!seen.has(value), `${label} contains duplicate id '${value}'`);
    seen.add(value);
  }
}

function readSourceManifest(manifestPath) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(
      `Report validation failed: cannot read source manifest ${manifestPath}: ${error.message}`,
    );
  }
  assert(
    typeof manifest.defaultLocalPath === "string" && manifest.defaultLocalPath.trim().length > 0,
    "report-source.manifest.json must define defaultLocalPath",
  );
  return manifest;
}

export function resolveReportSource({
  env = process.env,
  manifestPath = SOURCE_MANIFEST,
  cwd = process.cwd(),
} = {}) {
  const explicitPath = env.REPORT_SOURCE_PATH?.trim();
  if (explicitPath) return resolve(cwd, explicitPath);

  const manifest = readSourceManifest(manifestPath);
  return resolve(dirname(manifestPath), manifest.defaultLocalPath);
}

export function validateReport(report) {
  assert(report && typeof report === "object", "root must be an object");
  assert(ISO_DATE.test(report.updatedAt), "updatedAt must be YYYY-MM-DD");
  assert(ISO_DATE.test(report.sourceAsOf), "sourceAsOf must be YYYY-MM-DD");
  assert(report.sourceAsOf <= report.updatedAt, "sourceAsOf cannot be newer than updatedAt");
  const sourceRevision =
    typeof report.sourceRevision === "string"
      ? report.sourceRevision.match(RELEASE_STATE_REVISION)
      : null;
  assert(
    sourceRevision,
    "sourceRevision must be yoga-fusion/release-state@YYYY-MM-DD",
  );
  assert(
    sourceRevision[1] === report.sourceAsOf,
    "sourceRevision date must match sourceAsOf",
  );
  assert(typeof report.statusSource === "string" && report.statusSource.length > 0,
    "statusSource is required");

  assert(Array.isArray(report.weeks) && report.weeks.length > 0, "weeks must be non-empty");
  assertUnique(report.weeks.map((week) => week.id), "weeks");
  const hours = report.weeks.reduce((sum, week) => {
    assert(Number.isFinite(week.hours) && week.hours >= 0, `invalid hours for ${week.id}`);
    return sum + week.hours;
  }, 0);
  assert(hours === report.totals?.hoursTotal,
    `totals.hoursTotal=${report.totals?.hoursTotal} but weeks sum to ${hours}`);

  const columns = report.kanban?.columns;
  assert(Array.isArray(columns), "kanban.columns must be an array");
  assertUnique(columns.map((column) => column.id), "kanban columns");
  const tracks = report.roadmap?.tracks;
  assert(Array.isArray(tracks), "roadmap.tracks must be an array");
  assertUnique(tracks.map((track) => track.id), "roadmap tracks");

  assert(report.facts?.adminScreenCount === 18,
    "facts.adminScreenCount must match the current admin registry (18)");
  const serialized = JSON.stringify(report);
  assert(serialized.includes("18 розділів") && serialized.includes("18 sections"),
    "UA and EN admin-screen statements must both match facts.adminScreenCount");

  const productionRelease = report.facts?.productionRelease;
  assert(productionRelease?.state === "production_verified",
    "production release must be production_verified");
  assert(productionRelease?.verifiedAt === report.sourceAsOf,
    "production release verification date must match sourceAsOf");
  assert(COMMIT_SHA.test(productionRelease?.sourceSha || ""),
    "production release must carry a full source SHA");
  for (const field of ["siteDeploymentId", "adminDeploymentId", "bffDeploymentId"]) {
    assert(DEPLOYMENT_ID.test(productionRelease?.[field] || ""),
      `production release ${field} must be a Vercel deployment id`);
  }

  const teacherState = report.facts?.teacherEditor?.state;
  assert(teacherState === "production_verified",
    "teacher editor must match the production-verified release state");
  assert(report.facts?.teacherEditor?.currentRouteStatus === 401,
    "teacher editor must carry the verified unauthenticated 401 contract");
  assert(report.facts?.teacherEditor?.recoveredSourceSha === productionRelease.sourceSha,
    "teacher recovery source must match the production release source");
  assert(
    report.facts?.teacherEditor?.recoveredAdminDeploymentId ===
      productionRelease.adminDeploymentId,
    "teacher recovery deployment must match the production admin deployment",
  );
  assert(report.facts?.teacherEditor?.verifiedAt === productionRelease.verifiedAt,
    "teacher recovery verification date must match the production release");
  const platform = tracks.find((track) => track.id === "platform");
  const teacherStage = platform?.stages?.find((stage) => stage.title?.en === "Teachers");
  assert(teacherStage, "platform Teachers stage is missing");
  assert(teacherStage.status === "done",
    "production-verified Teachers stage must be marked done");
  assert(/recover/i.test(teacherStage.when?.en || ""),
    "Teachers stage must state the production recovery in English");
  assert(/віднов/i.test(teacherStage.when?.uk || ""),
    "Teachers stage must state the production recovery in Ukrainian");
  assert(/regress/i.test(teacherStage.when?.en || ""),
    "Teachers stage must preserve the historical regression in English");
  assert(/регрес/i.test(teacherStage.when?.uk || ""),
    "Teachers stage must preserve the historical regression in Ukrainian");

  const progress = columns.find((column) => column.id === "progress");
  assert(!progress?.items?.some((item) => /teacher editor recovery/i.test(item.title?.en || "")),
    "completed teacher recovery cannot remain in the in-progress kanban");
  const next = columns.find((column) => column.id === "next");
  assert(next?.items?.some((item) =>
    /classes, disciplines and images/i.test(item.title?.en || "")),
  "next kanban must contain the reconciled classes/disciplines/media block");
  assert(/production verified/i.test(platform?.priorityNote?.en || ""),
    "platform priority note must state production verification in English");
  assert(/production перевір/i.test(platform?.priorityNote?.uk || ""),
    "platform priority note must state production verification in Ukrainian");

  return report;
}

export function loadAndValidateReport(sourcePath = resolveReportSource()) {
  assert(existsSync(sourcePath), `canonical source not found at ${sourcePath}`);

  let report;
  try {
    report = JSON.parse(readFileSync(sourcePath, "utf8"));
  } catch (error) {
    throw new Error(`Report validation failed: cannot parse ${sourcePath}: ${error.message}`);
  }

  validateReport(report);
  return { report, sourcePath };
}

const invokedDirectly = process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  const { report, sourcePath } = loadAndValidateReport();
  console.log(`report valid — ${report.weeks.length} weeks, source ${sourcePath}`);
}
