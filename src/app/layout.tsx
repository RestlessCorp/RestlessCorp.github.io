import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Something Is Cooking | Expert Game Development Partner",
  description: "Expert game development support with Unity development, QA + PM, 2D art coverage, porting, and multiplatform release support.",
  keywords: [
    "Unity game development studio",
    "game co-development studio",
    "outsource game development",
    "Unity developers",
    "game QA and production support",
    "2D game artist",
    "game porting support",
    "multiplatform game development",
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
