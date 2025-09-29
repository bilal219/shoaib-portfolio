import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AnimatedSphereBackground from "@/components/AnimatedSphereBackground";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeToggle from "@/components/ThemeToggle";

const dreams = localFont({
  src: [
    {
      path: "./fonts/DREAMS.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-dreams",
  display: "swap",
  preload: true,
});

const helvetica = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Muhammad Shoaib Israr | Executive Accounts - Financial Management Expert",
  description:
    "Seasoned Accounts Executive with expertise in financial management, accounting, and analysis. Specialized in accounts payable/receivable, QuickBooks, Odoo ERP, and financial reporting. Currently at WEJ SHOES.",
  keywords: [
    "Muhammad Shoaib Israr",
    "Executive Accounts",
    "Accounts Executive",
    "Financial Management",
    "Accounting Professional",
    "QuickBooks Expert",
    "Odoo ERP",
    "Financial Reporting",
    "Accounts Payable Receivable",
    "Accountant Pakistan",
    "WEJ SHOES",
    "Cash Flow Management",
    "Budget Preparation",
    "Financial Analysis",
    "Excel Expert",
    "VLOOKUP",
    "Pivot Tables",
    "Banking Operations",
    "Finance Executive",
    "Accounting Software",
    "Tax Preparation",
    "Payroll Processing",
    "Inventory Auditing",
    "Compliance",
    "Financial Compliance",
    "Commerce Graduate"
  ].join(", "),
  authors: [{
    name: "Muhammad Shoaib Israr",
    url: ""
  }],
  creator: "Muhammad Shoaib Israr",
  publisher: "Muhammad Shoaib Israr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Muhammad Shoaib Israr | Executive Accounts Portfolio",
    description:
      "Seasoned Accounts Executive with expertise in financial management, accounting, QuickBooks, Odoo ERP, and comprehensive financial reporting.",
    url: "",
    siteName: "Muhammad Shoaib Israr Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Shoaib Israr - Executive Accounts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Shoaib Israr | Executive Accounts",
    description:
      "Seasoned Accounts Executive with expertise in financial management, QuickBooks, Odoo ERP, and accounting operations.",
    images: ["/avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your actual verification code
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const stored = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = stored ? stored === 'dark' : prefersDark;
              if (isDark) document.documentElement.classList.add('dark');
            })();
          `
        }} />
      </head>
      <body
        className={`${dreams.variable} ${helvetica.variable} bg-slate-50 dark:bg-slate-900 antialiased selection:bg-portfolio selection:text-slate-900 relative overflow-x-hidden transition-colors duration-300 text-content`}
      >
        <AnimatedSphereBackground />
        <ScrollToTop />
        {/* Theme Toggle - Fixed Top Right */}
        <div className="fixed top-6 right-6 z-30">
          <ThemeToggle />
        </div>
        <div className="relative z-10 mx-auto min-h-screen px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-8 lg:max-w-7xl lg:mx-auto">
            {children}
          </div>
        </div>
        <div id="skip-to-content" className="sr-only">
          <a
            href="#content"
            className="absolute left-0 top-0 z-50 block bg-portfolio px-4 py-2 text-slate-900 focus:not-sr-only"
          >
            Skip to main content
          </a>
        </div>
      </body>
    </html>
  );
}
