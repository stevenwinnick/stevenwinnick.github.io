import { IBM_Plex_Serif } from "next/font/google";

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});
