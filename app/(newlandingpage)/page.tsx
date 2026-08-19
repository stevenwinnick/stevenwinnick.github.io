import Image from "next/image";
import Link from "next/link";
import FillingLink from "@/components/FillingLink";
import LandingHeader from "@/components/LandingHeader";
import { RESUME_URL } from "@/data/navigation";

const PREVIEW_PROJECTS = [
  {
    anchor: "foghorn",
    title: "Foghorn API",
    image: { src: "/img/foghornSquare.jpg", width: 680, height: 680 },
    blurb:
      "A tool for easily logging messages and recieving Slack notifications when sections of code are executed.",
  },
  {
    anchor: "sheepshead",
    title: "Sheepshead AI",
    image: { src: "/img/royalFlushSquare.jpg", width: 668, height: 668 },
    blurb:
      "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning.",
  },
  {
    anchor: "rhymenet",
    title: "RhymeNet",
    image: { src: "/img/rhymesHighlightedSquare.jpg", width: 720, height: 720 },
    blurb:
      "An English language database containing information about words' phoenetic and written syllable divisions.",
  },
  {
    anchor: "waves",
    title: "Sonic Canvas",
    image: { src: "/img/soundwaves.png", width: 1200, height: 673 },
    blurb: "A creative tool for quickly testing sound wave samples.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white font-new text-blue-new">
      <LandingHeader />

      {/*
       * Every text block is a module row with its copy on the row's ceiling, so
       * the page reads as a column of rows separated by a gutter.
       */}
      <main className="pt-(--header-height)">
        <section className="page-grid gap-y-line pt-line">
          <h1 className="col-main flex rows-1 items-end text-xl">
            Hey, I&apos;m Steven.
          </h1>

          <p className="col-main min-rows-1 text-sm">Welcome to my website!</p>

          <p className="col-main min-rows-1 text-sm">
            If you&apos;re <FillingLink href="/">here</FillingLink> because of
            my{" "}
            <FillingLink href={RESUME_URL} external>
              resume
            </FillingLink>{" "}
            or <FillingLink href="/contact">application</FillingLink>, click to
            learn more <FillingLink href="/about">about me</FillingLink> or
            check out <FillingLink href="/projects">my work</FillingLink>.
          </p>
        </section>

        <section className="page-grid pb-2line">
          {/* Mobile has no room for the box, so the section keeps a plain rule. */}
          <hr className="col-wide m-0 border-t border-blue-new cols2:hidden" />

          {/*
           * Subgrid so the section keeps the page grid's columns while the box
           * around it is drawn a gutter outside them: the negative margin takes
           * the border out to there and the matching padding brings the columns
           * back, so they still line up with the rest of the page. The extra
           * pixel puts the side borders outside the grid, so they fall off the
           * screen rather than cutting across it below `cols4`.
           */}
          <div className="col-wide grid grid-cols-subgrid gap-y-line pt-line cols2:-mx-[calc(var(--spacing-line)+1px)] cols2:border cols2:border-blue-new cols2:px-[calc(var(--spacing-line)+1px)] cols2:py-line">
            <h2 className="col-main flex rows-1 items-end text-md">Projects</h2>

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
              {PREVIEW_PROJECTS.map((project) => (
                <Link
                  key={project.anchor}
                  href={`/projects#${project.anchor}`}
                  className="col-span-2 flex min-w-0 flex-col gap-line text-inherit no-underline cols2:col-span-1 cols4:row-span-3 cols4:grid cols4:grid-rows-subgrid"
                >
                  <p className="flex lines-1 items-end text-sm">
                    {project.title}
                  </p>
                  <figure className="module-frame relative isolate m-0">
                    <Image
                      src={project.image.src}
                      alt={project.title}
                      width={project.image.width}
                      height={project.image.height}
                      className="module-crop"
                    />
                    {/*
                     * `color` keeps the photograph's luminosity and takes its hue
                     * from the overlay, so every image reads as one blue.
                     */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-blue-new mix-blend-color"
                    />
                  </figure>
                  <p className="min-rows-1 text-sm">{project.blurb}</p>
                </Link>
              ))}
            </div>

            <p className="col-main min-rows-1 text-sm">
              To see more about these projects and others I&apos;ve worked on,
              click <FillingLink href="/projects">here</FillingLink>.
            </p>
          </div>
        </section>

        <footer className="page-grid">
          <p className="col-wide flex lines-2 items-center border-t border-blue-new text-xs">
            &copy; 2026 Steven Winnick
          </p>
        </footer>
      </main>
    </div>
  );
}
