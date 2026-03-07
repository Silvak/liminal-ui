import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const isTweakcnEnabled =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_TWEAKCN_ENABLED !== "false"
    : true;

export const metadata: Metadata = {
  title: "Liminal UI — Build beautiful UIs you own",
  description:
    "Copy-paste React components built with Ark UI and Tailwind CSS. No black boxes, just source code you control.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") === "es" ? "es" : "en";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body suppressHydrationWarning>
        {isTweakcnEnabled && (
          <Script
            async
            crossOrigin="anonymous"
            src="https://tweakcn.com/live-preview.min.js"
            strategy="afterInteractive"
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
