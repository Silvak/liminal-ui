import * as React from "react";
import { cn } from "../../lib/utils";

type ApiRow = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

interface ApiTableProps {
  data: ApiRow[];
  className?: string;
}

export function ApiTable({ data, className }: ApiTableProps) {
  return (
    <div className={cn("my-6 overflow-x-auto rounded-xl border border-border bg-white dark:bg-background shadow-none", className)}>
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="w-[20%] border-b border-border px-4 py-2 text-left font-semibold text-foreground">
              Prop
            </th>
            <th className="w-[25%] border-b border-border px-4 py-2 text-left font-semibold text-foreground">
              Type
            </th>
            <th className="w-[20%] border-b border-border px-4 py-2 text-left font-semibold text-foreground">
              Default
            </th>
            <th className="w-[35%] border-b border-border px-4 py-2 text-left font-semibold text-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.prop} className="odd:bg-white odd:dark:bg-background even:bg-muted/10">
              <td className="border-b border-border px-4 py-2 align-top font-mono text-xs">
                {row.prop}
              </td>
              <td className="border-b border-border px-4 py-2 align-top font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="border-b border-border px-4 py-2 align-top font-mono text-xs text-muted-foreground">
                {row.default ?? "-"}
              </td>
              <td className="border-b border-border px-4 py-2 align-top text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
