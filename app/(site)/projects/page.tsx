import ProjectSection from "@/components/ProjectSection";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-cream px-4 py-3 text-ink">
        <div className="mx-auto max-w-[992px]">
          <h1 className="text-center font-title text-[10vw] uppercase">
            Projects
          </h1>
          <p className="text-center text-[3vw] leading-[4vw] lg:text-[20px] lg:leading-[27px]">
            A bit about my favorite projects I've worked on and what I learned
            from each
          </p>
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
