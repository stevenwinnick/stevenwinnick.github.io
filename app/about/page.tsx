import type { Metadata } from "next";
import FillingLink from "@/components/FillingLink";
import ModuleImage from "@/components/ModuleImage";
import PageHeading from "@/components/PageHeading";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "About | Steven Winnick",
};

const GRADUATION_PHOTO = {
  src: "/img/graduation.jpg",
  width: 4160,
  height: 6240,
};

export default function AboutPage() {
  return (
    <section className="page-grid gap-y-line pb-2line">
      <PageHeading>About</PageHeading>

      <PageIntro>A bit about me.</PageIntro>

      {/*
       * The photos flank the copy in the outer columns from `cols4`, the left
       * one on the intro's row and the right one a row lower, with the copy, so
       * the two are offset. Below `cols4` the single photo runs above the copy,
       * where those columns do not exist. Their columns are explicit
       * throughout, since auto-placement would otherwise drop them in an outer
       * track that is zero width until `cols4`. The repeated photo carries no
       * alt text.
       */}
      <ModuleImage
        image={GRADUATION_PHOTO}
        alt="Steven Winnick at his Columbia University graduation"
        tall
        className="col-start-2 col-end-4 self-start cols2:col-end-3 cols4:row-start-2 cols4:row-end-4"
      />

      <ModuleImage
        image={GRADUATION_PHOTO}
        alt=""
        tall
        className="hidden self-start cols4:col-start-5 cols4:col-end-6 cols4:row-start-3 cols4:row-end-4 cols4:block"
      />

      <div className="col-main flex flex-col gap-line text-sm">
        <p>
          {`I'm an innovator and engineer passionate about music and tech and excited about building the next generation of tech products. This fall, I'll be starting my first job after college as a Software Engineer at Datadog. Last summer, I was a Software Engineer Intern at Paramount, where I worked on CBS digital video streaming infrastructure. I also interned at Paramount the prior summer, helping define the Paramount+/PlutoTV innovation strategy to compete in the escalating "Streaming Wars" as a Technology Strategy Intern. The summer before, I was a Software Engineer and Product Manager intern at `}
          <FillingLink href="https://www.sonarhealth.co" external newTab>
            Sonar Health
          </FillingLink>
          {`, where I designed and built core features of a platform to bring users information about their health from a wide range of sources with industry-leading precision.`}
        </p>

        <p>
          {`I recently graduated from Columbia University, where I was a `}
          <FillingLink
            href="https://www.college.columbia.edu/alumni/jj-scholars-program"
            external
            newTab
          >
            John Jay Scholar
          </FillingLink>
          {` and `}
          <FillingLink
            href="https://en.wikipedia.org/wiki/National_Merit_Scholarship_Program"
            external
            newTab
          >
            National Merit Scholar
          </FillingLink>
          {`. I majored in Computer Science with an "Intelligent Systems" specialization, which allowed me to pursue my interests in AI and Machine Learning with graduate-level coursework exploring both the theoretical and applied sides of these fields. I'm especially interested in the application of Machine Learning to the world of music, and am currently working on projects applying Natural Language Processing techniques to song lyric analysis, and Signal Processing techniques to music emotion recognition. During my time in college, I was a member of the debate team, the formula racing team, and worked on a Computer Vision research project for self-driving cars. I'm a curious person who loves to learn, and especially to be able to build a knowledge of complex things by learning deeply about each of their component parts, so I also enjoyed taking all the Computer Science department's hardest systems classes my senior year.`}
        </p>

        <p>{`When not working on my more academic interests or programming projects, I can probably be found making music with my MIDI keyboard or exploring New York City with my friends. I also love to cook elaborate meals, and I ski most days when I'm home in the winter.`}</p>
      </div>
    </section>
  );
}
