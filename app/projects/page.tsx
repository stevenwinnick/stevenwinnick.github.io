import PageHeading from "@/components/PageHeading";
import ProjectSection from "@/components/ProjectSection";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-cream px-sm py-3 text-ink">
        <div className="mx-auto max-w-5xl">
          <PageHeading>Projects</PageHeading>
          <p className="text-center text-sm">A bit about my favorite projects I&apos;ve worked on and what I learned from each</p>
        </div>
      </section>

      {/* Sections alternate color schemes, starting with the inverted (cream) one. */}
      {PROJECTS.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          inverted={index % 2 === 0}
        />
      ))}
    </>
  );
}
