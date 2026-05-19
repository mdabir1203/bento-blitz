import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A massive, blurred, GPU-melting cursor-follow aura.
 * Sits fixed behind content, dynamically lights the page.
 * On touch devices: follows the most recent tap instead of hover.
 */
export default function CursorAura() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Detect coarse pointer (touch). Still render, but drive via taps.
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const isTouch = mq.matches;
    setEnabled(true);

    const update = (cx: number, cy: number) => {
      x.set(cx);
      y.set(cy);
    };

    if (isTouch) {
      // Center the aura initially so it's visible without interaction.
      update(window.innerWidth / 2, window.innerHeight * 0.35);
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0] ?? e.changedTouches[0];
        if (t) update(t.clientX, t.clientY);
      };
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      return () => {
        window.removeEventListener("touchstart", onTouch);
        window.removeEventListener("touchmove", onTouch);
      };
    }

    const onMove = (e: PointerEvent) => update(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[60vmax] w-[60vmax] rounded-full opacity-60 blur-[120px] mix-blend-screen print:hidden"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.78 0.14 180 / 0.55), oklch(0.92 0.18 125 / 0.18) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
