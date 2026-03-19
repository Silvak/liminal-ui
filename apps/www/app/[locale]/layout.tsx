import { notFound } from "next/navigation";
import { LocaleProvider } from "../../components/locale-provider";
import { SiteCopyProvider } from "../../components/site-copy-provider";
import { getSiteDictionary } from "../../lib/site-dictionary";
import type { Locale } from "../../lib/landing-dictionary";

const LOCALES: Locale[] = ["en", "es"];

function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const siteCopy = await getSiteDictionary(locale as Locale);

  return (
    <LocaleProvider locale={locale}>
      <SiteCopyProvider value={siteCopy}>{children}</SiteCopyProvider>
    </LocaleProvider>
  );
}
