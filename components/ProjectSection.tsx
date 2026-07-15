import type { Project, SkillItem } from "@/data/projects";

const BODY_TEXT = "text-[3vw] leading-[4vw] lg:text-[20px] lg:leading-[27px]";
const SUBHEAD_TEXT = "font-title text-[5vw] lg:text-[45px]";

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
  const titleSize = project.smallTitle
    ? "text-[6vw] lg:text-[60px]"
    : "text-[8vw] lg:text-[80px]";

  return (
    <section
      id={project.id}
      // `scroll-mt` keeps anchored jumps clear of the fixed navbar.
      className={`scroll-mt-20 px-4 py-3 ${inverted ? "bg-cream text-ink" : "bg-ink text-cream"}`}
    >
      <div className="mx-auto max-w-[992px]">
        <h2 className={`font-title ${titleSize}`}>{project.title}</h2>
        {project.subtitle && <p className={BODY_TEXT}>{project.subtitle}</p>}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className={`my-2 w-full p-1 ${inverted ? "bg-ink" : "bg-cream"}`}
        />

        <h3 className={SUBHEAD_TEXT}>SKILLS</h3>
        <ul className={`list-disc pl-6 ${BODY_TEXT}`}>
          {project.skills.map((skill) => (
            <SkillListItem
              key={typeof skill === "string" ? skill : skill.label}
              skill={skill}
            />
          ))}
        </ul>

        <h3 className={SUBHEAD_TEXT}>DESCRIPTION</h3>
        <div className={`space-y-3 pb-3 ${BODY_TEXT}`}>{project.description}</div>
      </div>
    </section>
  );
}
