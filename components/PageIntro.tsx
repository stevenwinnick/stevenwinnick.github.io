import type { ReactNode } from "react";

/**
 * The line of copy under a page's title, a line below the top of its own
 * module row. The padding sits inside the row's minimum height, so the body
 * copy below still starts on the next row.
 */
export default function PageIntro({ children }: { children: ReactNode }) {
  return <p className="col-main min-rows-1 pt-line text-sm">{children}</p>;
}
