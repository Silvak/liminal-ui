import { cn } from "../utils/utils";
import { cva } from "class-variance-authority";

const button = cva("inline-block px-2 py-2 font-semibold", {
  variants: {
    colVariant: {
      default: "bg-gray-400 text-white",
      primary: "bg-blue-500 text-white",
      secondary: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      danger: "bg-red-500 text-white",
    },
    outline: {
      true: "border border-input bg-transparent text-slate-600",
    },
    variant: {
      default: "h-10 px-4 py-2",
      basic: "rounded-none",
      rounded: "rounded-lg",
      pill: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "basic",
    colVariant: "default",
  },
});

export const Button = ({
  children,
  className,
  variant,
  outline,
  colVariant,
  ...props
}) => {
  return (
    <button
      className={cn(button({ colVariant, variant, outline, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
