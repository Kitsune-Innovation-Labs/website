/**
 * ShinyText — ReactBits-style animated sheen sweeping across the text.
 */
export default function ShinyText({ children, className = "" }) {
  return <span className={`shiny-text ${className}`}>{children}</span>;
}
