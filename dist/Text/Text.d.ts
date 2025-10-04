import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
  emphasis?: "low";
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "thin" | "normal" | "medium" | "semibold" | "bold" | "black";
  align?: "left" | "center" | "right";
  italic?: boolean;
  underline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export declare const Text: ForwardRefExoticComponent<
  TextProps & RefAttributes<HTMLElement>
>;

export default Text;
