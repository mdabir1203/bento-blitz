import { useEffect, useRef, useState, type ReactNode } from "react";
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
  style?: MotionStyle;
}

/**
 * Cards that tilt to follow the cursor in 3D, lift on hover,
 * and fade-up on enter. On touch devices, tap-and-drag tilts the card
 * and it eases back when released — no hover required.
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Softer tilt on touch so taps don't feel jarring.
  const effective = isTouch ? Math.min(intensity, 6) : intensity;

  const rx = useSpring(useTransform(my, [0, 1], [effective, -effective]), {
    stiffness: 180,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-effective, effective]), {
    stiffness: 180,
    damping: 18,
  });

  const setFromPoint = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((clientX - r.left) / r.width);
    my.set((clientY - r.top) / r.height);
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
      // Pointer events cover mouse + touch + pen.
      onPointerMove={(e) => {
        // Only react to hovering mouse, or active touch/pen contact.
        if (e.pointerType === "mouse" || e.pressure > 0 || e.buttons > 0) {
          setFromPoint(e.clientX, e.clientY);
        }
      }}
      onPointerDown={(e) => setFromPoint(e.clientX, e.clientY)}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerLeave={reset}
      style={
        {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          touchAction: "pan-y",
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
