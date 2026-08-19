"use client";

import Link from "next/link";
import { useState } from "react";
import FillingLink from "./FillingLink";
import { NAV_ITEMS } from "@/data/navigation";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <line x1="1" y1="1" x2="15" y2="15" />
        <line x1="1" y1="15" x2="15" y2="1" />
      </svg>
    );
  }

  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <line x1="0" y1="1" x2="26" y2="1" />
      <line x1="0" y1="7" x2="26" y2="7" />
      <line x1="0" y1="13" x2="26" y2="13" />
    </svg>
  );
}

/**
 * The landing page header: one module row tall, one gutter below the top of the
 * screen, with the name and the menu toggle sitting on the row's floor.
 */
export default function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white pt-line text-blue-new">
      <div className="page-grid">
        {/*
         * The rule runs out to the page's frame, which draws the sides. The
         * negative margin takes it out there and the padding brings the content
         * back to the columns, a line clear of the rule on both sides and below.
         */}
        <div className="col-wide -mx-line flex rows-1 items-end justify-between border-b border-blue-new px-line pb-line">
          <Link href="/" className="text-sm no-underline">
            Steven Winnick
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="landing-menu"
            onClick={() => setOpen((prev) => !prev)}
            className="flex lines-1 cursor-pointer items-center"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/*
       * Out of flow, so opening the menu does not grow the header's white
       * background across the width of the screen.
       */}
      {open && (
        <div
          id="landing-menu"
          className="page-grid absolute inset-x-0 top-full"
        >
          {/*
           * One module, hung off the right end of the header's rule, under the
           * toggle. Any click inside is either a link or a miss; both close it.
           */}
          <nav
            className="col-wide -mr-line flex rows-1 w-(--grid-col) max-w-full flex-col items-end justify-self-end border border-t-0 border-blue-new bg-white px-line py-half-line"
            onClick={() => setOpen(false)}
          >
            {NAV_ITEMS.map((item) => (
              <FillingLink
                key={item.href}
                href={item.href}
                external={item.external}
                newTab={item.newTab}
                className="text-sm"
              >
                {item.label}
              </FillingLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
