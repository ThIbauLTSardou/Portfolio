import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let dotX = ringX;
    let dotY = ringY;
    let raf;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onEnter = () => {
      dot.classList.add("hover");
      ring.classList.add("hover");
    };

    const onLeave = () => {
      dot.classList.remove("hover");
      ring.classList.remove("hover");
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
