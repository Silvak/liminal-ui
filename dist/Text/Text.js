import { jsx as x } from "react/jsx-runtime";
import { forwardRef as c } from "react";
import { c as d } from "../utils-B6yFEsav.js";
import { cva as u } from "class-variance-authority";
const p = u("w-full", {
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
}), b = c(
  ({
    as: t,
    children: e,
    emphasis: l,
    size: n,
    weight: o,
    align: i,
    italic: a,
    underline: r,
    className: s,
    ...m
  }, f) => /* @__PURE__ */ x(
    t || "p",
    {
      className: d(
        p({
          emphasis: l,
          size: n,
          weight: o,
          align: i,
          italic: a,
          underline: r
        }),
        s
      ),
      ...m,
      ref: f,
      children: e
    }
  )
);
b.displayName = "Text";
export {
  b as Text,
  b as default
};
