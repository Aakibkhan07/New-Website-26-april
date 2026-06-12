import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-medium transition-all duration-300 rounded-lg",
        {
          // Variants
          "bg-primary text-black hover:bg-opacity-90 shadow-lg hover:shadow-glass-hover":
            variant === "primary",
          "bg-secondary text-foreground border border-border hover:border-primary glass-hover":
            variant === "secondary",
          "border border-primary text-primary hover:bg-primary hover:text-black":
            variant === "outline",
          // Sizes
          "px-3 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
}
