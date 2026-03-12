import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rindo Ohno | Portfolio",
  description:
    "バイブコーディングでアイデアを最速でプロダクトに変えるエンジニア。AIを開発パートナーとして活用し、Flutter・Next.jsでプロダクト開発。",
  openGraph: {
    title: "Rindo Ohno | Portfolio",
    description:
      "バイブコーディングでアイデアを最速でプロダクトに変えるエンジニア。AIを開発パートナーとして活用し、Flutter・Next.jsでプロダクト開発。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
