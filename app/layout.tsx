import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoaib Israr - Senior Accountant | Professional Portfolio",
  description: "Senior Accountant with 3+ years of experience in financial management, analysis, and strategic planning. Transforming financial data into strategic insights for startups and enterprises.",
  keywords: "senior accountant, financial analyst, accounting professional, finance expert, CPA, QuickBooks, financial reporting, audit, tax planning",
  authors: [{ name: "Shoaib Israr" }],
  openGraph: {
    title: "Shoaib Israr - Senior Accountant Portfolio",
    description: "Professional accounting services with modern financial technology expertise",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
