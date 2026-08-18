import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./FillingLink.module.css";

type FillingLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

/** An underlined inline link that fills with ultramarine on hover. */
export default function FillingLink({
  href,
  children,
  external,
  className = "",
}: FillingLinkProps) {
  const classNames = `${styles.fillingLink} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
