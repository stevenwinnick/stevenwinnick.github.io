import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./BoxyFillingPill.module.css";

type BoxyFillingPillProps = {
  accent: string;
  children: ReactNode;
  /** Target for link variants; omitted when `submit` is set. */
  href?: string;
  /** Open in a new tab and render a plain anchor instead of a Next.js Link. */
  external?: boolean;
  /** Flip the base colors for use on light (cream) backgrounds. */
  inverted?: boolean;
  /** Render a form submit button instead of a link. */
  submit?: boolean;
  className?: string;
};

/** An accent-bordered pill that fills with its accent color on hover. */
export default function BoxyFillingPill({
  accent,
  children,
  href,
  external,
  inverted,
  submit,
  className = "",
}: BoxyFillingPillProps) {
  const style = { "--accent": accent } as CSSProperties;
  const dataInverted = inverted ? "true" : undefined;
  const classNames = `${styles.pill} ${className}`.trim();

  if (submit) {
    return (
      <button
        type="submit"
        className={classNames}
        style={style}
        data-inverted={dataInverted}
      >
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
        style={style}
        data-inverted={dataInverted}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className={classNames}
      style={style}
      data-inverted={dataInverted}
    >
      {children}
    </Link>
  );
}
