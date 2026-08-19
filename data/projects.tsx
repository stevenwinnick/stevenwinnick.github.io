import type { ReactNode } from "react";
import FillingLink from "@/components/FillingLink";
import type { ModuleImageSource } from "@/components/ModuleImage";

/** A skill bullet, optionally with a nested list of sub-bullets. */
export type SkillItem = string | { label: string; children: string[] };

/** The square crop and short blurb a project is previewed with on the landing page. */
export type ProjectPreview = { image: ModuleImageSource; blurb: string };

export type Project = {
  id: string;
  title: string;
  subtitle?: ReactNode;
  image: ModuleImageSource;
  skills: SkillItem[];
  description: ReactNode;
  preview?: ProjectPreview;
};

export type PreviewedProject = Project & { preview: ProjectPreview };

export const PROJECTS: Project[] = [
  {
    id: "pitch",
    title: "Pitch Perfect",
    subtitle:
      "A hardware-accelerated real-time phase vocoder for pitch scaling, built on the Intel/Altera Cyclone V DE1-SOC FPGA",
    image: { src: "/img/greenboard.png", width: 1200, height: 673 },
    skills: [
      {
        label: "Embedded System Design",
        children: [
          "Designing hardware circuitry to perform complex, multi-step mathematical algorithms",
          "SystemVerilog hardware description",
          "Intel Quartus and QSys Platform Designer",
          "Interfacing with prebuilt hardware components",
          "Circuitry timing",
          "Fixed-point mathematical operations in hardware",
        ],
      },
      {
        label: "C Programming",
        children: [
          "Linux Kernel hacking to allow software to interface with hardware",
          "Embedded system simulation in C",
        ],
      },
      {
        label: "Digital Signal Processing",
        children: ["Fast Fourier Transform", "Phase Vocoder Algorithm"],
      },
    ],
    description: (
      <>
        <p>
          {`In my last semester of college, I decided to take an Electrical Engineering capstone class, `}
          <FillingLink href="http://www.cs.columbia.edu/~sedwards/classes/2024/4840-spring/index.html" external newTab>Embedded Systems</FillingLink>
          {`, despite not actually being an Electrical Engineering major. I had really enjoyed an EE class that I'd taken in which we'd built up a working CPU able to execute assembled machine code from basic logic gates, and I was curious about how other hardware systems worked. I had also taken Operating Systems the semester before and was curious about the physical connections between hardware peripherals and software. I hadn't taken the recommended prerequisite classes for Embedded Systems, but I was curious enough about its content that I figured I'd be able to catch up where I needed. The class ended up being a great experience. I learned all about the most important components of modern embedded systems (memory, networking, USB, video, etc.), including their histories and how they're commonly implemented now.`}
        </p>
        <p>
          {`The course also included a semester-long group project in which we got to work closely with our professor to design and then implement a project with both hardware and software components on an FPGA. My group of 3 decided to build a pitch shifter/scaler that would take in audio from our FPGA's 3.5mm audio input line and scale it's pitch entirely in hardware using a custom circuit we designed, then play back the audio to the board's output line, with the level of pitch scaling being controlled via software. To do so, we first started by researching different pitch scaling algorithms and implementing them in Python to gain a thorough understanding of the workings of each and decide which sounded the best for our use case. We landed on a version of the `}
          <FillingLink href="https://en.wikipedia.org/wiki/Phase_vocoder" external newTab>Phase Vocoder</FillingLink>
          {` algorithm with transient detection for improved vertical coherence. We then implemented the algorithm in C, simulating intended hardware implementation by using fixed-size memory buffers, polar coordinate conversion of transformed frequency-domain signals to remove the need for trigonometric hardware calculations, and a real-time streaming interface, among others features. Once we were satisfied with the sound of our C implementation, we got to work designing circuits for our board, which was able to reconfigure itself to test our specified circuitry. You can find the code for Pitch Perfect `}
          <FillingLink href="https://github.com/sanjayrajasekharan/pitch-perfect" external newTab>here</FillingLink>
          {` and our final presentation slides `}
          <FillingLink href="http://www.cs.columbia.edu/~sedwards/classes/2024/4840-spring/reports/Harmony-Hand-presentation.pdf" external newTab>here</FillingLink>
          {`.`}
        </p>
      </>
    ),
  },
  {
    id: "waves",
    title: "Sonic Canvas",
    subtitle: "A creative tool for quickly testing sound wave samples",
    image: { src: "/img/soundwaves.png", width: 1200, height: 673 },
    preview: {
      image: { src: "/img/soundwaves.png", width: 1200, height: 673 },
      blurb: "A creative tool for quickly testing sound wave samples.",
    },
    skills: [
      {
        label: "Digital audio",
        children: ["WebAudio", "Digital Signal Processing"],
      },
      "Creative design",
      "JavaScript",
    ],
    description: (
      <>
        <p>
          {`In the fall semester of 2023, I took a computer science elective class called Computational Sound. In it, I got to learn all about how computers are used to make sounds and music, from audio recording to digital signal processing, to acoustic effects, to algorithmic composition, to live coding and more. In a homework assignment for the class, we were asked to do physical modeling of a sound: thinking about the physical motion which emits the pressure wave of a real-world sound (like a babbling brook or a snapping branch) and recreating said sound using digital audio synthesis. During this assignment, I thought it would've been really convenient to have a tool where I could quickly draw a sound wave and hear what it would sound like, rather than doing all the work of programming one, only to have it sound different than I expected. I was also curious what different wave shapes - like a half-sine-wave, half-square-wave - would sound like, and such a tool would make it easy to find out. Since I couldn't find anything online that did what I was looking for, I decided to make it myself.`}
        </p>
        <p>
          {`Sonic Canvas is pretty fun to use - you should try it `}
          <FillingLink href="/waves">here</FillingLink>
          {`. It starts by taking the pixel-based points plotted by the user's drawing and converting them to an audio wave. To ensure a smooth transition between repetitions of the wave, whatever the user draws is virtually rotated (using the standard two-dimensional rotation matrix without scaling) to treat the start an end as both having a signal of 0, with the shape of the wave remaining unchanged. To convert this set of points in two dimensions into a one-dimensional WebAudio audio buffer source, I linearly interpolate between points whose x-values differ by more than 1. If the x-values double back and start decreasing, they're ignored until new x-values are seen. Conveniently, a typical modern screen's pixel density is such that sound waves formed this way from a drawing in a browser played back at a sample rate of 44.1 kHz typically have an audible and pleasant pitch (even if the timbre is a bit abrasive). The drawing is then animated to show the new sound wave, the audio is played, and then the audio fades out as the drawing leaves the screen. To allow multiple sounds to play at once, the audio buffers, sources, and their associated gain nodes are placed in a circular array, with the non-reusable buffer sources re-instantiated on their array index's reuse.`}
        </p>
        <p>
          {`While working on this project, I though that another interesting direction it could go in would be as a tool giving fine control over shaping the wave, really allowing users to dial in a particular shape and sound, then download it to use as a sample. While I think that would be super cool functionality built into a synthesizer (maybe even a way to draw an entire wavetable...), after hearing the types of sounds that came out of my drawings, I decided that I wanted to keep the feel of this project a little more creative and less serious. I really liked how approachable and low-stakes it felt to have the waves dance off the screen and erase the text in the center, and it was fun to see my friends who knew nothing about the sounds of different wave shapes try things like drawing their signatures or self-portraits to see how they would sound.`}
        </p>
      </>
    ),
  },
  {
    id: "spyglass",
    title: "Spyglass",
    subtitle:
      "An application for monitoring and validating SCTE-35 cues in MPEG-DASH and HLS video streams to ensure proper advertisement placement",
    image: { src: "/img/spyglass.webp", width: 1200, height: 800 },
    skills: [
      {
        label: "Digital video",
        children: [
          "OTT video streaming",
          "ABR streaming (HLS and MPEG-DASH protocols)",
          "Low-level video encoding and compression (YCbCr and chroma subsampling, motion estimation, DCT, video codecs, etc.)",
          "AWS Media Content Distribution Suite (MediaLive, MediaStore, MediaConnect, etc.)",
        ],
      },
      "SCTE-35 protocol",
      "Dynamic Ad Insertion",
      "AWS DynamoDB SDK and database design",
      "Docker and Kubernetes",
      "GraphQL",
      "JavaScript and React",
      "Python and Flask",
    ],
    description: (
      <>
        <p>
          {`For my second big project as a Software Engineer Intern at Paramount, I was tasked with creating an application for ensuring that SCTE-35 cue messages are properly inserted into HLS and MPEG-DASH video streams. All of my team's apps have a nautical-themed title, so we decided to call this Spyglass, since that's what a pirate uses to look ahead see what's approaching before they reach it. The application started as a stripped-down version of another app that my team had built with a similar architecture, containing only the bare essentials to deploy with Docker and our CI/CD framework. I began by creating a Python/Flask backend to take in and parse encoded SCTE messages. To determine which sections of cue messages were necessary to consider given the project's goal of improving advertisement placement, I read (skimmed) through the 100+ page `}
          <FillingLink href="https://www.scte.org/standards/library/catalog/scte-35-digital-program-insertion-cueing-message/" external newTab>SCTE-35 standard</FillingLink>
          {`. I then wrote code to verify and log the validity of incoming cues in an AWS DynamoDB, which required some thinking about how to design the data structure containing this information to allow for efficient lookup, and unit tests to make the application easier for my team to maintain after my internship ends. Because I was able to finish this project a couple weeks before my internship ended, I had the opportunity to integrate it with my team's main frontend monitoring system, a Next.js app using GraphQL. To do so, I created GraphQL queries to retrieve networks' logged cues, then displayed them in a React table, and added the ability for users to filter by date, time, and substring match.`}
        </p>
        <p>
          {`This project offered a ton of learning opportunities, both relating to the tools used to create it, and to digital video in general. For example, while debugging, I learned all about Docker and Kubernetes, which my team used to deploy all of our interconnected apps. I also wanted to take advantage of my time being on a team that focused on video distribution and delivery for the summer and learn all that I could about digital video. My great mentors shared lots of resources with me, and I spent a lot of time reading about and discussing all aspects of digital video, from how cameras work to encoding and compression to distribution to digital displays.`}
        </p>
      </>
    ),
  },
  {
    id: "syllablegpt",
    title: "SyllableGPT",
    subtitle:
      "A generative large language model based on GPT, modified so that it tends to generate words with matching vowel sounds and rhyming syllables for better performance in writing poetry and song lyrics",
    image: { src: "/img/syllablegpt.jpg", width: 2000, height: 1000 },
    skills: [
      "Large Language Models",
      "HuggingFace Transformers",
      "PyTorch",
      "Python",
    ],
    description: (
      <>
        <p>
          {`When I first got access to ChatGPT, what impressed me the most about it were its responses to prompts asking it to generate poems or song lyrics about a certain topic because of how it was able to rhyme line endings while maintaining a coherent message. However, it soon became apparent that there were some major limitations in ChatGPT's songwriting ability, and I had some ideas about how to improve it that I wanted to test out. For one, ChatGPT really likes to start verses with the words "listen up," which leads to some repetitive lyric generation across themes. More importantly, however, is that ChatGPT typically only rhymes words at the end of consecutive lines. While this is still very impressive at first, it doesn't really reflect how song lyrics typically rhyme, where throughout multiple lines words are connected by rhymes and matching vowel sounds that can stretch across multiple consecutive syllables. My first idea for a way to improve upon this was to fine-tune a GPT model by training it on a dataset of song lyrics. The GPT model that I used as a starting point was OpenAI's GPT-2, a predecessor to ChatGPT, which I chose because HuggingFace has a version of it's language modeling head available that is well-documented and something I could run on my own laptop.`}
        </p>
        <p>
          {`I then decided to try adding logic to the decoder that further boosts the number of internal rhymes generated by rescoring words during generation to boost the score of words that rhyme with what has already been generated. When a GPT model does language modeling to generate text, it generates new words one at a time by (essentially) assigning each word a probability that it gets generated next. SyllableGPT adds to the pre-probability scores of the most likely words for each of the internal rhymes and matching syllables they share with what has already been generated. To do this, it uses `}
          <FillingLink href="/projects#rhymenet">RhymeNet</FillingLink>
          {`, a previous project of mine. It also generates a "likely vocabulary" of what it expects to be generated in the future based on what it has already, and rescores words to a lower degree based on matches with the likely future vocabulary. In the future, I'd like to try implementing similar logic on a larger and more advanced language model in the hope of achieving more coherent results. I'd also like to figure out a way to work similar rhyme-generating functionality directly into the decoder logic in a way that can be trained directly with backpropagation. You can find the code for this project and try out SyllableGPT for yourself `}
          <FillingLink href="https://github.com/stevenwinnick/SyllableGPT" external newTab>here</FillingLink>
          {`.`}
        </p>
      </>
    ),
  },
  {
    id: "foghorn",
    title: "Foghorn API",
    subtitle:
      "A tool for Software Engineers at Paramount to easily log messages to a unified location and recieve Slack alerts when sections of code are executed",
    image: { src: "/img/foghorn.jpg", width: 1024, height: 680 },
    preview: {
      image: { src: "/img/foghornSquare.jpg", width: 680, height: 680 },
      blurb:
        "A tool for easily logging messages and recieving Slack notifications when sections of code are executed.",
    },
    skills: [
      "A variety of AWS Cloud Services (Lambda, API Gateway, IAM, CloudWatch, CloudFormation)",
      "Designing and creating a secure access management system",
      "Deploying Infrastructure as Code with the Serverless Framework",
      "GitHub Workflows for automatic deployment to development, QA, and production environments",
      "External API integration (Slack API)",
      "JavaScript",
      "Python",
    ],
    description: (
      <p>{`For my first project as a Software Engineer Intern at Paramount, I was tasked with creating an eagerly-requested API that would allow developers to easily log messages to a unified location when sections of their code were run. To do this, I created an API using AWS Lambda functions that would interact with CloudWatch to log messages. I then added functionality allowing engineers to send these messages to Slack by integrating with Slack's API. Because the rest of my team's tools were named to followed a nautical theme and this can be used for sending alerting notifications, we named this Foghorn. To deploy Foghorn, I learned how to use the Serverless Framework, which made it simple to deploy development and production versions without directly interacting with the AWS console.`}</p>
    ),
  },
  {
    id: "rhymenet",
    title: "RhymeNet",
    subtitle:
      "An English language database containing information about both words' phoenetic and written syllable divisions",
    image: { src: "/img/rhymesHighlighted.jpg", width: 1280, height: 720 },
    preview: {
      image: {
        src: "/img/rhymesHighlightedSquare.jpg",
        width: 720,
        height: 720,
      },
      blurb:
        "An English language database containing information about words' phoenetic and written syllable divisions.",
    },
    skills: [
      "Database design and creation",
      "Linguistic theory (phonemes, syllabization, consonant clustering)",
      "Data intake, cleaning, and preprocessing",
      "Python",
    ],
    description: (
      <p>
        {`As part of my music analysis work, I had the idea to analyze song lyrics through the lens of word sounds, as opposed to something like lyrical content. When starting this project, I realized that no dataset existed parsing lyrics by sound and decided to create one for myself. I also thought that a network connecting words by their shared sounds would be useful both for this project and potentially other related ones, which ended up becoming RhymeNet. To create this database, I started with the `}
        <FillingLink href="http://www.speech.cs.cmu.edu/cgi-bin/cmudict" external newTab>CMU Pronouncing Dictionary</FillingLink>
        {`, which contains the sounds/phonemes used to pronounce over 134,000 words. Because syllable divisions are so important in song lyrics, I created an algorithm to automatically parse these phoenetic pronunciations of words into syllables based on the linguistic theory of `}
        <FillingLink href="https://www.tandfonline.com/doi/abs/10.1080/00437956.1978.11435661" external newTab>{`"greedy onset clustering"`}</FillingLink>
        {` and added sections of the network connecting words by their shared syllables, vowel sounds, and rhyming endings. You can download RhymeNet `}
        <FillingLink href="https://github.com/stevenwinnick/RhymeNet" external newTab>here</FillingLink>
        {`.`}
      </p>
    ),
  },
  {
    id: "sheepshead",
    title: "Sheepshead AI",
    subtitle: (
      <>
        {`During our Spring Break, my friend `}
        <FillingLink href="https://www.linkedin.com/in/adam-strupp-51b82319a/" external newTab>Adam</FillingLink>
        {` and I built a simulator of our favorite card game, Sheepshead, then trained an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning`}
      </>
    ),
    image: { src: "/img/royalFlush.jpg", width: 1002, height: 668 },
    preview: {
      image: { src: "/img/royalFlushSquare.jpg", width: 668, height: 668 },
      blurb:
        "A simulator of my favorite card game, Sheepshead, and an AI to play it using Monte Carlo Simulation and Deep Reinforcement Learning.",
    },
    skills: [
      "AI game playing",
      "Deep Reinforcement Learning",
      "Monte Carlo Simulation",
      "TensorFlow",
      "Python",
    ],
    description: (
      <p>
        {`Whenever I'm home from college, my friends and I get together to play `}
        <FillingLink href="https://en.wikipedia.org/wiki/Sheepshead_(card_game)" external newTab>Sheepshead,</FillingLink>
        {` a strategy- and memory-based card game. On one of these nights, someone brought up the idea of building a website where we would be able to play together while living at colleges over 1,000 miles apart, which spawned the idea of trying to build a bot that could beat us. During Spring Break 2023, my friend `}
        <FillingLink href="https://www.linkedin.com/in/adam-strupp-51b82319a/" external newTab>Adam</FillingLink>
        {` and I decided to tackle the challenge. We started by mapping out on paper how we would model the game, then built that model in Python. The model included a player class, who would be able to take their turn by selecting from a list of allowed plays. Then, we were able to train the AI to play by simulating millions of games with other bot players. It works by evalutating all allowed moves and deciding after which one it has the highest chance of winning, based on it's training data. Using deep reinforcement learning, it is even able to generalize and make predictions in situations that it hasn't seen before. After a certain number of training episodes, we update the other bots the AI is simulated against to match the AI's current decision-making, increasing the strength of it's competition and forcing the bot to make smarter plays. You can find our code `}
        <FillingLink href="https://github.com/stevenwinnick/Sheepshead" external newTab>here</FillingLink>
        {`.`}
      </p>
    ),
  },
  {
    id: "midi-interpreter",
    title: "MIDI Interpreter",
    subtitle:
      "A program allowing me to customize the inputs programs interpret from my MIDI keyboard so I can use it for keyboard shortcuts",
    image: { src: "/img/midiKeyboard.jpg", width: 2560, height: 1707 },
    skills: [
      "Linux Kernel",
      "Operating Systems",
      "Low-level electronic hardware",
      "AppleScript",
    ],
    description: (
      <p>
        {`In my free time, I love to make music with my MIDI keyboard. I always found it strange, though, that my keyboard had buttons that weren't used by the music creation software it came bundled with, and that the same software had QWERTY keyboard shortcuts that weren't playable with my MIDI one. To rectify this, I found software that would let me see the exact inputs my laptop was registering when I pressed different buttons on my keyboard, then created scripts so that my computer would reinterpret those buttons as QWERTY keys before they were registered by the music software. The code will work for anyone with the same keyboard, and can be found `}
        <FillingLink href="https://github.com/stevenwinnick/SessionViewMIDI" external newTab>here</FillingLink>
        {` along with instructions for using it.`}
      </p>
    ),
  },
  {
    id: "image-captioner",
    title: "Image Captioner",
    subtitle:
      "For the final project for my Natural Language Processing class, I built an image caption generator",
    image: { src: "/img/towerOfBabel.jpg", width: 1200, height: 878 },
    skills: [
      "Computer Vision with CNNs",
      "Stacked/Deep Bidirectional Recurrent Neural Networks",
      "Generative Language Models (GPT, Transformers)",
      "GCP Deep Learning VM",
      "PyTorch",
      "Python",
    ],
    description: (
      <p>{`For the final project for my Natural Language Processing class, I built an image caption generator. This project combined many of the concepts we'd learned about in the class with ideas from Computer Vision. It began with a pre-trained CNN that constructed a vector encoding representation of images. These were then fed as inputs into a generative language model of stacked BiRNNs, which at each step output the probabilities of each word in the training dictionary being the next word in the caption. I then implemented a Beam Search algorithm to output the most likely caption.`}</p>
    ),
  },
  {
    id: "walking-robot",
    title: "Walking Robot",
    subtitle: "A built-from-scratch robot made as part of Columbia's Robotics Studio",
    image: { src: "/img/walkingRobotRender.jpg", width: 2048, height: 1536 },
    skills: [
      "Robotic Movement",
      "Solidworks",
      "Combining 3D printing with purchased hardware",
      "Electronics and Soldering",
      "Ubuntu and Bash scripting",
      "Python",
    ],
    description: (
      <p>
        {`As part of Columbia's Robotics Studio, I built a walking robot. Nicknamed the "Trice-Robot," this triceratops-fossil-shaped robot started as a hand-sketched design, which `}
        <FillingLink href="https://www.linkedin.com/in/yuting-li-3a0244220" external newTab>Rex Li</FillingLink>
        {` and I then modeled in its entirety in SolidWorks, down to every last screw and insert. After 3D-printing and assembling the robot, we cut up and soldered cables to wire the electronics and installed an onboard computer. We used Bash scripts to configure the computer to send us an email with it's IP Address upon startup, allowing us to control our robot remotely with an SSH connection. I did some `}
        <FillingLink href="https://en.wikipedia.org/wiki/Inverse_kinematics#Numerical_solutions_to_IK_problems" external newTab>math</FillingLink>
        {` to figure out how to rotate the servo motors to give us a smooth walking path, then wrote some error-handling code to control all 8 servos simultaneously and let our robot walk.`}
      </p>
    ),
  },
  {
    id: "neural-network",
    title: "Neural Network",
    subtitle:
      "To gain a better understanding of deep learning, I built a neural network from scratch",
    image: { src: "/img/neuralNetwork.jpg", width: 1024, height: 768 },
    skills: [
      "Neural networks and deep learning",
      "Numpy and Pandas",
      "Other machine learning methods (k-nearest neighbors, k-means, decision trees, support vector machines)",
      "Python",
    ],
    description: (
      <p>
        {`After my tech strategy internship ended, I wanted to get a deeper understanding of deep learning, specifically neural networks and how they work, so I built one from scratch using Python. My neural net uses a sigmoid activation function for an added computational challenge and manually calculates and applies partial derivatives for backpropagation. It can also scale to contain any number of hidden layers, each of any size, that it is initialized with, and accepts both batches and individual inputs. You can find the code for this project `}
        <FillingLink href="https://github.com/stevenwinnick/DeepLearningNeuralNetworkFromScratch" external newTab>here</FillingLink>
        {`.`}
      </p>
    ),
  },
  {
    id: "paramount-tech-strategy",
    title: "Tech Strategy Internship",
    subtitle:
      "During the summer of 2022, I was an intern at Paramount on the Technology Strategy team",
    image: { src: "/img/paramountLogo.jpg", width: 1200, height: 627 },
    skills: [
      "Innovation strategy",
      "SAFe Agile",
      "Presentations",
      "Effective office communication",
      "Research and information synthesis",
    ],
    description: (
      <p>
        {`Over the summer, I had the very cool opportunity to intern at `}
        <FillingLink href="https://www.paramount.com" external newTab>Paramount</FillingLink>
        {` as part of the Tech Strategy team. As the team's Innovation Intern, my work primarily revolved around defining the innovation strategy for the Paramount+ and PlutoTV streaming apps. Using thorough research, I was able to assist with evaluating potential R&D initiatives and craft recommendations for tech innovation schemes. Later in the summer, I got to see some of my proposals through by joining a cross-functional team that worked to streamline the process for receiving executive buy-in for experimental projects. I was even asked to present some of my recommendations to the Paramount Streaming CTO, which was a great experience. After my internship ended, work continued on this project by my team at Paramount continuing to build processes based on information we had researched together. I was super excited to hear about the company hackathon that happened when I was back in school, which had over 400 participants, and especially that several of the ideas from the hackathon had continued to receive support and be built out into new Paramount streaming features.`}
      </p>
    ),
  },
  {
    id: "sonar",
    title: "Sonar Internship",
    subtitle:
      "After my first year of college, I was a Product Manager and Software Engineer intern at Sonar, a digital health startup",
    image: { src: "/img/sonarPhoto.jpg", width: 1920, height: 1600 },
    skills: [
      "Product Management",
      "Competitive analysis",
      "Web scraping",
      "Figma",
      "Numpy, Pandas, Django",
      "Python",
    ],
    description: (
      <p>
        {`As a Product Manager intern at `}
        <FillingLink href="https://www.sonarhealth.co" external newTab>Sonar</FillingLink>
        {`, I worked under the guidance of a team of medical experts from Columbia's Medical School to create specifications for some of the app's core features, which provide users with detailed information about specific aspects of their health. I then worked cross-functionally to guide design and engineering teams in building out these features and others. As a backend software engineer, I was able to build out some of the features I defined while learning about the software development process. Since Sonar's launch on the app store, it's been great to see that features of the app I helped build are now adding value to people's lives, especially as a user of the app myself. `}
      </p>
    ),
  },
  {
    id: "this-website",
    title: "This Website",
    image: { src: "/img/websiteScreenshot.png", width: 2880, height: 1638 },
    skills: ["HTML and CSS", "JavaScript", "Bootstrap", "Design with Figma"],
    description: (
      <p>
        {`Rather than using a template to build my website, I decided to learn how to do it myself and use it as an opportunity to showcase my design ability. This site is built with `}
        <FillingLink href="https://getbootstrap.com/docs/5.2/getting-started/introduction/" external newTab>Bootstrap 5</FillingLink>
        {` and fully responsive, so it should display nicely on all screen sizes and types (but if something is broken, I'd really appreciate it if you could let me know via the `}
        <FillingLink href="/contact">contact</FillingLink>
        {` page). I think it turned out pretty well, don't you? :)`}
      </p>
    ),
  },
];

export const PREVIEWED_PROJECTS: PreviewedProject[] = PROJECTS.filter(
  (project): project is PreviewedProject => project.preview !== undefined,
);
