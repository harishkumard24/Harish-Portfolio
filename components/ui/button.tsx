/* shadcn-style button used for the portfolio call-to-actions. */
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_20px_50px_rgba(96,165,250,0.18)]",
  secondary:
    "bg-white/[0.08] text-white border border-white/10 hover:bg-white/[0.12]",
  ghost: "bg-transparent text-white hover:bg-white/[0.06]"
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps & { children?: React.ReactNode }) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const childProps = (children.props as { className?: string }).className;
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(classes, childProps)
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
