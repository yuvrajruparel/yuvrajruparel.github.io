import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which section crosses the upper-middle band of the viewport.
 * `jumpTo` scrolls almost instantly and marks the clicked section active right away.
 */
export function useScrollSpy<T extends string>(ids: readonly [T, ...T[]]) {
  const firstId = ids[0];
  const lastId = ids[ids.length - 1] as T;
  const [active, setActive] = useState<T>(firstId);
  const lockUntil = useRef(0);

  useEffect(() => {
    const visible = new Set<string>();
    const pick = () => {
      if (Date.now() < lockUntil.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(lastId);
      if (window.scrollY < 8) return setActive(firstId);
      const first = ids.find((id) => visible.has(id));
      if (first) setActive(first);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        pick();
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && Date.now() >= lockUntil.current) setActive(lastId);
      else if (window.scrollY < 8 && Date.now() >= lockUntil.current) setActive(firstId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, firstId, lastId]);

  const jumpTo = useCallback((id: T) => {
    lockUntil.current = Date.now() + 250;
    setActive(id);
    if (id === firstId) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [firstId]);

  return { active, jumpTo };
}
