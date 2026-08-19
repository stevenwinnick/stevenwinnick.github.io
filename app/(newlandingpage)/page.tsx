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
    <div className="relative min-h-dvh bg-white font-body-new text-blue-new">
      <LandingHeader />

      {/*
       * The frame the page sits in, a gutter outside the columns and drawn over
       * the fixed header so it reads as one line down the whole page. It only
       * appears once the columns are at full width, since below that the gutter
       * is the screen's own edge.
       */}
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 z-60"
      >
        {/*
         * The extra pixel puts the rule just outside the gutter, so the page's
         * horizontal rules butt up against its inside edge.
         */}
        <div className="col-wide -mx-[calc(var(--spacing-line)+1px)] cols2:border-x cols2:border-blue-new" />
      </div>

      {/*
       * Every text block is a module row with its copy on the row's ceiling, so
       * the page reads as a column of rows separated by a gutter.
       */}
      <main className="pt-(--header-height)">
        <section className="page-grid gap-y-line pt-line">
          <h1 className="col-main flex rows-1 items-end font-header-new text-xl font-medium tracking-header-new">
            Hey, I&apos;m Steven.
          </h1>

          <p className="col-main min-rows-1 text-sm">Welcome to my website!</p>

          <p className="col-main min-rows-1 text-sm">
            If you&apos;re <FillingLink href="/">here</FillingLink> because of
            my{" "}
            <FillingLink href={RESUME_URL} external newTab>
              resume
            </FillingLink>{" "}
            or <FillingLink href="/contact">application</FillingLink>, click to
            learn more <FillingLink href="/about">about me</FillingLink> or
            check out <FillingLink href="/projects">my work</FillingLink>.
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
          <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue-new px-line py-line cols2:border-b">
            <h2 className="col-main flex rows-1 items-end font-header-new text-lg font-semibold tracking-header-new">
              Projects
            </h2>

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
                  <p className="flex lines-1 items-end font-header-new text-md font-semibold tracking-header-new">
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
          <p className="col-wide flex lines-2 items-center text-xs">
            &copy; 2026 Steven Winnick
          </p>
        </footer>
      </main>
    </div>
  );
}
