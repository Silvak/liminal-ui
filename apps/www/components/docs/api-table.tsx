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
    <div className={cn("my-6 overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="w-[20%] border-b border-border px-4 py-2 text-left font-semibold">
              Prop
            </th>
            <th className="w-[25%] border-b border-border px-4 py-2 text-left font-semibold">
              Type
            </th>
            <th className="w-[20%] border-b border-border px-4 py-2 text-left font-semibold">
              Default
            </th>
            <th className="w-[35%] border-b border-border px-4 py-2 text-left font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.prop} className="odd:bg-background even:bg-muted/20">
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
