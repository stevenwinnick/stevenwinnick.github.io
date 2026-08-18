import Image from "next/image";
import Link from "next/link";
import BoxyFillingPill from "@/components/BoxyFillingPill";

const RESUME_URL =
  "https://drive.google.com/file/d/17jHs-lGyFanjH1GBPOZNlB5fl1YMSl2K/view";

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
    <>
      <section className="screen-section flex flex-col">
        {/*
         * Off the page grid on purpose: the first screen is one centred block,
         * with the measure capped at the width of the two centre columns.
         */}
        <div className="flex flex-1 flex-col items-center justify-center gap-line px-line py-line text-center">
          <h1 className="font-title text-xl uppercase">Hey, I&apos;m Steven</h1>

          {/*
           * A module row each, greeting on its floor and the links on the next
           * row's ceiling, so the two meet across one gutter. `min-rows-1` so a
           * phone can spill the links past the row rather than clip them.
           */}
          <div className="flex max-w-(--grid-main) flex-col gap-line text-sm">
            <p className="flex min-rows-1 items-end justify-center">
              Welcome to my website!
            </p>
            <p className="min-rows-1">
              If you&apos;re{" "}
              <BoxyFillingPill href="/" accent="var(--color-green)">
                here
              </BoxyFillingPill>{" "}
              because of my{" "}
              <BoxyFillingPill
                href={RESUME_URL}
                accent="var(--color-yellow)"
                external
              >
                resume
              </BoxyFillingPill>{" "}
              or{" "}
              <BoxyFillingPill href="/contact" accent="var(--color-purple)">
                application,
              </BoxyFillingPill>{" "}
              click to learn more{" "}
              <BoxyFillingPill href="/about" accent="var(--color-blue)">
                about me
              </BoxyFillingPill>{" "}
              or check out{" "}
              <BoxyFillingPill href="/projects" accent="var(--color-red)">
                my work
              </BoxyFillingPill>
            </p>
          </div>
        </div>

        <Image
          src="/img/caratCream.png"
          alt=""
          width={40}
          height={40}
          className="mx-auto mb-half-line block w-auto lines-1"
        />
        <div className="h-half-line bg-cream" />
      </section>

      <section className="page-grid gap-y-line bg-cream py-2line text-ink">
        <div className="col-main flex min-rows-1 flex-col justify-end gap-line text-center">
          <h2 className="font-title text-xl">PROJECTS</h2>
          <p className="text-sm">
            Here are a few of the projects I&apos;ve worked on recently
          </p>
        </div>

        {/*
         * Subgrid so the previews use the page grid's columns and gutters, and
         * so their titles, images, and blurbs share rows across all four. One
         * per column at `xl`, 2x2 once the columns reach full width, stacked
         * two columns wide below that.
         */}
        <div className="col-wide grid grid-cols-subgrid gap-y-2line xl:grid-rows-[auto_auto_auto] xl:gap-y-line">
          {PREVIEW_PROJECTS.map((project) => (
            <Link
              key={project.anchor}
              href={`/projects#${project.anchor}`}
              className="col-span-2 flex min-w-0 flex-col gap-line text-inherit no-underline md:col-span-1 xl:row-span-3 xl:grid xl:grid-rows-subgrid"
            >
              {/*
               * One column wide from `md`, so the title steps down to fit, and
               * a module-tall field with the title on its floor, so titles meet
               * the tops of their images however many lines they run to.
               */}
              <p className="flex rows-1 items-end font-title text-md md:text-col">
                {project.title}
              </p>
              <figure className="module-frame m-0">
                <Image
                  src={project.image.src}
                  alt={project.title}
                  width={project.image.width}
                  height={project.image.height}
                  className="module-crop bg-ink p-1"
                />
              </figure>
              <p className="text-sm">{project.blurb}</p>
            </Link>
          ))}
        </div>

        <p className="col-main min-rows-1 text-center text-sm">
          To see more about these projects and others I&apos;ve worked on, click{" "}
          <BoxyFillingPill href="/projects" accent="var(--color-red)" inverted>
            here
          </BoxyFillingPill>
        </p>
      </section>
    </>
  );
}
