"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties, type ReactNode } from "react";

type NavLink = {
  href: string;
  label: ReactNode;
  accent: string;
  external?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "HOME", accent: "var(--color-green)" },
  { href: "/about", label: "ABOUT", accent: "var(--color-blue)" },
  {
    href: "/projects",
    label: (
      <>
        SOME PROJECTS I&apos;M
        <br />
        PROUD TO SHARE
      </>
    ),
    accent: "var(--color-red)",
  },
  {
    href: "https://drive.google.com/file/d/17jHs-lGyFanjH1GBPOZNlB5fl1YMSl2K/view",
    label: "RESUME",
    accent: "var(--color-yellow)",
    external: true,
  },
  { href: "/contact", label: "CONTACT", accent: "var(--color-purple)" },
];

const SOCIAL_LINKS = [
  {
    href: "https://linkedin.com/in/stevenwinnick",
    src: "/img/linkedin-cream.png",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/stevenwinnick",
    src: "/img/github-cream.png",
    alt: "GitHub",
  },
];

/** Strip a trailing slash so `/about/` and `/about` compare equal. */
function normalize(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export default function Navbar() {
  const pathname = normalize(usePathname());
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-ink font-title">
      <div className="flex flex-col lg:h-16 lg:flex-row lg:items-stretch">
        {/* Brand, socials, and mobile menu toggle */}
        <div className="flex h-16 items-center border-b-[3px] border-cream lg:flex-1 lg:border-b-0">
          <Link
            href="/"
            className="px-3 text-2xl font-semibold text-cream no-underline"
          >
            STEVEN WINNICK
          </Link>

          <div className="ml-auto flex items-center gap-3 pr-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-150"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={social.src} alt={social.alt} width={20} height={20} />
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((prev) => !prev)}
            className="mr-2 p-2 lg:hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hamburger-cream.png"
              alt=""
              width={24}
              height={24}
              className={`transition-transform duration-500 ${open ? "-rotate-90" : ""}`}
            />
          </button>
        </div>

        {/* Navigation links */}
        <div
          id="nav-menu"
          className={`${open ? "flex" : "hidden"} flex-col lg:flex lg:flex-row lg:items-stretch`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && pathname === link.href;
            const className = `nav-link flex items-center justify-center text-nowrap px-6 py-4 text-center leading-tight lg:py-0 ${isActive ? "nav-link-active" : ""}`;
            const style = { "--accent": link.accent } as CSSProperties;

            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={style}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={className}
                style={style}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
