import { useEffect, useRef, useState } from "react";
import "../styles/loading.css";

const IMAGES = [
  "/img/harman.png",
  "/img/ivy.png",
  "/img/delattre.png",
  "/img/dgac.png",
  "/img/mmi.png",
  "/img/1.png",
  "/img/2.png",
];

const ROTATIONS = [-18, 12, -8, 22, -14, 6, -20];
const OFFSETS = [
  { x: -30, y: -20 },
  { x: 20, y: 25 },
  { x: -15, y: 10 },
  { x: 35, y: -15 },
  { x: -25, y: 30 },
  { x: 10, y: -25 },
  { x: -10, y: 15 },
];

// 0→1s apparition | pause 0.6s | 1.6→2.6s disparition | fin = dès dernière image disparue
const TOTAL_DURATION  = 2600;
const APPEAR_DURATION = 1000;
const PAUSE_DURATION  = 1000;
const DISAPPEAR_START = APPEAR_DURATION + PAUSE_DURATION; // 1600
const DISAPPEAR_DURATION = 1000;

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [hiddenImages, setHiddenImages] = useState([]);
  const [hidden, setHidden] = useState(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const appearInterval  = APPEAR_DURATION  / IMAGES.length;
    const disappearInterval = DISAPPEAR_DURATION / IMAGES.length;

    IMAGES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, i]);
      }, i * appearInterval);

      const reverseI = IMAGES.length - 1 - i;
      setTimeout(() => {
        setHiddenImages((prev) => [...prev, i]);
      }, DISAPPEAR_START + reverseI * disappearInterval);
    });

    // i=0 a reverseI=6, donc disparaît en dernier
    const lastDisappearAt = DISAPPEAR_START + (IMAGES.length - 1) * disappearInterval;
    setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, lastDisappearAt + 250);

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const pct = Math.min(Math.floor((elapsed / TOTAL_DURATION) * 100), 100);
      setProgress(pct);

      if (elapsed < TOTAL_DURATION) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className="ls-overlay">
      <div className="ls-center">
        <div className="ls-images-stack">
          {IMAGES.map((src, i) => {
            const baseTransform = `rotate(${ROTATIONS[i]}deg) translate(${OFFSETS[i].x}px, ${OFFSETS[i].y}px)`;
            return (
              <img
                key={i}
                src={src}
                alt=""
                className={`ls-img ${visibleImages.includes(i) ? "ls-img--visible" : ""} ${hiddenImages.includes(i) ? "ls-img--hidden" : ""}`}
                style={{ "--ls-base-transform": baseTransform }}
              />
            );
          })}
        </div>

        <h1 className="ls-title">Portfolio</h1>

        <span className="ls-counter">{String(progress).padStart(3, "0")}</span>
      </div>
    </div>
  );
}
