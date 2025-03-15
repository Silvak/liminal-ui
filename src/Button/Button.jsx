import { forwardRef } from "react";
import { cn } from "../utils/utils";
import { cva } from "class-variance-authority";

const button = cva("inline-block px-2 py-2 font-semibold", {
  variants: {
    variant: {
      default: "bg-gray-400 text-white",
      primary: "bg-blue-500 text-white",
      secondary: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      danger: "bg-red-500 text-white",
    },
    outline: {
      true: "border border-input bg-transparent text-slate-600",
    },
    rounded: {
      default: "h-10 px-4 py-2",
      basic: "rounded-none",
      rounded: "rounded-lg",
      pill: "rounded-full",
    },
    size: {
      sm: "h-8 px-3 py-1 text-sm",
      md: "h-10 px-4 py-2 text-base",
      lg: "h-12 px-5 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      outline: true,
      className: "border-blue-500 hover:bg-blue-500",
    },
    {
      variant: "secondary",
      outline: true,
      className: "border-green-500 hover:bg-green-500",
    },
    {
      variant: "warning",
      outline: true,
      className: "border-yellow-500 hover:bg-yellow-500",
    },
    {
      variant: "danger",
      outline: true,
      className: "border-red-500 hover:bg-red-500",
    },
  ],
  defaultVariants: {
    variant: "default",
  },
});

export const Button = forwardRef(
  ({ children, className, variant, rounded, outline, size, ...props }) => {
    return (
      <button
        className={cn(button({ variant, rounded, outline, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
