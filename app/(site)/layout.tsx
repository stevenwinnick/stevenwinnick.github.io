import Footer from "@/components/Footer";

/** Layout for the standard content pages, which all share the site footer. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
