'use client';

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silence clipboard errors
    }
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={handleCopy}
      className={cn("h-7 w-7 text-muted-foreground hover:text-foreground", className)}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}

