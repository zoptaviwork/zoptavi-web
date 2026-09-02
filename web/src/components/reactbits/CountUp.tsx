import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface CountUpProps {
  to: number;
  from?: number;
  /** seconds */
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Adapted from react-bits "Count Up". Counts from `from` to `to` the first time
 * it scrolls into view. Self-contained (IntersectionObserver + rAF) so it has no
 * animation-library dependency.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    if (prefersReduced()) {
      setValue(to);
      started.current = true;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const t0 = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const p = Math.min((now - t0) / (duration * 1000), 1);
          setValue(from + (to - from) * ease(p));
          if (p < 1) requestAnimationFrame(tick);
          else setValue(to);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
