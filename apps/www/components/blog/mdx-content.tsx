"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "../mdx-components";

interface MdxContentProps {
  code: string;
}

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
