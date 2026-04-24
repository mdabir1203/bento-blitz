import { Video, ArrowUpRight, Play } from "lucide-react";

const CHANNEL = "https://www.youtube.com/@wavelinkd";

// Placeholder thumbnails — recruiter sees the visual story even before videos load.
// Replace with real video IDs (https://img.youtube.com/vi/<ID>/hqdefault.jpg) when available.
const videos = [
  { title: "Wavelink — One tap. Zero paper.", duration: "0:42", href: CHANNEL },
  { title: "NFC business cards in action", duration: "1:15", href: CHANNEL },
  { title: "Behind the build", duration: "2:08", href: CHANNEL },
];

export default function YouTubeCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
          // Video Production
        </span>
        <a
          href={CHANNEL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent-teal)] hover:gap-1.5 transition-all"
        >
          <Video className="h-3 w-3" /> @wavelinkd <ArrowUpRight className="h-2.5 w-2.5" />
        </a>
      </div>

      <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
        Stories that <em className="text-[color:var(--accent-teal)]">ship</em>.
      </h3>
      <p className="mt-1 text-xs text-foreground/60">
        Short-form video, scripted & produced in-house.
      </p>

      <div className="mt-4 grid flex-1 gap-2 sm:grid-cols-3">
        {videos.map((v) => (
          <a
            key={v.title}
            href={v.href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-video overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition hover:border-white/15"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur transition group-hover:scale-110 group-hover:bg-[color:var(--accent-teal)]">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-end justify-between">
              <span className="line-clamp-2 text-[10px] leading-tight text-foreground/85">
                {v.title}
              </span>
              <span className="ml-1 shrink-0 rounded bg-black/60 px-1 font-mono text-[9px] text-foreground/80">
                {v.duration}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
