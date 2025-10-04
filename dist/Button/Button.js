import { jsx as d } from "react/jsx-runtime";
import { forwardRef as u } from "react";
import { c as s } from "../utils-B6yFEsav.js";
import { cva as b } from "class-variance-authority";
const p = b("inline-block px-2 py-2 font-semibold", {
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
}), g = u(
  ({ children: e, className: t, variant: r, rounded: a, outline: n, size: o, ...l }, i) => /* @__PURE__ */ d(
    "button",
    {
      ref: i,
      className: s(p({ variant: r, rounded: a, outline: n, size: o, className: t })),
      ...l,
      children: e
    }
  )
);
g.displayName = "Button";
export {
  g as Button,
  g as default
};
