import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/server/contact";

export default function ContactForm() {
  const send = useServerFn(sendContactEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setStatus("sent");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="bento bento-feature grain flex flex-col items-start gap-3">
        <CheckCircle2 className="h-8 w-8 text-[color:var(--accent-lime)]" />
        <h3 className="font-display text-3xl">Message received.</h3>
        <p className="text-sm text-foreground/70">
          I'll get back to you within 24 hours. In the meantime — feel free to{" "}
          <a
            href="https://www.linkedin.com/in/abir-abbas"
            target="_blank"
            rel="noreferrer"
            className="text-[color:var(--accent-teal)] underline-offset-4 hover:underline"
          >
            connect on LinkedIn
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
        >
          ← Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bento bento-feature grain flex flex-col gap-4">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          // Get in touch
        </span>
        <h3 className="mt-2 font-display text-3xl leading-tight md:text-4xl">
          Start a <em className="text-[color:var(--accent-teal)]">conversation</em>.
        </h3>
        <p className="mt-1 text-sm text-foreground/60">
          Hiring, partnership, or a wild idea — I read everything.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" name="name" required maxLength={100} />
        <Field label="Email" name="email" type="email" required maxLength={255} />
      </div>
      <Field label="Company (optional)" name="company" maxLength={150} />
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          Message
        </label>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-[color:var(--accent-teal)]/60 focus:outline-none focus:ring-1 focus:ring-[color:var(--accent-teal)]/40"
          placeholder="What are you building? What's the timeline?"
        />
      </div>

      {error && (
        <p className="text-xs text-[color:var(--accent-amber)]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[color:var(--accent-teal)] px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[color:var(--ink)] transition hover:gap-3 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-[color:var(--accent-teal)]/60 focus:outline-none focus:ring-1 focus:ring-[color:var(--accent-teal)]/40"
      />
    </div>
  );
}
