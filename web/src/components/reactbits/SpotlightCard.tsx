import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Adapted from react-bits "Spotlight Card": a radial glow that follows the cursor
 * inside a card. Exposed as a hook so it composes with the site's existing
 * `motion` stagger / hover on the card grids.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

/** The glow layer — rendered as the first child of a `.ms-spot-host`. */
export function Spotlight() {
  return <span className="ms-spot" aria-hidden="true" />;
}

/* ---- motion element wrappers that carry the spotlight ---- */

type Spot<E extends keyof HTMLElementTagNameMap> = Omit<HTMLMotionProps<E>, "children"> & {
  children?: ReactNode;
  className?: string;
};

export function SpotlightArticle({ className = "", children, ...rest }: Spot<"article">) {
  const sp = useSpotlight<HTMLElement>();
  return (
    <motion.article
      {...rest}
      ref={sp.ref}
      onMouseMove={sp.onMouseMove}
      onMouseLeave={sp.onMouseLeave}
      className={`ms-spot-host ${className}`.trim()}
    >
      <Spotlight />
      {children}
    </motion.article>
  );
}

export function SpotlightDiv({ className = "", children, ...rest }: Spot<"div">) {
  const sp = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      {...rest}
      ref={sp.ref}
      onMouseMove={sp.onMouseMove}
      onMouseLeave={sp.onMouseLeave}
      className={`ms-spot-host ${className}`.trim()}
    >
      <Spotlight />
      {children}
    </motion.div>
  );
}

export function SpotlightLink({ className = "", children, ...rest }: Spot<"a">) {
  const sp = useSpotlight<HTMLAnchorElement>();
  return (
    <motion.a
      {...rest}
      ref={sp.ref}
      onMouseMove={sp.onMouseMove}
      onMouseLeave={sp.onMouseLeave}
      className={`ms-spot-host ${className}`.trim()}
    >
      <Spotlight />
      {children}
    </motion.a>
  );
}
