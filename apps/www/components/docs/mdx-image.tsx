"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface MdxImageProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  zoom?: boolean;
}

export function MdxImage({
  src,
  alt = "",
  title,
  className,
  width = 1600,
  height = 900,
  zoom = true,
}: MdxImageProps) {
  const [open, setOpen] = React.useState(false);
  const canZoom = zoom && Boolean(src);

  return (
    <>
      <figure className={cn("my-8", className)}>
        <button
          type="button"
          onClick={() => canZoom && setOpen(true)}
          className={cn("block w-full", canZoom ? "cursor-zoom-in" : "cursor-default")}
          aria-label={canZoom ? "Open image in full size" : undefined}
          disabled={!canZoom}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1200px) 100vw, 960px"
            className="h-auto w-full rounded-xl border border-border shadow-sm"
          />
        </button>
        {title ? (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {title}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="max-h-[90vh] max-w-[90vw]">
            <Image
              src={src}
              alt={alt}
              width={Math.max(width, 1920)}
              height={Math.max(height, 1080)}
              className="max-h-[90vh] w-auto rounded-lg"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
