import * as React from "react";
import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const AvatarRoot = ArkAvatar.Root;

// ============================================================================
// IMAGE
// ============================================================================
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof ArkAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof ArkAvatar.Image>
>(({ className, ...props }, ref) => (
  <ArkAvatar.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full object-cover",
      className,
    )}
    {...props}
  />
));

AvatarImage.displayName = "AvatarImage";

// ============================================================================
// FALLBACK
// ============================================================================
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof ArkAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof ArkAvatar.Fallback>
>(({ className, ...props }, ref) => (
  <ArkAvatar.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted text-muted-foreground",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarRoot>;

export interface AvatarProps extends Omit<AvatarRootProps, "children"> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, className, children, ...props }, ref) => (
    <AvatarRoot
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      {children ?? <AvatarFallback>{fallback}</AvatarFallback>}
    </AvatarRoot>
  ),
);

Avatar.displayName = "Avatar";

export {
  // Conveniencia
  Avatar,
  // Partes atómicas
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
  // Tipos
  type AvatarProps,
};

