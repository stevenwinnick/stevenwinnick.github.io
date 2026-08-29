import Link from "next/link";
import FillingLink from "@/components/FillingLink";
import ModuleImage from "@/components/ModuleImage";
import { CASCADIUM_URL } from "@/data/navigation";
import { PREVIEWED_PROJECTS } from "@/data/projects";

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
          My <FillingLink href="/about">prior work</FillingLink> has focused on
          ensuring the reliability of some of the world&apos;s most complex
          software systems. Now my attention is{" "}
          <FillingLink href={CASCADIUM_URL} external newTab>
            aimed at
          </FillingLink>{" "}
          accelerating the impact of scientific innovation on human health.
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
         * Subgrid so the section keeps the page grid's columns while its rules
         * run a gutter outside them, out to the frame: the negative margin
         * takes them there and the matching padding brings the columns back,
         * so they still line up with the rest of the page. Only the frame
         * draws the sides, and the footer's rule closes the section off at the
         * bottom.
         */}
        <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue px-line py-line">
          <h2 className="col-main rows-1">Projects</h2>

          <p className="col-main min-rows-1 text-sm">
            Here are a few of the projects I&apos;ve worked on recently:
          </p>

          {/*
           * Nested subgrid so the previews share rows across all four
           * columns: their titles, images, and blurbs each line up. One per
           * column at `cols4`, 2x2 from `cols2` (where a column is already
           * full width, so the images stop changing size), stacked two columns
           * wide below that.
           */}
          <div className="col-wide grid grid-cols-subgrid gap-y-2line cols4:grid-rows-[auto_auto_auto] cols4:gap-y-line">
            {PREVIEWED_PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/projects#${project.id}`}
                className="col-span-2 flex min-w-0 flex-col gap-line text-inherit no-underline cols2:col-span-1 cols4:row-span-3 cols4:grid cols4:grid-rows-subgrid"
              >
                <h3 className="lines-1">{project.title}</h3>
                <ModuleImage src={project.image} alt={project.title} />
                <p className="min-rows-1 text-sm">{project.previewBlurb}</p>
              </Link>
            ))}
          </div>

          <p className="col-main min-rows-1 text-sm">
            To see more about these projects and others I&apos;ve worked on,
            click <FillingLink href="/projects">here</FillingLink>.
          </p>
        </div>
      </section>
    </>
  );
}
