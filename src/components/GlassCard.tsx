import React from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass p-6 rounded-xl",
        hover && "glass-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
