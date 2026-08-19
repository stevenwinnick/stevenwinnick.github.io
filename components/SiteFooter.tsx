import FillingLink from "./FillingLink";
import { SOCIAL_LINKS } from "@/data/navigation";

/** Two lines tall, matching `--footer-height`. */
export default function SiteFooter() {
  return (
    <footer className="page-grid">
      <div className="col-wide flex lines-2 items-center justify-between text-xs">
        <p>&copy; 2026 Steven Winnick</p>

        <p className="flex gap-line">
          {SOCIAL_LINKS.map((social) => (
            <FillingLink key={social.href} href={social.href} external newTab>
              {social.label}
            </FillingLink>
          ))}
        </p>
      </div>
    </footer>
  );
}
