"use client";

import Image from "next/image";

export function ComingSoonSection() {
  return (
    <section className="w-full px-6 md:px-8">
      <div className="relative flex mx-auto h-min-content max-w-[1440px] border-x flex-col">
        {/* Header */}
        <div className="w-full border-b px-6 py-8 md:px-10">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            COMING SOON
          </p>
          <h2
            className="font-display leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Full dashboards.
            <br />
            Complex components.
          </h2>
        </div>

        {/* Two columns: image left, copy right */}
        <div className="w-full flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Image */}
          <div
            className="w-full md:w-[50%] md:border-r relative overflow-hidden min-h-[280px] md:min-h-[420px]"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="absolute top-3 right-3 h-4 w-4 border-r border-t pointer-events-none z-10" style={{ borderColor: "var(--primary)" }} />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-l border-b pointer-events-none z-10" style={{ borderColor: "var(--primary)" }} />
            <Image
              src="/hbg2.png"
              alt="Dashboard and complex components preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Right: Copy */}
          <div className="w-full md:w-[50%] flex flex-col justify-center px-6 py-10 md:px-10 md:py-12">
            <p className="font-ibm text-[13px] leading-[1.8] text-muted-foreground max-w-md">
              We&apos;re building ready-to-drop dashboard layouts and richer composite
              components — data tables, charts, sidebars, and multi-step flows.
              All built on the same primitives you already use, so they fit
              seamlessly into your stack.
            </p>
            <p className="font-ibm text-[12px] text-muted-foreground/80 mt-6">
              Stay tuned for updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
