/**
 * Adapted from react-bits "Shiny Text" — a slow highlight sweep across a label.
 * The animation itself lives in `.ms-shine` (messold-home.css), which also
 * disables it under prefers-reduced-motion.
 */
export default function ShinyText({
  text,
  speed = 6,
  disabled = false,
  className = "",
}: {
  text: string;
  /** seconds per sweep */
  speed?: number;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`ms-shine ${disabled ? "ms-shine--off" : ""} ${className}`.trim()}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}
