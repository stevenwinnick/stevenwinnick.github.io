import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import PageIntro from "@/components/PageIntro";
import ProjectSection from "@/components/ProjectSection";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Steven Winnick",
};

export default function ProjectsPage() {
  return (
    <>
      {/* The bottom padding is the gutter between the intro's row and the rule
       * that opens the first project, which sits in a section of its own. */}
      <section className="page-grid gap-y-line pb-line">
        <PageHeading>Projects</PageHeading>

        <PageIntro>
          A bit about my favorite projects I&apos;ve worked on and what I
          learned from each.
        </PageIntro>
      </section>

      {PROJECTS.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
    </>
  );
}
