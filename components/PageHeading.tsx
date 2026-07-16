import type { ReactNode } from "react";

/**
 * The large, centered page title shared across pages. Defaults to the `xl`
 * type scale; pass `className` to tweak size or casing for a specific layout.
 */
export default function PageHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`text-center font-title text-xl ${className}`}>{children}</h1>
  );
}
