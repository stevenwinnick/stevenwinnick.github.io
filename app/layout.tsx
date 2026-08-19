import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { ibmPlexSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steven Winnick's Website",
  description:
    "The personal website of Steven Winnick, a software engineer in New York City",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSerif.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
