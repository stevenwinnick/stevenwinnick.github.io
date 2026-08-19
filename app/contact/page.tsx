import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact | Steven Winnick",
};

const CONTROL_CLASSES =
  "w-full border border-blue bg-white px-half-line text-sm text-blue placeholder:text-blue/50";

/**
 * One field of the form: its label on the line above the control, and its hint,
 * if it has one, on the line below. The hint's height is a floor rather than a
 * line, so that it pushes the field below it down when the text wraps.
 */
function Field({
  name,
  label,
  placeholder,
  type = "text",
  multiline = false,
  hint,
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  multiline?: boolean;
  hint?: string;
  required?: boolean;
}) {
  const hintId = hint ? `${name}-hint` : undefined;

  return (
    <div>
      <label
        htmlFor={name}
        className="flex lines-1 items-end font-header text-xs font-semibold uppercase tracking-header"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          className={`${CONTROL_CLASSES} lines-6 py-half-line`}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          className={`${CONTROL_CLASSES} lines-2`}
          id={name}
          name={name}
          placeholder={placeholder}
          aria-describedby={hintId}
          required={required}
        />
      )}

      {hint && (
        <small id={hintId} className="flex min-h-line items-end text-xs">
          {hint}
        </small>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="page-grid gap-y-line pb-(--grid-row)">
      <PageHeading>Contact</PageHeading>

      <PageIntro>
        Want to sell me something?
        <br />
        Want me to apply for something?
        <br />
        Want to show me something funny?
        <br />
        Fill out this form to send me a message!
      </PageIntro>

      <form
        action="https://formspree.io/f/mdojyrgj"
        method="post"
        className="col-main flex flex-col gap-line"
      >
        <Field name="name" label="Your name" placeholder="John Doe" />

        {/* Formspree replies to whatever address the `_replyto` field holds. */}
        <Field
          name="_replyto"
          label="Email"
          type="email"
          placeholder="email@gmail.com"
          hint="Optional. I promise I won't sign you up for any spam email lists."
        />

        <Field
          name="phone"
          label="Phone number"
          placeholder="(555) 555-5555"
          hint="Optional. I might sell your number to spam call lists."
        />

        <Field
          name="message"
          label="Message"
          placeholder="Your message"
          multiline
          required
        />

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
