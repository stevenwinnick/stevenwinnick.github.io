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
  // The shots start on the skills row, which is the third only when the project
  // has a subtitle to fill the second.
  const imageRow = project.subtitle ? "cols4:row-start-3" : "cols4:row-start-2";

  return (
    <section id={project.id} className="page-grid scroll-mt-(--header-height)">
      <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue px-line py-line">
        <h3 className="col-main rows-1">{project.title}</h3>

        {project.subtitle && (
          <p className="col-main min-rows-1 text-sm">{project.subtitle}</p>
        )}

        {/*
         * From `cols4` the shot sits in the left outer column and is mirrored
         * into the right one, so the copy runs between the two. The mirrored
         * copy is decorative, hence the empty alt.
         */}
        <ModuleImage
          image={project.image}
          alt={project.title}
          className={`col-start-1 col-end-3 self-start cols2:col-end-2 ${imageRow}`}
        />

        <ModuleImage
          image={project.image}
          alt=""
          className={`hidden self-start cols4:col-start-4 cols4:col-end-5 cols4:block ${imageRow}`}
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
