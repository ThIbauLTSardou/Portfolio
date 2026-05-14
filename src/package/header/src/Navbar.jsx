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
          <a href="#" className="navbar_logo" aria-label="Accueil">
            <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="navbar_logo_svg">
              <circle cx="110" cy="110" r="104" fill="#FED73C" stroke="#FED73C" strokeWidth="2"/>
              <circle cx="110" cy="110" r="95" stroke="#091403" strokeWidth="1" opacity="0.15"/>
              <circle cx="110" cy="110" r="84" stroke="#091403" strokeWidth="1" opacity="0.12"/>
              <circle cx="110" cy="110" r="73" stroke="#091403" strokeWidth="1" opacity="0.1"/>
              <circle cx="110" cy="110" r="62" stroke="#091403" strokeWidth="1" opacity="0.08"/>
              <circle cx="110" cy="110" r="38" fill="#091403"/>
              <circle cx="110" cy="110" r="5" fill="#FED73C"/>
              <text x="110" y="110" fontFamily="'Vandalust', system-ui" fontSize="34" fontWeight="900" fill="#FED73C" textAnchor="middle" dominantBaseline="central">TS</text>
            </svg>
          </a>
          <div className="navbar_divider"/>
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
