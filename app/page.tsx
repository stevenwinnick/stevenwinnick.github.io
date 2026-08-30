import FillingLink from "@/components/FillingLink";
import ModuleImage from "@/components/ModuleImage";
import { CASCADIUM_URL } from "@/data/navigation";

const MOUNTAINS_PHOTO = "/img/mountains.webp";
const GRADUATION_PHOTO = "/img/graduation.webp";

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

      {/* A blank module row holds the photographs off the copy and the footer. */}
      <section className="page-grid py-(--grid-row)">
        {/*
         * Subgrid on rows of a module each, so the right photograph can start a
         * row below the left one: two module rows and the gutter between them
         * is exactly a tall photograph's height.
         */}
        <div className="col-main grid auto-rows-(--grid-row) grid-cols-subgrid gap-y-line">
          <ModuleImage
            src={MOUNTAINS_PHOTO}
            alt="Steven Winnick in front of a snow-capped mountain range"
            tall
            className="row-span-2 self-start"
          />

          <ModuleImage
            src={GRADUATION_PHOTO}
            alt="Steven Winnick at his Columbia University graduation"
            tall
            className="col-start-2 row-span-2 row-start-2 self-start"
          />
        </div>
      </section>
    </>
  );
}
