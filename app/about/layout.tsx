import SiteChrome from "@/components/SiteChrome";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
