import { IBM_Plex_Serif } from "next/font/google";

/**
 * The landing page's header face. The root layout puts its class on `<html>`,
 * where `--font-header-new` in `globals.css` can pick the family up.
 */
export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});
