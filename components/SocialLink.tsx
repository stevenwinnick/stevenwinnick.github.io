import type { SocialLink as SocialLinkData } from "@/data/navigation";

/**
 * An icon link that fills with blue on hover like the site's text links. The
 * icon is a mask painted in `currentColor` rather than an image, so it reverses
 * out to white along with the text when the fill sweeps over it.
 */
export default function SocialLink({ social }: { social: SocialLinkData }) {
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="flex lines-1 items-center px-half-line fill-on-hover"
    >
      <span
        aria-hidden="true"
        className="block size-line bg-current"
        // Safari before 15.4 only understands the prefixed properties, and
        // without a mask the span is a solid square.
        style={{
          WebkitMaskImage: `url(${social.icon})`,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url(${social.icon})`,
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
        }}
      />
    </a>
  );
}
