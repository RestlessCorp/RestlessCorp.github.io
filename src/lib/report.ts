// Shapes of the decrypted report, and the decryption itself.
//
// The page ships only ciphertext (see scripts/build-report.mjs). This undoes
// exactly what that script did, in the browser, with the passphrase the visitor
// types. A wrong passphrase fails at the AES-GCM tag check — there is no
// separate "is the password right" branch to bypass.

import type { Localized } from "./i18n";

export type Entry = {
  title: Localized;
  text: Localized;
  tag?: Localized;
};

export type Group = { title: Localized; items: Entry[] };

export type Week = {
  id: string;
  label: Localized;
  hours: number;
  summary: Localized;
  groups: Group[];
  notes?: Localized;
};

export type KanbanItem = Entry & { who?: Localized };

export type StageStatus = "done" | "current" | "next" | "planned";

export type Stage = {
  title: Localized;
  status: StageStatus;
  when: Localized;
  text: Localized;
  items: Localized[];
  /** what the stage waits on, when it is not just our own work */
  needs?: Localized;
};

export type Track = {
  id: string;
  title: Localized;
  subtitle: Localized;
  note?: Localized;
  /** the order we agreed with the client, called out above the stages */
  priorityNote?: Localized;
  /** a date the platform imposes on us, not one we chose */
  deadline?: Localized;
  stages: Stage[];
};

// Open and closed questions used to be their own tab. They now live on the
// board as columns like any other work, so there is one place to look.
export type KanbanColumn = {
  id: string;
  title: Localized;
  items: KanbanItem[];
  // An empty column reads as "nothing is happening", which is rarely what it
  // means — usually the work in it just isn't for this audience yet. When a
  // column can legitimately be empty, it says so in its own words.
  empty?: Localized;
};

export type Report = {
  project: string;
  subtitle: Localized;
  updatedAt: string;
  totals: {
    hoursTotal: number;
    tzDone: number;
    tzTotal: number;
    shipped: number;
    pending: number;
  };
  weeks: Week[];
  release: { title: Localized; note: Localized; items: Entry[] };
  kanban: { note?: Localized; columns: KanbanColumn[] };
  roadmap: { note: Localized; tracks: Track[] };
};

type Envelope = {
  v: number;
  kdf: { name: string; hash: string; iterations: number };
  salt: string;
  iv: string;
  data: string;
};

const fromBase64 = (value: string) =>
  Uint8Array.from(atob(value), (c) => c.charCodeAt(0));

export async function decryptReport(
  envelope: Envelope,
  passphrase: string,
): Promise<Report> {
  const salt = fromBase64(envelope.salt);
  const iv = fromBase64(envelope.iv);
  const data = fromBase64(envelope.data);

  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: envelope.kdf.iterations,
      hash: envelope.kdf.hash,
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  // Throws on a wrong passphrase: the authentication tag will not match.
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    data as BufferSource,
  );
  return JSON.parse(new TextDecoder().decode(plaintext)) as Report;
}
