import { jsx as m } from "react/jsx-runtime";
import { forwardRef as c } from "react";
import { c as l } from "../utils-B6yFEsav.js";
const p = c(
  ({ children: r, col: e, spacing: a, className: o, ...f }, t) => /* @__PURE__ */ m(
    "div",
    {
      ref: t,
      className: l(
        "flex gap-4 flex-wrap",
        e && "flex-col",
        a && `space-${a}`,
        o
      ),
      ...f,
      children: r
    }
  )
);
p.displayName = "Stack";
export {
  p as Stack,
  p as default
};
