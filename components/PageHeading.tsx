import type { ReactNode } from "react";

/**
 * The large, centered page title shared across pages. It uppercases its text
 * and defaults to the `xl` type scale. Spacing around it belongs to the layout
 * that places it, so pass `className` for margins, size, or alignment tweaks.
 */
export default function PageHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-center font-title text-xl uppercase ${className}`}
    >
      {children}
    </h1>
  );
}
