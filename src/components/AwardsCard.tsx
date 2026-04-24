import { Trophy, Award, ArrowUpRight } from "lucide-react";

const awards = [
  {
    event: "Redis Side Quest",
    project: "RedAGPT",
    note: "Network Security Agents",
    badge: "Winner",
    tone: "lime" as const,
    href: "#",
  },
  {
    event: "MIT Hacknation 2026",
    project: "SmartSwap",
    note: "Next Best Project",
    badge: "Finalist",
    tone: "amber" as const,
    href: "#",
  },
];

const toneClass = {
  lime: "text-[color:var(--accent-lime)] border-[color:var(--accent-lime)]/30 bg-[color:var(--accent-lime)]/10",
  amber: "text-[color:var(--accent-amber)] border-[color:var(--accent-amber)]/30 bg-[color:var(--accent-amber)]/10",
} as const;

export default function AwardsCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          // Hackathon Wins
        </span>
        <Trophy className="h-4 w-4 text-[color:var(--accent-amber)]" />
      </div>
      <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-2">
        {awards.map((a) => (
          <a
            key={a.project}
            href={a.href}
            className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div>
              <div
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${toneClass[a.tone]}`}
              >
                <Award className="h-2.5 w-2.5" /> {a.badge}
              </div>
              <h4 className="mt-3 font-display text-2xl leading-tight">
                {a.project}
              </h4>
              <p className="mt-1 text-xs text-foreground/60">{a.note}</p>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
              <span>{a.event}</span>
              <ArrowUpRight className="h-3 w-3 transition group-hover:text-foreground" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
