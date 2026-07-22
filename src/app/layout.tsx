import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yoga Fusion — статус розробки",
  description: "Закрита сторінка статусу проєкту.",
  // The report is behind a passphrase; there is no reason for it to appear in
  // anyone's search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
