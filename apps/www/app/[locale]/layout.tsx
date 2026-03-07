import { notFound } from "next/navigation";
import { LocaleProvider } from "../../components/locale-provider";

const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];

function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
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

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
