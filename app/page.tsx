import Link from "next/link";
import FillingLink from "@/components/FillingLink";
import Heading from "@/components/Heading";
import ModuleImage from "@/components/ModuleImage";
import { RESUME_URL } from "@/data/navigation";
import { PREVIEWED_PROJECTS } from "@/data/projects";

/*
 * Every text block is a module row with its copy on the row's ceiling, so the
 * page reads as a column of rows separated by a gutter.
 */
export default function HomePage() {
  return (
    <>
      <section className="page-grid gap-y-line pt-line">
        <Heading level={1} caps={false} className="col-main rows-1">
          Hey, I&apos;m Steven.
        </Heading>

        <p className="col-main min-rows-1 text-sm">Welcome to my website!</p>

        <p className="col-main min-rows-1 text-sm">
          If you&apos;re <FillingLink href="/">here</FillingLink> because of my{" "}
          <FillingLink href={RESUME_URL} external newTab>
            resume
          </FillingLink>{" "}
          or <FillingLink href="/contact">application</FillingLink>, click to
          learn more <FillingLink href="/about">about me</FillingLink> or check
          out <FillingLink href="/projects">my work</FillingLink>.
        </p>
      </section>

      <section className="page-grid pb-2line">
        {/*
         * Subgrid so the section keeps the page grid's columns while its rules
         * run a gutter outside them, out to the frame: the negative margin
         * takes them there and the matching padding brings the columns back,
         * so they still line up with the rest of the page. Only the frame
         * draws the sides, and it closes the section off at the bottom where
         * there is no frame to meet.
         */}
        <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue px-line py-line cols2:border-b">
          <Heading level={2} className="col-main rows-1">
            Projects
          </Heading>

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
                <Heading level={3} className="lines-1">
                  {project.title}
                </Heading>
                <ModuleImage image={project.preview.image} alt={project.title} />
                <p className="min-rows-1 text-sm">{project.preview.blurb}</p>
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
