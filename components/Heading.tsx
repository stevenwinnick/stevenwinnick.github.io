import type { ReactNode } from "react";

/** Sizes and casing per level; the tag comes from the same number. */
const LEVEL_CLASSES = {
  1: "text-xl font-medium",
  2: "text-lg font-semibold uppercase",
  3: "text-md font-semibold uppercase",
} as const;

type HeadingProps = {
  level: keyof typeof LEVEL_CLASSES;
  children: ReactNode;
  className?: string;
};

/**
 * A heading in the display face, sitting on the floor of its box so it lands on
 * a grid line. Callers give the box its height (`lines-*`, `rows-*`).
 */
export default function Heading({
  level,
  children,
  className = "",
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={`flex items-end font-header tracking-header ${LEVEL_CLASSES[level]} ${className}`}
    >
      {children}
    </Tag>
  );
}
