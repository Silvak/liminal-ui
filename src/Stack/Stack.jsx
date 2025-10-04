import { forwardRef } from "react";
import { cn } from "../utils/utils";
import "../index.css"; // Estilos automáticos

const Stack = forwardRef(
  ({ children, col, spacing, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
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

Stack.displayName = "Stack";

export { Stack };
export default Stack;
