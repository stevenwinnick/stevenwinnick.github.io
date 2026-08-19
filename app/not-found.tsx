import PageHeading from "@/components/PageHeading";
import ProseLink from "@/components/ProseLink";
import SiteChrome from "@/components/SiteChrome";

/*
 * Next.js renders this outside the route groups, so it pulls in `SiteChrome`
 * itself: the root layout has no navbar or footer, since anything it renders
 * would land on the landing page too.
 */
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="px-sm">
        <PageHeading>page not found</PageHeading>

        <p className="pb-xl text-center text-sm">
          That page does not exist. Head <ProseLink href="/">home</ProseLink>{" "}
          instead.
        </p>
      </section>
    </SiteChrome>
  );
}
