import FillingLink from "@/components/FillingLink";
import Heading from "@/components/Heading";

export default function NotFound() {
  return (
    <section className="page-grid gap-y-line pt-line pb-2line">
      <Heading level={1} className="col-main rows-1">
        Page not found
      </Heading>

      <p className="col-main min-rows-1 text-sm">
        That page does not exist. Head{" "}
        <FillingLink href="/">home</FillingLink> instead.
      </p>
    </section>
  );
}
