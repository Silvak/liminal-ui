"use client";

import {
  Search,
  Menu,
  X,
  ChevronRight,
  Moon,
  Sun,
  Github,
  Globe,
  Sparkles,
  Check,
  Copy,
  Play,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Settings,
  User,
  Mail,
  Calendar,
  Clock,
  Tag,
  Layers,
  Box,
  Frame,
  Palette,
  Type,
  Zap,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["icons"];
};

const ICON_GROUPS = [
  {
    name: "Navigation",
    icons: [
      { icon: Menu, name: "Menu" },
      { icon: X, name: "X" },
      { icon: ChevronRight, name: "ChevronRight" },
      { icon: ArrowRight, name: "ArrowRight" },
      { icon: ArrowLeft, name: "ArrowLeft" },
      { icon: ExternalLink, name: "ExternalLink" },
    ],
  },
  {
    name: "Interface",
    icons: [
      { icon: Search, name: "Search" },
      { icon: Settings, name: "Settings" },
      { icon: Plus, name: "Plus" },
      { icon: Minus, name: "Minus" },
      { icon: Eye, name: "Eye" },
      { icon: EyeOff, name: "EyeOff" },
    ],
  },
  {
    name: "Status",
    icons: [
      { icon: Check, name: "Check" },
      { icon: CheckCircle, name: "CheckCircle" },
      { icon: AlertCircle, name: "AlertCircle" },
      { icon: Info, name: "Info" },
      { icon: XCircle, name: "XCircle" },
      { icon: Sparkles, name: "Sparkles" },
    ],
  },
  {
    name: "Actions",
    icons: [
      { icon: Copy, name: "Copy" },
      { icon: Play, name: "Play" },
      { icon: RotateCcw, name: "RotateCcw" },
      { icon: Github, name: "Github" },
      { icon: Globe, name: "Globe" },
      { icon: Mail, name: "Mail" },
    ],
  },
  {
    name: "Theme",
    icons: [
      { icon: Moon, name: "Moon" },
      { icon: Sun, name: "Sun" },
      { icon: Palette, name: "Palette" },
      { icon: Layers, name: "Layers" },
      { icon: Box, name: "Box" },
      { icon: Frame, name: "Frame" },
    ],
  },
  {
    name: "Content",
    icons: [
      { icon: Type, name: "Type" },
      { icon: Tag, name: "Tag" },
      { icon: User, name: "User" },
      { icon: Calendar, name: "Calendar" },
      { icon: Clock, name: "Clock" },
      { icon: Zap, name: "Zap" },
    ],
  },
];

const SIZES = [12, 16, 20, 24, 32] as const;
const STROKES = [1, 1.5, 2, 2.5] as const;

export function DsIcons({ copy }: Props) {
  return (
    <section id="icons" className="w-full border-b">
      {/* Header */}
      <div className="px-6 py-8 md:px-10 border-b">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {copy.overline}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="font-display font-semibold leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {copy.title}
          </h2>
          <p className="font-ibm text-[13px] leading-relaxed text-muted-foreground md:max-w-sm md:text-right">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {/* Sizes & stroke */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Sizes */}
        <div
          className="px-6 py-8 md:px-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
            {copy.sizeLabel}
          </p>
          <div className="flex items-end gap-6 flex-wrap">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Wind size={size} strokeWidth={1.5} style={{ color: "var(--foreground)" }} />
                <span className="font-ibm text-[9px] text-muted-foreground">
                  {size}px
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stroke */}
        <div className="px-6 py-8 md:px-10">
          <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
            {copy.strokeLabel}
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {STROKES.map((stroke) => (
              <div key={stroke} className="flex flex-col items-center gap-2">
                <Zap
                  size={24}
                  strokeWidth={stroke}
                  style={{ color: "var(--foreground)" }}
                />
                <span className="font-ibm text-[9px] text-muted-foreground">
                  {stroke}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 font-ibm text-[11px] text-muted-foreground/70">
            Default: <code className="text-foreground">strokeWidth=2</code> (Lucide default)
          </p>
        </div>
      </div>

      {/* Usage note */}
      <div
        className="flex items-start gap-3 border-b px-6 py-4 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
        <p className="font-ibm text-[11px] italic text-muted-foreground">
          {copy.usageNote}
        </p>
      </div>

      {/* Icon groups */}
      {ICON_GROUPS.map((group) => (
        <div key={group.name} className="border-b" style={{ borderColor: "var(--border)" }}>
          <div
            className="border-b px-6 py-3 md:px-10"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {group.name}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6">
            {group.icons.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 border-r last:border-r-0 px-4 py-5 transition-colors hover:bg-muted/30 [&:nth-child(3n)]:sm:border-r [&:nth-child(3n)]:border-r-0 [&:nth-child(3n)]:sm:[&:nth-child(6n)]:border-r-0"
                style={{ borderColor: "var(--border)" }}
              >
                <Icon size={20} strokeWidth={1.5} style={{ color: "var(--foreground)" }} />
                <span className="font-ibm text-[9px] text-muted-foreground text-center">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* In context */}
      <div className="px-6 py-8 md:px-10">
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {copy.contextLabel}
        </p>
        <div className="flex flex-col gap-3 max-w-md">
          {/* Nav link */}
          <div
            className="flex h-10 items-center gap-2 border px-4 font-ibm text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            style={{ borderColor: "var(--border)" }}
          >
            <Search className="h-4 w-4" />
            <span>Search documentation</span>
            <code className="ml-auto font-ibm text-[9px] text-muted-foreground/60">
              Ctrl+K
            </code>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 border px-2 py-1"
              style={{ borderColor: "var(--border)" }}
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="font-ibm text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                New
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 border px-2 py-1"
              style={{ borderColor: "var(--border)" }}
            >
              <CheckCircle className="h-3 w-3 text-muted-foreground" />
              <span className="font-ibm text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Stable
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 border px-4 font-ibm text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground self-start"
            style={{ borderColor: "var(--border)" }}
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
          </button>
        </div>
      </div>
    </section>
  );
}
