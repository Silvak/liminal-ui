'use client';

import * as React from 'react';
import { Copy, Download, ChevronDown, Check, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const CHATGPT_URL = 'https://chat.openai.com/';
const GEMINI_URL = 'https://gemini.google.com/';

interface DocActionsProps {
  title: string;
  slug: string;
  rawContent: string;
  className?: string;
}

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok ? Promise.resolve() : Promise.reject(new Error('Copy failed'));
}

export function DocActions({ title, slug, rawContent, className }: DocActionsProps) {
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleCopy = React.useCallback(async () => {
    try {
      await copyToClipboard(rawContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [rawContent]);

  const handleDownload = React.useCallback(() => {
    const filename = slug ? `${slug.replace(/\//g, '-')}.md` : `${title.replace(/\s+/g, '-').toLowerCase()}.md`;
    const blob = new Blob([rawContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  }, [rawContent, slug, title]);

  const openInChatGPT = React.useCallback(async () => {
    try {
      await copyToClipboard(rawContent);
    } catch {
      // ignore
    }
    window.open(CHATGPT_URL, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }, [rawContent]);

  const openInGemini = React.useCallback(async () => {
    try {
      await copyToClipboard(rawContent);
    } catch {
      // ignore
    }
    window.open(GEMINI_URL, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }, [rawContent]);

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const headerButtonClass =
    'h-10 border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return (
    <div className={cn('relative flex items-center', className)} ref={menuRef}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn(
          headerButtonClass,
          'rounded-l-md px-3 gap-1.5',
        )}
        aria-label={copied ? 'Copied' : 'Copy page'}
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        Copy Page
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          headerButtonClass,
          '-ml-px h-10 w-10 rounded-none rounded-r-md',
        )}
        aria-label="More actions"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-md"
          role="menu"
        >
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 shrink-0" />
            Download MD
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={openInChatGPT}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Open in ChatGPT
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
            onClick={openInGemini}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Open in Gemini
          </button>
        </div>
      )}
    </div>
  );
}
