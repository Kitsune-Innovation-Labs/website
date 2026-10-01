import { useMemo } from "react";

const COLORS = ["#8FBEEC", "#F0B6CC", "#5E8FAE", "#E88A5A", "#F5F8FF"];

/**
 * Meteors — ReactBits-style pastel shooting stars drifting down the sky.
 * Slow, rare, and subtle — night-den energy, not fireworks.
 */
export default function Meteors({ count = 8 }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${(Math.random() * 100).toFixed(1)}%`,
        y: `${(Math.random() * 55).toFixed(1)}%`,
        delay: `${(Math.random() * 10).toFixed(1)}s`,
        duration: `${(6 + Math.random() * 5).toFixed(1)}s`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 1.5 + 1.5,
      })),
    [count]
  );

  return (
    <div className="meteor-layer" aria-hidden>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            left: m.x,
            top: m.y,
            width: m.size,
            height: m.size,
            background: m.color,
            boxShadow: `0 0 6px ${m.color}`,
            "--meteor-color": m.color,
            "--meteor-delay": m.delay,
            "--meteor-duration": m.duration,
          }}
        />
      ))}
    </div>
  );
}
