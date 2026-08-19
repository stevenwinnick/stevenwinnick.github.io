import FillingLink from "@/components/FillingLink";
import PageHeading from "@/components/PageHeading";

export default function NotFound() {
  return (
    <section className="page-grid gap-y-line pb-2line">
      <PageHeading>Page not found</PageHeading>

      <p className="col-main min-rows-1 text-sm">
        That page does not exist. Head{" "}
        <FillingLink href="/">home</FillingLink> instead.
      </p>
    </section>
  );
}
