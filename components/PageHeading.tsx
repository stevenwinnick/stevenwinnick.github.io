import type { ReactNode } from "react";
import Heading from "./Heading";

/**
 * A page's title, on the floor of the module row below the site header, with
 * the body copy starting at the top of the next row. The negative margin
 * cancels the section's row gap, which would otherwise hold the body a line
 * below that.
 */
export default function PageHeading({ children }: { children: ReactNode }) {
  return (
    <Heading level={2} className="col-main rows-1 -mb-line">
      {children}
    </Heading>
  );
}
