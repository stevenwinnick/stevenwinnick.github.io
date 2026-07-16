import Link from "next/link";
import type { ReactNode } from "react";

/**
 * An underlined inline link for body copy. External links open in a new tab;
 * internal links use the client-side router.
 */
export default function ProseLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        className="prose-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className="prose-link" href={href}>
      {children}
    </Link>
  );
}
