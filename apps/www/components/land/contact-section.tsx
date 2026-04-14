import Link from "next/link";
import { Github, Mail } from "lucide-react";
import type { LandingDictionary } from "@/lib/landing-dictionary";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  contactMailtoHref,
  GITHUB_REPO_URL,
} from "@/lib/site-contact";

type ContactCopy = LandingDictionary["contact"];

export function ContactSection({ copy }: { copy: ContactCopy }) {
  return (
    <section id="contact" className="w-full border-b px-4 md:px-8">
      <div className="relative flex mx-auto h-min-content max-w-[1440px] border-x flex-col">
        <div className="w-full border-b px-6 py-8 md:px-10">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {copy.overline}
          </p>
          <h2
            className="font-display leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            {copy.title}
          </h2>
        </div>

        <div className="flex w-full flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <p className="max-w-xl font-ibm text-[13px] leading-[1.8] text-muted-foreground">
            {copy.body}
          </p>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={contactMailtoHref()}
              title={CONTACT_EMAIL}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/70 px-4 font-ibm text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-md transition-colors",
                "hover:z-10 hover:border-primary hover:bg-primary hover:text-background",
              )}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {copy.emailCta}
            </a>
            <Link
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background/70 px-4 font-ibm text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-md transition-colors",
                "hover:z-10 hover:border-primary hover:bg-primary hover:text-background",
              )}
            >
              <Github className="h-4 w-4 shrink-0" aria-hidden />
              {copy.githubCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
