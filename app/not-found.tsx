import FillingLink from "@/components/FillingLink";
import PageHeading from "@/components/PageHeading";
import PageIntro from "@/components/PageIntro";

export default function NotFound() {
  return (
    <section className="page-grid gap-y-line pb-2line">
      <PageHeading>Page not found</PageHeading>

      <PageIntro>
        That page does not exist. Head <FillingLink href="/">home</FillingLink>{" "}
        instead.
      </PageIntro>
    </section>
  );
}
