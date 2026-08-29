export const CASCADIUM_URL = "https://www.cascadium.ai";

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
  { href: "/contact", label: "Contact" },
];

export type SocialLink = {
  href: string;
  label: string;
  icon: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://linkedin.com/in/stevenwinnick",
    label: "LinkedIn",
    icon: "/img/linkedin.svg",
  },
  {
    href: "https://github.com/stevenwinnick",
    label: "GitHub",
    icon: "/img/github.svg",
  },
];
