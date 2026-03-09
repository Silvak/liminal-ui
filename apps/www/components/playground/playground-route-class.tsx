"use client";

import { useEffect } from "react";

const HTML_CLASS = "playground-no-gutter";

export function PlaygroundRouteClass() {
  useEffect(() => {
    document.documentElement.classList.add(HTML_CLASS);

    return () => {
      document.documentElement.classList.remove(HTML_CLASS);
    };
  }, []);

  return null;
}
