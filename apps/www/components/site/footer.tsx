"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocaleOptional } from "@/components/locale-provider";

const REPO = "https://github.com/silvak/liminal-ui";
const CONTACT_EMAIL = "sivak.jeg@gmail.com";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Liminal UI")}`;

type FooterLink = { label: string; href: string; external?: boolean };

function FooterColumn({
  title,
  links,
  prefix,
}: {
  title: string;
  links: FooterLink[];
  prefix: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-ibm text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
        {title}
      </p>
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.external ? item.href : `${prefix}${item.href}`}
              {...(item.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const locale = useLocaleOptional();
  const prefix = locale ? `/${locale}` : "";

  const productLinks: FooterLink[] = [
    { label: "Docs", href: "/docs/introduction" },
    { label: "Components", href: "/docs/components/button" },
    { label: "Playground", href: "/playground" },
    { label: "Blog", href: "/blog" },
  ];

  const resourceLinks: FooterLink[] = [
    { label: "GitHub", href: REPO, external: true },
    { label: "Changelog", href: `${REPO}/releases`, external: true },
    { label: "MIT License", href: `${REPO}/blob/main/LICENSE`, external: true },
  ];

  const communityLinks: FooterLink[] = [
    { label: "Discussions", href: `${REPO}/discussions`, external: true },
    { label: "Issues", href: `${REPO}/issues`, external: true },
    { label: "Pull requests", href: `${REPO}/pulls`, external: true },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="w-full px-6 md:px-8">
        <div className="mx-auto max-w-[1440px] border-x border-border bg-white dark:bg-background">
          <div className="grid gap-10 px-6 py-12 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="flex flex-col gap-5 lg:col-span-4">
              <Link
                href={prefix || "/"}
                className="flex w-fit items-center gap-3 transition-opacity hover:opacity-90"
              >
                <Image
                  src="/logo.png"
                  alt="Liminal UI"
                  width={34}
                  height={34}
                />
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Liminal UI
                </span>
              </Link>
              <p className="max-w-sm font-ibm text-sm text-muted-foreground">
                Copy-paste React components on Ark UI and Tailwind. Own every
                line — no lock-in.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={REPO}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors",
                    "hover:z-10 hover:border-primary hover:text-foreground",
                  )}
                >
                  <Github className="h-4 w-4" />
                </Link>
                <a
                  href={MAILTO_HREF}
                  aria-label={`Enviar correo a ${CONTACT_EMAIL}`}
                  title={CONTACT_EMAIL}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors",
                    "-ml-px hover:z-10 hover:border-primary hover:text-foreground",
                  )}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
              <FooterColumn
                title="Product"
                links={productLinks}
                prefix={prefix}
              />
              <FooterColumn
                title="Resources"
                links={resourceLinks}
                prefix={prefix}
              />
              <FooterColumn
                title="Community"
                links={communityLinks}
                prefix={prefix}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} Liminal UI. MIT License.</p>
            <p className="font-ibm text-xs uppercase tracking-widest text-muted-foreground/80 md:text-right">
              Built with{" "}
              <a
                href="https://ark-ui.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Ark UI
              </a>{" "}
              +{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Tailwind CSS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
