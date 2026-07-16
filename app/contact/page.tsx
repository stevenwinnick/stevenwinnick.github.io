import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Contact | Steven Winnick",
};

const INPUT_CLASSES =
  "mt-1 w-full rounded border border-ink/20 bg-cream px-3 py-2 text-ink";

export default function ContactPage() {
  return (
    <section className="px-sm">
      <PageHeading>CONTACT</PageHeading>

      <p className="pt-4 text-center text-sm">
        Want to sell me something?
        <br />
        Want me to apply for something?
        <br />
        Want to show me something funny?
        <br />
        Fill out this form to send me a message!
      </p>

      <div className="flex justify-center py-xl">
        <form
          action="https://formspree.io/f/mdojyrgj"
          method="post"
          className="w-full max-w-md"
        >
          <div className="pb-3">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              className={INPUT_CLASSES}
              id="name"
              name="name"
              placeholder="John Doe"
            />
          </div>

          <div className="pb-3">
            <label htmlFor="_replyto">Email</label>
            <input
              type="email"
              className={INPUT_CLASSES}
              id="_replyto"
              name="_replyto"
              aria-describedby="emailHelp"
              placeholder="email@gmail.com"
            />
            <small id="emailHelp" className="text-xs text-cream/60">
              Optional. I promise I won&apos;t sign you up for any spam email
              lists.
            </small>
          </div>

          <div className="pb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className={INPUT_CLASSES}
              id="phone"
              name="phone"
              placeholder="(555) 555-5555"
            />
            <small className="text-xs text-cream/60">
              Optional. I might sell your number to spam call lists.
            </small>
          </div>

          <div className="pb-3">
            <label htmlFor="message">Message</label>
            <textarea
              className={INPUT_CLASSES}
              id="message"
              name="message"
              rows={3}
              placeholder="Your message"
              required
            />
          </div>

          <div className="flex justify-center pb-3 pt-4">
            <button
              type="submit"
              className="pill text-2xl"
              style={{ ["--accent" as string]: "var(--color-purple)" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
