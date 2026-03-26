import { NextRequest, NextResponse } from "next/server";

const LOCALE_COOKIE = "liminal-ui-locale";
const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];

function isStaticAsset(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie === "es" || cookie === "en") return cookie;

  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return "en";

  const preferred = acceptLanguage
    .split(",")
    .map((s) => s.split(";")[0].trim().toLowerCase());
  for (const lang of preferred) {
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("en")) return "en";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (pathname.startsWith("/docs") || pathname.startsWith("/blog")) {
    const locale = getPreferredLocale(request);
    const newPath = pathname === "/docs" || pathname === "/docs/"
      ? `/${locale}/docs/introduction`
      : pathname === "/blog" || pathname === "/blog/"
        ? `/${locale}/blog`
        : `/${locale}${pathname}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  if (pathname.startsWith("/en")) {
    requestHeaders.set("x-locale", "en");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  if (pathname.startsWith("/es")) {
    requestHeaders.set("x-locale", "es");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
