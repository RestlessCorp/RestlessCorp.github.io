import assert from "node:assert/strict";
import { test } from "node:test";

import {
  MIN_REPORT_PASSPHRASE_LENGTH,
  requireReportPassphrase,
} from "../scripts/report-passphrase.mjs";

test("report builds never get a repository fallback passphrase", () => {
  assert.throws(
    () => requireReportPassphrase({}),
    /REPORT_PASSPHRASE is required; there is no repository fallback/,
  );
});

test("the established ten-character team contract remains accepted", () => {
  const passphrase = "1234567890";
  assert.equal(MIN_REPORT_PASSPHRASE_LENGTH, passphrase.length);
  assert.equal(
    requireReportPassphrase({ REPORT_PASSPHRASE: passphrase }),
    passphrase,
  );
});

test("short accidental values are still rejected", () => {
  assert.throws(
    () => requireReportPassphrase({ REPORT_PASSPHRASE: "123456789" }),
    /must be at least 10 characters/,
  );
});
