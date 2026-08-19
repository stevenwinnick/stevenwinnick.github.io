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
// subgrid keeps the content on the page grid's columns. The bottom padding is a
// module row, so a project is set off from the rule that opens the next one.
export default function ProjectSection({ project }: { project: Project }) {
  /*
   * The rows are placed by hand because the composition changes at every step:
   * mobile stacks the title, shot, summary and body; from `cols2` the summary
   * takes the left column with the shot beside it and a second shot below;
   * from `cols4` the shots move out to the outer columns, the second offset a
   * row down so it sits with the body. Without a summary every row above the
   * body moves up one.
   */
  const summaryRow = "row-start-3 cols2:row-start-2";
  const secondShotRow = project.subtitle
    ? "cols2:row-start-3"
    : "cols2:row-start-2";
  const bodyRow = project.subtitle
    ? "row-start-4 cols4:row-start-3"
    : "row-start-3 cols4:row-start-2";

  return (
    <section id={project.id} className="page-grid scroll-mt-(--header-height)">
      <div className="col-wide -mx-line grid grid-cols-subgrid gap-y-line border-t border-blue px-line pt-line pb-(--grid-row)">
        <h3 className="col-main row-start-1 rows-1">{project.title}</h3>

        <ModuleImage
          image={project.image}
          alt={project.title}
          className="col-start-1 col-end-3 row-start-2 self-start cols2:col-start-2 cols2:col-end-3 cols4:col-start-1 cols4:col-end-2"
        />

        {project.subtitle && (
          <p
            className={`col-main min-rows-1 text-sm cols2:col-start-1 cols2:col-end-2 cols4:col-start-2 cols4:col-end-4 ${summaryRow}`}
          >
            {project.subtitle}
          </p>
        )}

        {/* A repeat of the shot above, so it carries no alt text. */}
        <ModuleImage
          image={project.image}
          alt=""
          className={`hidden self-start cols2:col-start-1 cols2:col-end-2 cols2:block cols4:col-start-4 cols4:col-end-5 ${secondShotRow}`}
        />

        <div className={`col-main flex flex-col gap-line ${bodyRow}`}>
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
