import { Quote, Link as LinkIcon } from "lucide-react";

// SCAFFOLD — replace these two with real LinkedIn quotes when you paste them.
const testimonials = [
  {
    quote:
      "Abir delivered our GTM motion in weeks, not quarters. Rare blend of strategist and builder.",
    name: "Wavelink Leadership",
    role: "Co-founder",
    href: "https://www.linkedin.com/in/abir-abbas",
  },
  {
    quote:
      "He turned our payment ops from a bottleneck into a flywheel. 40% faster, immediately.",
    name: "Deep Blue Digital",
    role: "Partner",
    href: "https://www.linkedin.com/in/abir-abbas",
  },
];

export default function TestimonialsCard() {
  // Duplicate for seamless marquee loop
  const loop = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          // From LinkedIn
        </span>
        <LinkIcon className="h-3.5 w-3.5 text-[color:var(--accent-teal)]" />
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden">
        <div className="marquee">
          {loop.map((t, i) => (
            <a
              key={i}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="mr-4 flex w-[320px] shrink-0 flex-col justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div>
                <Quote className="h-4 w-4 text-[color:var(--accent-teal)]" />
                <p className="mt-2 text-sm leading-snug text-foreground/85">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-white/5 pt-2">
                <span className="text-xs font-medium text-foreground/90">{t.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/50">
                  {t.role}
                </span>
              </div>
            </a>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[color:var(--bento)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[color:var(--bento)] to-transparent" />
      </div>
    </div>
  );
}
