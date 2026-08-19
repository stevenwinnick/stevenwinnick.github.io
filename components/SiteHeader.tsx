"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FillingLink from "./FillingLink";
import SocialLink from "./SocialLink";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/data/navigation";

/* Ignores the small scrolls that a touchpad or a rubber band edge produces. */
const SCROLL_THRESHOLD_PX = 8;

/**
 * Whether the header is on screen: it leaves on a scroll down and comes back on
 * a scroll up, and is always up while the page is within a header's height of
 * the top, where there is nothing for it to cover.
 */
function useHeaderShown(headerRef: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const scrollY = Math.max(0, window.scrollY);
      const delta = scrollY - lastScrollY.current;
      if (Math.abs(delta) < SCROLL_THRESHOLD_PX) {
        return;
      }

      lastScrollY.current = scrollY;
      setShown(delta < 0 || scrollY <= (headerRef.current?.offsetHeight ?? 0));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef]);

  return shown;
}

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
 * The site header: one module row tall, one gutter below the top of the screen,
 * with the name, the social links, and the menu toggle on the row's floor. It
 * slides away on a scroll down and back on a scroll up, and stays put while its
 * menu is open.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const shown = useHeaderShown(headerRef);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 bg-white pt-line text-blue transition-transform duration-300 ease-out motion-reduce:transition-none ${
        shown || open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="page-grid">
        {/*
         * The rule runs out to the page's frame, which draws the sides. The
         * negative margin takes it out there and the padding brings the content
         * back to the columns, a line clear of the rule on both sides and below.
         */}
        <div className="col-wide -mx-line flex rows-1 items-end justify-between border-b border-blue px-line pb-line">
          <Link
            href="/"
            className="font-header text-h3 font-semibold uppercase tracking-header no-underline"
          >
            Steven Winnick
          </Link>

          <div className="flex items-center gap-half-line">
            {SOCIAL_LINKS.map((social) => (
              <SocialLink key={social.href} social={social} />
            ))}

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((prev) => !prev)}
              className="flex lines-1 cursor-pointer items-center pl-half-line"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      {/*
       * Out of flow, so opening the menu does not grow the header's white
       * background across the width of the screen.
       */}
      {open && (
        <div id="site-menu" className="page-grid absolute inset-x-0 top-full">
          {/*
           * One module, hung off the right end of the header's rule, under the
           * toggle. Any click inside is either a link or a miss; both close it.
           */}
          <nav
            className="col-wide -mr-line flex rows-1 w-(--grid-col) max-w-full flex-col items-end justify-self-end border border-t-0 border-blue bg-white px-line py-half-line"
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
