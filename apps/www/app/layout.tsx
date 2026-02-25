import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import './globals.css';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  title: 'Liminal UI — Build beautiful UIs you own',
  description:
    'Copy-paste React components built with Ark UI and Tailwind CSS. No black boxes, just source code you control.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable}`}
        style={{ fontFamily: 'var(--font-ibm), "Courier New", monospace' }}
      >
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
