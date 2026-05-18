import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
  id?: string;
  style?: CSSProperties;
}

/**
 * Cards that tilt to follow the cursor in 3D, lift on hover,
 * and fade-up on enter. Over-engineered on purpose.
 */
export default function TiltCard({
  children,
  className,
  delay = 0,
  intensity = 8,
  id,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 180,
    damping: 18,
  });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.2, 0.8, 0.2, 1] as const,
      }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          ...style,
        } as MotionStyle
      }
      className={className}
    >
      <div style={{ transform: "translateZ(0.01px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
