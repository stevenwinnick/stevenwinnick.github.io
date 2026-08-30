import FillingLink from "@/components/FillingLink";
import ModuleImage from "@/components/ModuleImage";
import { CASCADIUM_URL } from "@/data/navigation";

const GRADUATION_PHOTO = "/img/graduation.webp";
const LAKE_PHOTO = "/img/lake.webp";

/*
 * Every text block is a module row with its copy on the row's ceiling, so the
 * page reads as a column of rows separated by a gutter.
 */
export default function HomePage() {
  return (
    <>
      <section className="page-grid gap-y-line pt-line">
        <h1 className="col-main rows-1 normal-case">Hey, I&apos;m Steven.</h1>

        <p className="col-main min-rows-1 text-sm">
          I&apos;m a founder of{" "}
          <FillingLink href={CASCADIUM_URL} external newTab>
            Cascadium
          </FillingLink>
          . Welcome to my website!
        </p>

        <p className="col-main min-rows-1 text-sm">
          {/* The apostrophe is an expression, not `&apos;`: an entity in a text
              node makes the compiler swallow the space after the link. */}
          My <FillingLink href="/about">prior work</FillingLink> has focused on
          ensuring the reliability of some of the world{"'"}s most complex
          software systems. Now my attention is{" "}
          <FillingLink href={CASCADIUM_URL} external newTab>
            aimed at
          </FillingLink>{" "}
          accelerating the effects of scientific and technological innovation in
          health and medicine.
        </p>

        <p className="col-main min-rows-1 text-sm">
          Click around to learn more{" "}
          <FillingLink href="/about">about me</FillingLink>, read about some of
          my <FillingLink href="/projects">old projects</FillingLink>, or{" "}
          <FillingLink href="/contact">get in touch</FillingLink>.
        </p>
      </section>

      <section className="page-grid">
        {/*
         * A rule out to the frame separates the photographs from the copy, as
         * the projects section's did: the negative margin takes it a gutter
         * outside the columns and the matching padding brings them back, so they
         * still line up with the rest of the page. A module row of padding holds
         * the photographs off the rule, and the copy above it ends a row up.
         */}
        <div className="col-wide -mx-line grid grid-cols-subgrid border-t border-blue px-line py-(--grid-row)">
          {/*
           * The columns are the page's own two, written out rather than
           * subgridded because the container query below needs a containment
           * context, which a subgrid cannot be. A module row is 3/4 of a
           * column, so rows measured against the container stay one row deep
           * once the columns turn fluid below `cols2`, and the right
           * photograph keeps starting a row below the left one.
           */}
          <div className="@container col-main">
            <div className="grid auto-rows-[round(nearest,calc(0.375*(100cqw_-_var(--grid-gutter))),var(--line))] grid-cols-2 gap-line">
              <ModuleImage
                src={GRADUATION_PHOTO}
                alt="Steven Winnick at his Columbia University graduation"
                tall
                bright
                className="row-span-2 self-start"
              />

              <ModuleImage
                src={LAKE_PHOTO}
                alt="Steven Winnick beside a lake in the mountains"
                tall
                className="col-start-2 row-span-2 row-start-2 self-start"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
