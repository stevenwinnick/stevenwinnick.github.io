import GridIntro from "@/components/GridIntro";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

/**
 * The frame every page sits in: the opening animation, the fixed header, the
 * rules that run down the sides of the page, and the footer. The root layout
 * wraps every route in it.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh bg-white font-body text-blue">
      <GridIntro />

      <SiteHeader />

      {/*
       * The rules sit a gutter outside the columns and are drawn over the fixed
       * header, so they read as one line down the whole page. They only appear
       * once the columns are at full width, since below that the gutter is the
       * screen's own edge.
       *
       * The extra pixel puts each rule just outside the gutter, so a page's
       * horizontal rules butt up against its inside edge.
       */}
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 z-60"
      >
        <div className="col-wide cols2:-mx-[calc(var(--spacing-line)+1px)] cols2:border-x cols2:border-blue" />
      </div>

      <main className="pt-(--header-height)">
        {children}
        <SiteFooter />
      </main>
    </div>
  );
}
