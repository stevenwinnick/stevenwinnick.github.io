import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./FillingLink.module.css";

type FillingLinkProps = {
  href: string;
  children: ReactNode;
  /** Points off the site, so render a plain anchor instead of a Next.js Link. */
  external?: boolean;
  newTab?: boolean;
  className?: string;
};

/** An underlined inline link that fills with blue on hover. */
export default function FillingLink({
  href,
  children,
  external,
  newTab,
  className = "",
}: FillingLinkProps) {
  const classNames = `${styles.fillingLink} ${className}`.trim();
  const newTabProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (external) {
    return (
      <a href={href} className={classNames} {...newTabProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} {...newTabProps}>
      {children}
    </Link>
  );
}
