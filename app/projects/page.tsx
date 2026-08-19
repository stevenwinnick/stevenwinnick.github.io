import type { Metadata } from "next";
import Heading from "@/components/Heading";
import ProjectSection from "@/components/ProjectSection";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Steven Winnick",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-grid gap-y-line pt-line">
        <Heading level={1} className="col-main rows-1">
          Projects
        </Heading>

        <p className="col-main min-rows-1 text-sm">
          A bit about my favorite projects I&apos;ve worked on and what I
          learned from each:
        </p>
      </section>

      {PROJECTS.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </>
  );
}
