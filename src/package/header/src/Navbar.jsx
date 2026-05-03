import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/navbar.css";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Profil", href: "#section_profil" },
  { label: "Stack", href: "#section_skills" },
  { label: "Réalisations", href: "#section_2" },
];

export function Navbar({ onMusicOpen }) {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 2.4 }
    );

    ScrollTrigger.create({
      start: "top top",
      end: "90vh top",
      onLeave: () => gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.3 }),
      onEnterBack: () => gsap.to(navRef.current, { y: -60, opacity: 0, duration: 0.3 }),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <div className="navbar_wrap" ref={navRef}>
        <nav className="navbar">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="navbar_link">{l.label}</a>
          ))}
        </nav>
      </div>

      <button className="navbar_music_fab" title="Musique" onClick={onMusicOpen}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
        </svg>
      </button>
    </>
  );
}
