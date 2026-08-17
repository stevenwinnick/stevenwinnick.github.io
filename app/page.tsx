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
    image: "/img/foghornSquare.jpg",
    dimensions: 680,
    blurb:
      "A tool for easily logging messages and recieving Slack notifications when sections of code are executed",
  },
  {
    anchor: "sheepshead",
    title: "SHEEPSHEAD AI",
    image: "/img/royalFlushSquare.jpg",
    dimensions: 668,
    blurb:
      "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning",
  },
  {
    anchor: "rhymenet",
    title: "RHYMENET",
    image: "/img/rhymesHighlightedSquare.jpg",
    dimensions: 720,
    blurb:
      "An English language database containing information about words' phoenetic and written syllable divisions",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="screen-section flex flex-col">
        <div className="page-grid flex-1 content-center gap-y-line py-2line">
          <PageHeading className="col-main">Hey, I&apos;m Steven</PageHeading>

          <div className="col-main space-y-2line text-center text-sm xl:row-start-2 xl:self-center xl:text-left">
            <p>Welcome to my website!</p>
            <p>
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

          {/* Headshot moves beside the copy once the outer columns exist. */}
          <figure className="col-main m-0 xl:col-left xl:row-start-2">
            <Image
              src="/img/bigHeadshotCircle.png"
              alt="Steven Winnick"
              width={400}
              height={400}
              priority
              className="mx-auto block w-auto max-w-full object-contain lines-9 xl:lines-8"
            />
          </figure>
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

      <section className="page-grid gap-y-2line bg-cream py-2line text-ink">
        <div className="col-main space-y-line text-center">
          <h2 className="font-title text-xl">PROJECTS</h2>
          <p className="text-sm">
            Here are a few of the projects I&apos;ve worked on recently
          </p>
        </div>

        {/*
         * Subgrid so the previews use the page grid's columns and gutters, and
         * so their titles, images, and blurbs share rows across all three.
         */}
        <div className="col-wide grid grid-cols-subgrid gap-y-2line xl:grid-rows-[auto_auto_auto]">
          {PREVIEW_PROJECTS.map((project) => (
            <Link
              key={project.anchor}
              href={`/projects#${project.anchor}`}
              className="col-span-2 text-inherit no-underline xl:col-span-1 xl:row-span-3 xl:grid xl:grid-rows-subgrid"
            >
              <p className="text-center font-title text-md">{project.title}</p>
              <figure className="module-frame m-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={project.dimensions}
                  height={project.dimensions}
                  className="module-crop bg-ink p-1"
                />
              </figure>
              <p className="text-sm">{project.blurb}</p>
            </Link>
          ))}

          <p className="col-span-2 text-center text-sm xl:col-span-1 xl:row-span-3 xl:self-center xl:text-left">
            To see more about these projects and others I&apos;ve worked on,
            click{" "}
            <BoxyFillingPill href="/projects" accent="var(--color-red)" inverted>
              here
            </BoxyFillingPill>
          </p>
        </div>
      </section>
    </>
  );
}
