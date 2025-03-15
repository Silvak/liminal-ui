import { forwardRef } from "react";
import { cn } from "../utils/utils";

export const Stack = forwardRef(
  ({ children, col, spacing, className, ...props }) => {
    return (
      <div
        className={cn(
          "flex gap-4 flex-wrap",
          col && "flex-col",
          spacing && `space-${spacing}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
