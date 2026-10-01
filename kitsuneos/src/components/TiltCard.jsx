import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * TiltCard — ReactBits-style 3D tilt on hover.
 * The card gently rotates toward the cursor, then springs back.
 */
export default function TiltCard({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.1 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.1 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
