// Shapes of the decrypted report, and the decryption itself.
//
// The page ships only ciphertext (see scripts/build-report.mjs). This undoes
// exactly what that script did, in the browser, with the passphrase the visitor
// types. A wrong passphrase fails at the AES-GCM tag check — there is no
// separate "is the password right" branch to bypass.

export type Entry = { title: string; text: string; tag?: string };

export type Group = { title: string; items: Entry[] };

export type Week = {
  id: string;
  label: string;
  hours: number;
  summary: string;
  groups: Group[];
  notes?: string;
};

export type KanbanItem = Entry & { who?: string };
export type KanbanColumn = { id: string; title: string; items: KanbanItem[] };

export type Report = {
  project: string;
  subtitle: string;
  updatedAt: string;
  totals: {
    hoursTotal: number;
    tzDone: number;
    tzTotal: number;
    shipped: number;
    pending: number;
  };
  weeks: Week[];
  release: { title: string; note: string; items: Entry[] };
  kanban: { columns: KanbanColumn[] };
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
