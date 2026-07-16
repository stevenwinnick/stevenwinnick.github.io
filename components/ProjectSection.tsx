import Image from "next/image";
import type { Project, SkillItem } from "@/data/projects";

function SkillListItem({ skill }: { skill: SkillItem }) {
  if (typeof skill === "string") {
    return <li>{skill}</li>;
  }

  return (
    <li>
      {skill.label}
      <ul className="list-disc pl-6">
        {skill.children.map((child) => (
          <li key={child}>{child}</li>
        ))}
      </ul>
    </li>
  );
}

/**
 * Renders a single project. Sections alternate between the default (dark) and
 * inverted (cream) color schemes; prose links inherit the section text color.
 */
export default function ProjectSection({
  project,
  inverted,
}: {
  project: Project;
  inverted: boolean;
}) {
  return (
    <section
      id={project.id}
      // `scroll-mt` keeps anchored jumps clear of the fixed navbar.
      className={`scroll-mt-20 px-sm py-3 ${inverted ? "bg-cream text-ink" : "bg-ink text-cream"}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className={`font-title ${project.smallTitle ? "text-md" : "text-lg"}`}>
          {project.title}
        </h2>
        {project.subtitle && <p className="text-sm">{project.subtitle}</p>}

        <Image
          src={project.image.src}
          alt={project.title}
          width={project.image.width}
          height={project.image.height}
          className={`my-2 h-auto w-full p-1 ${inverted ? "bg-ink" : "bg-cream"}`}
        />

        <h3 className="font-title text-md">SKILLS</h3>
        <ul className="list-disc pl-6 text-sm">
          {project.skills.map((skill) => (
            <SkillListItem
              key={typeof skill === "string" ? skill : skill.label}
              skill={skill}
            />
          ))}
        </ul>

        <h3 className="mt-lg font-title text-md">DESCRIPTION</h3>
        <div className="space-y-3 pb-3 text-sm">{project.description}</div>
      </div>
    </section>
  );
}
