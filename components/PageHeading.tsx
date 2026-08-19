import type { ReactNode } from "react";

/**
 * A page's title, on the floor of the module row below the site header, with
 * the body copy starting at the top of the next row. The negative margin
 * cancels the section's row gap, which would otherwise hold the body a line
 * below that.
 *
 * The visible title is an `h2`, a step down from the landing page's hero, so
 * the title is repeated in a screen-reader-only `h1` to give the page a
 * top-level heading. It is out of flow, so it takes no grid track.
 */
export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="sr-only">{children}</h1>

      <h2 className="col-main rows-1 -mb-line">{children}</h2>
    </>
  );
}
