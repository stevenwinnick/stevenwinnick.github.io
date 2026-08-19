export const RESUME_URL =
  "https://drive.google.com/file/d/17jHs-lGyFanjH1GBPOZNlB5fl1YMSl2K/view";

export type NavItem = {
  href: string;
  label: string;
  /** Points off the site, so render a plain anchor instead of a Next.js Link. */
  external?: boolean;
  newTab?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: RESUME_URL, label: "Resume", external: true, newTab: true },
  { href: "/contact", label: "Contact" },
];
