import Link from "next/link";
import Pill from "@/components/Pill";

const RESUME_URL =
  "https://drive.google.com/file/d/17jHs-lGyFanjH1GBPOZNlB5fl1YMSl2K/view";

const PREVIEW_PROJECTS = [
  {
    anchor: "foghorn",
    title: "FOGHORN API",
    image: "/img/FoghornSquare.jpg",
    blurb:
      "A tool for easily logging messages and recieving Slack notifications when sections of code are executed",
  },
  {
    anchor: "sheepshead",
    title: "SHEEPSHEAD AI",
    image: "/img/RoyalFlushSquare.jpg",
    blurb:
      "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning",
  },
  {
    anchor: "rhymenet",
    title: "RHYMENET",
    image: "/img/RhymesHighlightedSquare.jpg",
    blurb:
      "An English language database containing information about words' phoenetic and written syllable divisions",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Landing section: fills the viewport below the navbar. */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <h1 className="text-center font-title text-[10vw] uppercase">
            Hey, I&apos;m Steven
          </h1>

          <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row">
            <div className="text-center lg:w-1/2">
              <p className="text-[2.8vw] lg:text-[1.8vw]">
                Welcome to my website!
              </p>
              <div className="h-12" />
              <p className="text-[2.8vw] lg:text-[1.8vw]">
                If you&apos;re{" "}
                <Pill href="/" accent="var(--color-green)">
                  here
                </Pill>{" "}
                because of my{" "}
                <Pill href={RESUME_URL} accent="var(--color-yellow)" external>
                  resume
                </Pill>{" "}
                or{" "}
                <Pill href="/contact" accent="var(--color-purple)">
                  application,
                </Pill>
                <br />
                click to learn more{" "}
                <Pill href="/about" accent="var(--color-blue)">
                  about me
                </Pill>{" "}
                or check out{" "}
                <Pill href="/projects" accent="var(--color-red)">
                  my work
                </Pill>
              </p>
            </div>

            <div className="lg:w-5/12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/bigheadshotcircle.png"
                alt="Steven Winnick"
                className="mx-auto block w-[70vw] lg:w-[400px]"
              />
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/carat-cream.png"
          alt=""
          className="mx-auto mb-2 block w-[5%]"
        />
        <div className="h-4 bg-cream" />
      </section>

      {/* Projects preview */}
      <section className="bg-cream text-ink">
        <div className="px-4 pt-2">
          <h2 className="text-center font-title text-[10vw]">PROJECTS</h2>
          <p className="pb-3 text-center text-[2.8vw] lg:text-[1.8vw]">
            Here are a few of the projects I&apos;ve worked on recently
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-4 px-4 pt-3 lg:grid-cols-3">
          {PREVIEW_PROJECTS.map((project) => (
            <Link
              key={project.anchor}
              href={`/projects#${project.anchor}`}
              className="text-inherit no-underline"
            >
              <p className="pt-3 text-center font-title text-[8vw] lg:text-[3vw]">
                {project.title}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full bg-ink p-1"
              />
              <p className="pt-1 text-[2.8vw] leading-[1.2] lg:text-[1.8vw]">
                {project.blurb}
              </p>
            </Link>
          ))}
        </div>

        <p className="px-4 py-12 text-center text-[2.8vw] lg:text-[1.8vw]">
          To see more about these projects and others I&apos;ve worked on, click{" "}
          <Pill href="/projects" accent="var(--color-red)" inverted>
            here
          </Pill>
        </p>
      </section>
    </>
  );
}
