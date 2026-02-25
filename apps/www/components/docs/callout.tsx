import * as React from "react";
import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

type CalloutVariant = "info" | "tip" | "warning" | "danger";

interface CalloutProps {
  type?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<
  CalloutVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    containerClass: string;
    iconClass: string;
  }
> = {
  info: {
    icon: Info,
    title: "Info",
    containerClass: "border-blue-500/30 bg-blue-500/10",
    iconClass: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    containerClass: "border-emerald-500/30 bg-emerald-500/10",
    iconClass: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    containerClass: "border-amber-500/30 bg-amber-500/10",
    iconClass: "text-amber-500",
  },
  danger: {
    icon: ShieldAlert,
    title: "Cuidado",
    containerClass: "border-red-500/30 bg-red-500/10",
    iconClass: "text-red-500",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const variant = variantMap[type];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-xl border px-4 py-3",
        variant.containerClass,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", variant.iconClass)} />
        <div className="min-w-0">
          <p className="mb-1 text-sm font-semibold">{title ?? variant.title}</p>
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
