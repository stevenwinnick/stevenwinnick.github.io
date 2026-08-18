import Image from "next/image";
import Link from "next/link";
import FillingLink from "@/components/FillingLink";
import LandingHeader from "@/components/LandingHeader";
import { RESUME_URL } from "@/data/navigation";

const PREVIEW_PROJECTS = [
  {
    anchor: "foghorn",
    title: "FOGHORN API",
    image: { src: "/img/foghornSquare.jpg", width: 680, height: 680 },
    blurb:
      "A tool for easily logging messages and recieving Slack notifications when sections of code are executed",
  },
  {
    anchor: "sheepshead",
    title: "SHEEPSHEAD AI",
    image: { src: "/img/royalFlushSquare.jpg", width: 668, height: 668 },
    blurb:
      "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning",
  },
  {
    anchor: "rhymenet",
    title: "RHYMENET",
    image: { src: "/img/rhymesHighlightedSquare.jpg", width: 720, height: 720 },
    blurb:
      "An English language database containing information about words' phoenetic and written syllable divisions",
  },
  {
    anchor: "waves",
    title: "SONIC CANVAS",
    image: { src: "/img/soundwaves.png", width: 1200, height: 673 },
    blurb: "A creative tool for quickly testing sound wave samples",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-paper font-serif text-ultramarine">
      <LandingHeader />

      {/*
       * Every text block is a module row with its copy on the row's ceiling, so
       * the page reads as a column of rows separated by a gutter.
       */}
      <main className="pt-(--header-height)">
        <section className="page-grid gap-y-line pt-line">
          <h1 className="col-measure min-rows-1 text-xl">
            Hey, I&apos;m Steven
          </h1>

          <p className="col-measure min-rows-1 text-sm">
            Welcome to my website!
          </p>

          <p className="col-measure min-rows-1 text-sm">
            If you&apos;re <FillingLink href="/">here</FillingLink> because of my{" "}
            <FillingLink href={RESUME_URL} external>
              resume
            </FillingLink>{" "}
            or <FillingLink href="/contact">application,</FillingLink> click to
            learn more <FillingLink href="/about">about me</FillingLink> or check
            out <FillingLink href="/projects">my work</FillingLink>
          </p>
        </section>

        <section className="page-grid gap-y-line pb-2line">
          <hr className="col-wide m-0 border-t border-ultramarine" />

          <h2 className="col-measure min-rows-1 text-md tracking-label uppercase">
            Projects
          </h2>

          <p className="col-measure min-rows-1 text-sm">
            Here are a few of the projects I&apos;ve worked on recently
          </p>

          {/*
           * Subgrid so the previews use the page grid's columns and gutters, and
           * so their titles, images, and blurbs share rows across all four. One
           * per column at `lg`, 2x2 once the columns reach full width, stacked
           * two columns wide below that.
           */}
          <div className="col-wide grid grid-cols-subgrid gap-y-2line lg:grid-rows-[auto_auto_auto] lg:gap-y-line">
            {PREVIEW_PROJECTS.map((project) => (
              <Link
                key={project.anchor}
                href={`/projects#${project.anchor}`}
                className="col-span-2 flex min-w-0 flex-col gap-line text-inherit no-underline md:col-span-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid"
              >
                <p className="flex lines-1 items-end text-sm tracking-label uppercase">
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
                    className="absolute inset-0 bg-ultramarine mix-blend-color"
                  />
                </figure>
                <p className="text-sm">{project.blurb}</p>
              </Link>
            ))}
          </div>

          <p className="col-measure min-rows-1 text-sm">
            To see more about these projects and others I&apos;ve worked on,
            click <FillingLink href="/projects">here</FillingLink>
          </p>
        </section>

        <footer className="page-grid">
          <p className="col-wide flex lines-2 items-center border-t border-ultramarine text-xs">
            &copy; 2026 Steven Winnick
          </p>
        </footer>
      </main>
    </div>
  );
}
