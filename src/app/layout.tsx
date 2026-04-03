import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Something Is Cooking | Expert Game Development Partner",
  description: "Expert game development support for multiplayer systems, live-service backends, technical architecture, and production support.",
  keywords: [
    "Unity game development studio",
    "game co-development studio",
    "outsource game development",
    "Unity multiplayer development",
    "live-service game development",
    "game porting support",
    "technical art for Unity",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
