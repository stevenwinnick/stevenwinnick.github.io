import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * The chrome every page but the landing page still uses. The landing page is
 * outside this group while its new header and footer are being designed.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* Offset content below the fixed navbar. */}
      <div className="pt-(--nav-height)">{children}</div>
      <Footer />
    </>
  );
}
