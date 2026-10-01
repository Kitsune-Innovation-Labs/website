/**
 * BorderBeam — ReactBits-style animated gradient border.
 * A pastel beam sweeps around the border ring of its container.
 */
export default function BorderBeam({
  className = "",
  from = "#8FBEEC",
  to = "#F0B6CC",
  duration = 6,
  borderWidth = 1.5,
}) {
  return (
    <div
      className={`border-beam ${className}`}
      style={{
        "--beam-from": from,
        "--beam-to": to,
        "--beam-duration": `${duration}s`,
        "--beam-border-width": `${borderWidth}px`,
      }}
      aria-hidden
    />
  );
}
