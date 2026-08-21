// Validates the versioned private report source and encrypts it into
// public/report.enc.
//
// GitHub Pages is static hosting: there is no server to check a password, so a
// JavaScript comparison would be theatre — the answer would sit in the bundle
// next to the question. Instead the report itself is encrypted and only the
// ciphertext is published. Without the passphrase the page has nothing to show,
// not even in view-source.
//
// AES-256-GCM with a PBKDF2-SHA256 key (300k iterations) — the same primitives
// the browser gets from Web Crypto, so the page can undo exactly this.
//
// Run with REPORT_SOURCE_PATH and REPORT_PASSPHRASE; only report.enc is
// committed to this public repository.

import { writeFileSync, mkdirSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";
import { loadAndValidateReport } from "./validate-report.mjs";

const PASSPHRASE = process.env.REPORT_PASSPHRASE;
const ITERATIONS = 300_000;

if (!PASSPHRASE) {
  throw new Error("REPORT_PASSPHRASE is required; there is no repository fallback.");
}
if (PASSPHRASE.length < 16) {
  throw new Error("REPORT_PASSPHRASE must be at least 16 characters.");
}

const { report: source, sourcePath } = loadAndValidateReport();
const plaintext = new TextEncoder().encode(JSON.stringify(source));

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const baseKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(PASSPHRASE),
  "PBKDF2",
  false,
  ["deriveKey"],
);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
  baseKey,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"],
);
const ciphertext = new Uint8Array(
  await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext),
);

const b64 = (bytes) => Buffer.from(bytes).toString("base64");

mkdirSync("public", { recursive: true });
writeFileSync(
  "public/report.enc",
  JSON.stringify({
    v: 1,
    kdf: { name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONS },
    salt: b64(salt),
    iv: b64(iv),
    data: b64(ciphertext),
  }),
);

const weeks = source.weeks?.length ?? 0;
console.log(
  `report.enc written — ${weeks} тижн${weeks === 1 ? "евий блок" : "і"}, ` +
    `${(ciphertext.length / 1024).toFixed(1)} KB шифротексту; source ${sourcePath}`,
);
