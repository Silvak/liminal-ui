import { jsx as s } from "react/jsx-runtime";
import { forwardRef as d } from "react";
import { clsx as f } from "clsx";
import { twMerge as g } from "tailwind-merge";
import { cva as m } from "class-variance-authority";
function u(...e) {
  return g(f(e));
}
const p = m("inline-block px-2 py-2 font-semibold", {
  variants: {
    variant: {
      default: "bg-gray-400 text-white",
      primary: "bg-blue-500 text-white",
      secondary: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      danger: "bg-red-600 text-white"
    },
    outline: {
      true: "border border-input bg-transparent text-slate-600"
    },
    rounded: {
      default: "h-10 px-4 py-2",
      basic: "rounded-none",
      rounded: "rounded-lg",
      pill: "rounded-full"
    },
    size: {
      sm: "h-8 px-3 py-1 text-sm",
      md: "h-10 px-4 py-2 text-base",
      lg: "h-14 px-5 py-3 text-lg"
    }
  },
  compoundVariants: [
    {
      variant: "primary",
      outline: !0,
      className: "border-blue-500 hover:bg-blue-500"
    },
    {
      variant: "secondary",
      outline: !0,
      className: "border-green-500 hover:bg-green-500"
    },
    {
      variant: "warning",
      outline: !0,
      className: "border-yellow-500 hover:bg-yellow-500"
    },
    {
      variant: "danger",
      outline: !0,
      className: "border-red-500 hover:bg-red-500"
    }
  ],
  defaultVariants: {
    variant: "default"
  }
}), h = d(
  ({ children: e, className: r, variant: t, rounded: n, outline: a, size: l, ...o }, i) => /* @__PURE__ */ s(
    "button",
    {
      ref: i,
      className: u(p({ variant: t, rounded: n, outline: a, size: l, className: r })),
      ...o,
      children: e
    }
  )
);
h.displayName = "Button";
const y = m("w-full", {
  variants: {
    emphasis: {
      low: "text-gray-600 font-light"
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl"
    },
    weight: {
      thin: "font-thin",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    italic: {
      true: "italic"
    },
    underline: {
      true: "underline underline-offset-2"
    }
  },
  defaultVariants: {
    size: "base",
    align: "left"
  }
}), w = d(
  ({
    as: e,
    children: r,
    emphasis: t,
    size: n,
    weight: a,
    align: l,
    italic: o,
    underline: i,
    className: x,
    ...b
  }, c) => /* @__PURE__ */ s(
    e || "p",
    {
      className: u(
        y({
          emphasis: t,
          size: n,
          weight: a,
          align: l,
          italic: o,
          underline: i
        }),
        x
      ),
      ...b,
      ref: c,
      children: r
    }
  )
);
w.displayName = "Text";
const v = d(
  ({ children: e, col: r, spacing: t, className: n, ...a }, l) => /* @__PURE__ */ s(
    "div",
    {
      ref: l,
      className: u(
        "flex gap-4 flex-wrap",
        r && "flex-col",
        t && `space-${t}`,
        n
      ),
      ...a,
      children: e
    }
  )
);
v.displayName = "Stack";
export {
  h as Button,
  v as Stack,
  w as Text
};
