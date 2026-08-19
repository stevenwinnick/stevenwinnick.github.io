import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * The chrome every page but the landing page still uses. Each of those pages
 * pulls it in through its own `layout.tsx`, since a root layout would put it on
 * the landing page too.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="legacy-type">
      <Navbar />
      {/* Offset content below the fixed navbar. */}
      <div className="pt-(--nav-height)">{children}</div>
      <Footer />
    </div>
  );
}
