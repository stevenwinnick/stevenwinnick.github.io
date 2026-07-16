import type { ReactNode } from "react";

/**
 * The large, centered page title shared across pages. It uppercases its text
 * and adds spacing beneath itself. Defaults to the `xl` type scale; pass
 * `className` to tweak the size for a specific layout.
 */
export default function PageHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`mb-6 text-center font-title text-xl uppercase ${className}`}>
      {children}
    </h1>
  );
}
