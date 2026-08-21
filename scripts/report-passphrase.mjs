export const MIN_REPORT_PASSPHRASE_LENGTH = 10;

/**
 * The team owns the passphrase and supplies it explicitly for every build.
 * There is deliberately no fallback and no automatic rotation here.
 */
export function requireReportPassphrase(env = process.env) {
  const passphrase = env.REPORT_PASSPHRASE;
  if (!passphrase) {
    throw new Error(
      "REPORT_PASSPHRASE is required; there is no repository fallback.",
    );
  }
  if (passphrase.length < MIN_REPORT_PASSPHRASE_LENGTH) {
    throw new Error(
      `REPORT_PASSPHRASE must be at least ${MIN_REPORT_PASSPHRASE_LENGTH} characters.`,
    );
  }
  return passphrase;
}
