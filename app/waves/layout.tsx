import SiteChrome from "@/components/SiteChrome";

export default function WavesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
