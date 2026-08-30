import type { Metadata } from "next";
import FillingLink from "@/components/FillingLink";
import ModuleImage from "@/components/ModuleImage";
import PageHeading from "@/components/PageHeading";
import PageIntro from "@/components/PageIntro";
import { CASCADIUM_URL } from "@/data/navigation";

export const metadata: Metadata = {
  title: "About | Steven Winnick",
};

const OVERLOOK_PHOTO = "/img/overlook.webp";
const GRADUATION_PHOTO = "/img/graduation-wide.webp";
const MOUNTAINS_JACKET_PHOTO = "/img/mountains-jacket.webp";

export default function AboutPage() {
  return (
    <section className="page-grid gap-y-line pb-(--grid-row)">
      <PageHeading>About</PageHeading>

      <PageIntro>A bit about me.</PageIntro>

      {/* The photos are placed in particular rows and columns at each width. */}
      <ModuleImage
        src={OVERLOOK_PHOTO}
        alt="Steven Winnick on a hillside overlook above a city"
        tall
        lift="soft"
        className="col-start-2 col-end-4 self-start cols2:col-end-3 cols4:col-start-3 cols4:col-end-4 cols4:row-start-3 cols4:row-end-5"
      />

      <div className="col-main flex flex-col gap-line text-sm cols4:row-start-5 cols4:row-end-6">
        <p>
          {`I'm a founder of `}
          <FillingLink href={CASCADIUM_URL} external newTab>
            Cascadium
          </FillingLink>
          {`, where I'm working on shortening the time it takes scientific and technological innovation to benefit human health and well-being. Before this, I worked on ensuring the reliability and security of some of the world's most complex software systems. I now bring that same focus and rigor to developing technology in which accuracy and precision are absolute requirements. At `}
          <FillingLink href="https://www.datadoghq.com/" external newTab>
            Datadog
          </FillingLink>
          {`, I created core cloud infrastructure management platforms used to maintain the reliability of all 10 of the top 10 AI companies. The software I built allowed engineers to manage cloud compute infrastructure safely, securely, and simply, by providing opinionated interfaces which abstracted away unnecessary areas of complexity. At `}
          <FillingLink href="https://www.paramount.com/" external newTab>
            Paramount
          </FillingLink>
          {`, I created a novel application to increase the reliability of advertisement placement in live video streams for CBS Sports and Paramount Plus, which would host the `}
          <FillingLink
            href="https://www.paramountpressexpress.com/cbs-sports/releases/?view=109259-cbs-sports-presentation-of-super-bowl-lviii-is-most-watched-telecast-in-history-with-1234-million-viewers-across-platforms"
            external
            newTab
          >
            2024 Super Bowl
          </FillingLink>
          {`. I also took second place at the company hackathon, reported directly to the SVP of Strategic Tech Initiatives, and presented to the CTO multiple times.`}
        </p>

        <p>
          {`I studied Computer Science at Columbia University with a specialization in Artificial Intelligence and Machine Learning Systems. At Columbia, I was a `}
          <FillingLink
            href="https://en.wikipedia.org/wiki/National_Merit_Scholarship_Program"
            external
            newTab
          >
            National Merit Scholar
          </FillingLink>
          {` and `}
          <FillingLink
            href="https://www.college.columbia.edu/alumni/jj-scholars-program"
            external
            newTab
          >
            John Jay Scholar
          </FillingLink>
          {`, a member of the school's Debate Team, graduated with a 4.0 GPA, and contributed to Computer Vision research for self-driving cars. Through the courses I chose for my major, I built a deep understanding of the design of large, distributed AI and machine learning systems and the infrastructure enabling them. I also made the most of my access to Columbia to fuel my curiosity through courses in art history, music theory, anthropology, American history, physics, and upper-level electives in philosophy, mathematics, economics, electrical engineering, and English literature. These courses provided me with new ways to interpret the world which I continue to appreciate and expand.`}
        </p>

        <p>{`When not working on Cascadium, I enjoy creating elaborate meals, software projects, exercising (currently lifting, biking, and running, in that order), and spending time with my wonderful friends. When in transit, doing simple chores, or winding down for the day, I like to read or listen to audiobooks, and strive to learn new things and develop new perspectives whenever possible.`}</p>
      </div>

      <ModuleImage
        src={GRADUATION_PHOTO}
        alt="Steven Winnick at his Columbia University graduation"
        lift="soft"
        className="col-start-2 col-end-4 self-start cols2:col-start-3 cols2:row-start-5 cols2:row-end-6 cols4:col-start-5 cols4:col-end-6 cols4:row-start-5 cols4:row-end-6"
      />

      <ModuleImage
        src={MOUNTAINS_JACKET_PHOTO}
        alt="Steven Winnick in front of a snow-capped mountain range"
        lift="full"
        className="col-start-2 col-end-4 cols2:col-end-3 cols2:row-start-6 cols2:row-end-7 cols4:col-start-2 cols4:col-end-3 cols4:row-start-6 cols4:row-end-7"
      />
    </section>
  );
}
