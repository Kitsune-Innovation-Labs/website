import { useMemo } from "react";

const COLORS = ["#F5F8FF", "#8FBEEC", "#F0B6CC", "#E88A5A", "#5E8FAE"];

/**
 * TwinklingStars — ReactBits-style gently pulsing stars across the night sky.
 */
export default function TwinklingStars({ count = 26 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${(Math.random() * 100).toFixed(1)}%`,
        y: `${(Math.random() * 100).toFixed(1)}%`,
        delay: `${(Math.random() * 4).toFixed(1)}s`,
        duration: `${(2.5 + Math.random() * 3.5).toFixed(1)}s`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 2 + 1.5,
      })),
    [count]
  );

  return (
    <div className="twinkle-layer" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="twinkle"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            "--twinkle-delay": s.delay,
            "--twinkle-duration": s.duration,
          }}
        />
      ))}
    </div>
  );
}
