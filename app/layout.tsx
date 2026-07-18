import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "工廠智流｜生產管理系統",
  description: "即時掌握工廠產量、機台與生產績效。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
