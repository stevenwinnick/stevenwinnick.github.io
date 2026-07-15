import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Steven Winnick",
};

export default function AboutPage() {
  return (
    <section className="flex flex-col px-4">
      <h1 className="text-center font-title text-[10vw] uppercase">My Bio</h1>

      <div className="mx-auto flex w-full max-w-[992px] flex-col items-center gap-4 lg:flex-row">
        <div className="lg:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/graduation.jpg"
            alt="Steven Winnick at his Columbia University graduation"
            className="mx-auto block w-full max-w-full bg-cream p-2"
          />
        </div>

        <div className="space-y-3 text-justify text-[2.5vw] leading-snug lg:w-1/2 lg:text-[14px]">
          <p>
            I&apos;m an innovator and engineer passionate about music and tech
            and excited about building the next generation of tech products.
            This fall, I&apos;ll be starting my first job after college as a
            Software Engineer at Datadog. Last summer, I was a Software Engineer
            Intern at Paramount, where I worked on CBS digital video streaming
            infrastructure. I also interned at Paramount the prior summer,
            helping define the Paramount+/PlutoTV innovation strategy to compete
            in the escalating &quot;Streaming Wars&quot; as a Technology Strategy
            Intern. The summer before, I was a Software Engineer and Product
            Manager intern at{" "}
            <a
              className="prose-link"
              href="https://www.sonarhealth.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sonar Health
            </a>
            , where I designed and built core features of a platform to bring
            users information about their health from a wide range of sources
            with industry-leading precision.
          </p>
          <p>
            I recently graduated from Columbia University, where I was a{" "}
            <a
              className="prose-link"
              href="https://www.college.columbia.edu/alumni/jj-scholars-program"
              target="_blank"
              rel="noopener noreferrer"
            >
              John Jay Scholar
            </a>{" "}
            and{" "}
            <a
              className="prose-link"
              href="https://en.wikipedia.org/wiki/National_Merit_Scholarship_Program"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Merit Scholar
            </a>
            . I majored in Computer Science with an &quot;Intelligent
            Systems&quot; specialization, which allowed me to pursue my interests
            in AI and Machine Learning with graduate-level coursework exploring
            both the theoretical and applied sides of these fields. I&apos;m
            especially interested in the application of Machine Learning to the
            world of music, and am currently working on projects applying Natural
            Language Processing techniques to song lyric analysis, and Signal
            Processing techniques to music emotion recognition. During my time in
            college, I was a member of the debate team, the formula racing team,
            and worked on a Computer Vision research project for self-driving
            cars. I&apos;m a curious person who loves to learn, and especially to
            be able to build a knowledge of complex things by learning deeply
            about each of their component parts, so I also enjoyed taking all the
            Computer Science department&apos;s hardest systems classes my senior
            year.
          </p>
          <p>
            When not working on my more academic interests or programming
            projects, I can probably be found making music with my MIDI keyboard
            or exploring New York City with my friends. I also love to cook
            elaborate meals, and I ski most days when I&apos;m home in the
            winter.
          </p>
        </div>
      </div>
    </section>
  );
}
