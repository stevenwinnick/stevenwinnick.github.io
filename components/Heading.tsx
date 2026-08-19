import type { ReactNode } from "react";

/** One step of the type scale per level; the tag comes from the same number. */
const LEVEL_CLASSES = {
  1: "text-h1 font-medium",
  2: "text-h2 font-semibold",
  3: "text-h3 font-semibold",
  4: "text-h4 font-semibold",
} as const;

type HeadingProps = {
  level: keyof typeof LEVEL_CLASSES;
  children: ReactNode;
  /** Headings are set in capitals unless the copy reads as a sentence. */
  caps?: boolean;
  className?: string;
};

/**
 * A heading in the display face, sitting on the floor of its box so it lands on
 * a grid line. Callers give the box its height (`lines-*`, `rows-*`).
 */
export default function Heading({
  level,
  children,
  caps = true,
  className = "",
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={`flex items-end font-header tracking-header ${LEVEL_CLASSES[level]} ${caps ? "uppercase" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
