import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Contact | Steven Winnick",
};

const LABEL_CLASSES =
  "flex lines-1 items-end font-header text-xs font-semibold uppercase tracking-header";

const INPUT_CLASSES =
  "w-full border border-blue bg-white px-half-line text-sm text-blue placeholder:text-blue/50";

const HINT_CLASSES = "flex lines-1 items-end text-xs";

export default function ContactPage() {
  return (
    <section className="page-grid gap-y-line pb-2line">
      <PageHeading>Contact</PageHeading>

      <p className="col-main min-rows-1 text-sm">
        Want to sell me something?
        <br />
        Want me to apply for something?
        <br />
        Want to show me something funny?
        <br />
        Fill out this form to send me a message!
      </p>

      <form
        action="https://formspree.io/f/mdojyrgj"
        method="post"
        className="col-main flex flex-col gap-line"
      >
        <div>
          <label htmlFor="name" className={LABEL_CLASSES}>
            Your name
          </label>
          <input
            type="text"
            className={`${INPUT_CLASSES} lines-2`}
            id="name"
            name="name"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="_replyto" className={LABEL_CLASSES}>
            Email
          </label>
          <input
            type="email"
            className={`${INPUT_CLASSES} lines-2`}
            id="_replyto"
            name="_replyto"
            aria-describedby="emailHelp"
            placeholder="email@gmail.com"
          />
          <small id="emailHelp" className={HINT_CLASSES}>
            Optional. I promise I won&apos;t sign you up for any spam email
            lists.
          </small>
        </div>

        <div>
          <label htmlFor="phone" className={LABEL_CLASSES}>
            Phone number
          </label>
          <input
            type="text"
            className={`${INPUT_CLASSES} lines-2`}
            id="phone"
            name="phone"
            placeholder="(555) 555-5555"
          />
          <small className={HINT_CLASSES}>
            Optional. I might sell your number to spam call lists.
          </small>
        </div>

        <div>
          <label htmlFor="message" className={LABEL_CLASSES}>
            Message
          </label>
          <textarea
            className={`${INPUT_CLASSES} lines-6 py-half-line`}
            id="message"
            name="message"
            placeholder="Your message"
            required
          />
        </div>

        <button
          type="submit"
          className="lines-2 self-start border border-blue px-line font-header text-h3 font-semibold uppercase tracking-header fill-on-hover"
        >
          Send
        </button>
      </form>
    </section>
  );
}
