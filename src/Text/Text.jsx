import { forwardRef } from "react";
import { cn } from "../utils/utils";
import { cva } from "class-variance-authority";

const textStyles = cva("w-full", {
  variants: {
    emphasis: {
      low: "text-gray-600 font-light",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      thin: "font-thin",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    italic: {
      true: "italic",
    },
    underline: {
      true: "underline underline-offset-2",
    },
  },
  defaultVariants: {
    size: "base",
    align: "left",
  },
});

export const Text = forwardRef(
  (
    {
      as,
      children,
      emphasis,
      size,
      weight,
      align,
      italic,
      underline,
      className,
      ...props
    },
    ref
  ) => {
    const Component = as || "p";
    return (
      <Component
        className={cn(
          textStyles({
            emphasis,
            size,
            weight,
            align,
            italic,
            underline,
          }),
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

/*
export const Text = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <p className={cn(textStyles({}), className)} {...props} ref={ref}>
      {children}
    </p>
  );
});
*/
