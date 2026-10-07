import type { Metadata } from "next";
import "./globals.css";

import { siteConfig } from "@/config/site";

import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logos/logo-light.svg",
        href: "/logos/logo-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logos/logo-dark.svg",
        href: "/logos/logo-dark.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}
