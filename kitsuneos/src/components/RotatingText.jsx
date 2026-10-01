import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * RotatingText — ReactBits-style rotating word/phrase effect.
 * Props: texts (array), rotationInterval (ms), className.
 */
export default function RotatingText({
  texts = [],
  rotationInterval = 2600,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(id);
  }, [texts, rotationInterval]);

  return (
    <span className={`rotating-text ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rotating-text-inner"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
