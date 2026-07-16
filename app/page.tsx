import Image from "next/image";
import Link from "next/link";
import BoxyFillingPill from "@/components/BoxyFillingPill";
import PageHeading from "@/components/PageHeading";

const RESUME_URL =
  "https://drive.google.com/file/d/17jHs-lGyFanjH1GBPOZNlB5fl1YMSl2K/view";

const PREVIEW_PROJECTS = [
  {
    anchor: "foghorn",
    title: "FOGHORN API",
    image: "/img/FoghornSquare.jpg",
    dimensions: 680,
    blurb:
      "A tool for easily logging messages and recieving Slack notifications when sections of code are executed",
  },
  {
    anchor: "sheepshead",
    title: "SHEEPSHEAD AI",
    image: "/img/RoyalFlushSquare.jpg",
    dimensions: 668,
    blurb:
      "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning",
  },
  {
    anchor: "rhymenet",
    title: "RHYMENET",
    image: "/img/RhymesHighlightedSquare.jpg",
    dimensions: 720,
    blurb:
      "An English language database containing information about words' phoenetic and written syllable divisions",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Landing section: fills the viewport below the navbar. */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-sm">
          <PageHeading>Hey, I&apos;m Steven</PageHeading>

          <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-md lg:flex-row">
            <div className="text-center lg:max-w-[750px] lg:flex-1">
              <p className="text-sm">Welcome to my website!</p>
              <div className="h-12" />
              <p className="text-sm">
                If you&apos;re{" "}
                <BoxyFillingPill href="/" accent="var(--color-green)">
                  here
                </BoxyFillingPill>{" "}
                because of my{" "}
                <BoxyFillingPill href={RESUME_URL} accent="var(--color-yellow)" external>
                  resume
                </BoxyFillingPill>{" "}
                or{" "}
                <BoxyFillingPill href="/contact" accent="var(--color-purple)">
                  application,
                </BoxyFillingPill>
                <br />
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

            <div className="shrink-0">
              <Image
                src="/img/bigheadshotcircle.png"
                alt="Steven Winnick"
                width={400}
                height={400}
                priority
                className="mx-auto block h-auto w-[70vw] lg:w-[400px]"
              />
            </div>
          </div>
        </div>

        <Image
          src="/img/carat-cream.png"
          alt=""
          width={40}
          height={40}
          className="mx-auto mb-2 block h-auto w-[5%]"
        />
        <div className="h-4 bg-cream" />
      </section>

      {/* Projects preview */}
      <section className="bg-cream text-ink">
        <div className="px-sm pt-2">
          <h2 className="text-center font-title text-xl">PROJECTS</h2>
          <p className="pb-3 text-center text-sm">
            Here are a few of the projects I&apos;ve worked on recently
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-sm px-sm pt-3 lg:grid-cols-3">
          {PREVIEW_PROJECTS.map((project) => (
            <Link
              key={project.anchor}
              href={`/projects#${project.anchor}`}
              className="text-inherit no-underline"
            >
              <p className="pt-3 text-center font-title text-md">
                {project.title}
              </p>
              <Image
                src={project.image}
                alt={project.title}
                width={project.dimensions}
                height={project.dimensions}
                className="h-auto w-full bg-ink p-1"
              />
              <p className="pt-1 text-sm">{project.blurb}</p>
            </Link>
          ))}
        </div>

        <p className="px-sm py-12 text-center text-sm">
          To see more about these projects and others I&apos;ve worked on, click{" "}
          <BoxyFillingPill href="/projects" accent="var(--color-red)" inverted>
            here
          </BoxyFillingPill>
        </p>
      </section>
    </>
  );
}
