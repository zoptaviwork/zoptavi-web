import { useCallback, useEffect, useRef } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  /** ms */
  duration?: number;
  extraScale?: number;
}

/**
 * Adapted from react-bits "Click Spark" — a fixed, full-viewport canvas that
 * draws a small burst of lines wherever the page is clicked. No layout wrapper.
 */
export default function ClickSpark({
  sparkColor = "#a163d6",
  sparkSize = 9,
  sparkRadius = 14,
  sparkCount = 8,
  duration = 420,
  extraScale = 1,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;
        const eased = easeOut(t);
        const dist = eased * sparkRadius * extraScale;
        const len = sparkSize * (1 - eased);
        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);
        ctx.strokeStyle = sparkColor;
        ctx.globalAlpha = 1 - eased;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, extraScale]);

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (prefersReduced()) return;
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          start: now,
        });
      }
    },
    [sparkCount]
  );

  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [onClick]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
