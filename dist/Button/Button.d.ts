import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "default" | "primary" | "secondary" | "warning" | "danger";
  outline?: boolean;
  rounded?: "default" | "basic" | "rounded" | "pill";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export declare const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
>;

export default Button;
