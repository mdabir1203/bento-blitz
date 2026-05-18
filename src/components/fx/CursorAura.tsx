import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A massive, blurred, GPU-melting cursor-follow aura.
 * Sits fixed behind content, dynamically lights the page.
 */
export default function CursorAura() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

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
