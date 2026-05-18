import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-50 h-[2px] w-full bg-gradient-to-r from-[color:var(--accent-teal)] via-[color:var(--accent-lime)] to-[color:var(--accent-amber)] print:hidden"
    />
  );
}
