import { useEffect, useState } from "react";

const COLORS = ["#8FBEEC", "#F0B6CC", "#5E8FAE", "#E88A5A", "#F5F8FF"];

/**
 * SparkleCursor — ReactBits-style pastel sparkle trail.
 * Small fading dots follow the mouse. Subtle magic, not fireworks.
 */
export default function SparkleCursor({ max = 26, life = 700 }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let id = 0;
    let alive = true;

    const onMove = (e) => {
      if (!alive) return;
      const spark = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 5 + 3,
        dx: (Math.random() - 0.5) * 18,
        dy: (Math.random() - 0.5) * 18,
      };
      setSparkles((s) => [...s.slice(-max), spark]);
      setTimeout(() => {
        if (!alive) return;
        setSparkles((s) => s.filter((sp) => sp.id !== spark.id));
      }, life);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      alive = false;
      window.removeEventListener("mousemove", onMove);
    };
  }, [max, life]);

  return (
    <div className="sparkle-layer" aria-hidden>
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="sparkle"
          style={{
            left: sp.x,
            top: sp.y,
            width: sp.size,
            height: sp.size,
            background: sp.color,
            boxShadow: `0 0 8px ${sp.color}`,
            "--sx": `${sp.dx}px`,
            "--sy": `${sp.dy}px`,
          }}
        />
      ))}
    </div>
  );
}
