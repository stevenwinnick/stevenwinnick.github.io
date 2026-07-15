import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type PillProps = {
  href: string;
  accent: string;
  children: ReactNode;
  /** Open in a new tab and render a plain anchor instead of a Next.js Link. */
  external?: boolean;
  /** Flip the base colors for use on light (cream) backgrounds. */
  inverted?: boolean;
};

/** An inline, accent-bordered link that fills with its accent color on hover. */
export default function Pill({
  href,
  accent,
  children,
  external,
  inverted,
}: PillProps) {
  const style = { "--accent": accent } as CSSProperties;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="pill"
        style={style}
        data-inverted={inverted ? "true" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="pill"
      style={style}
      data-inverted={inverted ? "true" : undefined}
    >
      {children}
    </Link>
  );
}
