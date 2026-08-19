import type { ReactNode } from "react";

/**
 * A page's title, on the floor of the module row below the site header, with
 * the body copy starting at the top of the next row. The top margin holds the
 * title off the header by the gutter, so its row sits on the module grid, and
 * the negative bottom margin cancels the section's row gap, which would
 * otherwise hold the body a line below that.
 *
 * It is the page's top-level heading, set at the `h2` step so it stays a size
 * below the landing page's hero.
 */
export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="col-main mt-line rows-1 -mb-line text-h2 font-semibold">
      {children}
    </h1>
  );
}
