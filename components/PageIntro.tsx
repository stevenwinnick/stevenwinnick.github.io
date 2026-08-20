import type { ReactNode } from "react";

/**
 * The line of copy under a page's title, filling its own module row so the
 * content below it starts on the next one.
 */
export default function PageIntro({ children }: { children: ReactNode }) {
  return <p className="col-main min-rows-1 text-sm">{children}</p>;
}
