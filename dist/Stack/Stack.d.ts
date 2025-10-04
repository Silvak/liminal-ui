import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  col?: boolean;
  spacing?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export declare const Stack: ForwardRefExoticComponent<
  StackProps & RefAttributes<HTMLDivElement>
>;

export default Stack;
