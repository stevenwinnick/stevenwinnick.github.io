import ModuleImage from "@/components/ModuleImage";
import type { Project, SkillItem } from "@/data/projects";

function SkillListItem({ skill }: { skill: SkillItem }) {
  if (typeof skill === "string") {
    return <li>{skill}</li>;
  }

  return (
    <li>
      {skill.label}
      <ul className="list-disc pl-line">
        {skill.children.map((child) => (
          <li key={child}>{child}</li>
        ))}
      </ul>
    </li>
  );
}

// The negative margin lets the opening rule run out to the page frame while the
// subgrid keeps the content on the page grid's columns.
export default function ProjectSection({ project }: { project: Project }) {
  return (
    <section id={project.id} className="page-grid scroll-mt-(--header-height)">
      <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue px-line py-line">
        <h3 className="col-main rows-1">{project.title}</h3>

        {project.subtitle && (
          <p className="col-main min-rows-1 text-sm">{project.subtitle}</p>
        )}

        <ModuleImage
          image={project.image}
          alt={project.title}
          className="col-span-2 cols2:col-span-1"
        />

        <div className="col-main flex flex-col gap-line">
          <h4 className="lines-1">Skills</h4>

          <ul className="list-disc pl-line text-sm">
            {project.skills.map((skill) => (
              <SkillListItem
                key={typeof skill === "string" ? skill : skill.label}
                skill={skill}
              />
            ))}
          </ul>

          <h4 className="lines-1">Description</h4>

          <div className="flex flex-col gap-line text-sm">
            {project.description}
          </div>
        </div>
      </div>
    </section>
  );
}
