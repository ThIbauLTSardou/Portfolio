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

export function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    // Apparition après le header
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 2.4 }
    );

    // Se cache quand on est dans le header, réapparaît après
    ScrollTrigger.create({
      start: "top top",
      end: "90vh top",
      onLeave: () => gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.3 }),
      onEnterBack: () => gsap.to(navRef.current, { y: -60, opacity: 0, duration: 0.3 }),
    });
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <a className="navbar_logo" href="#">TS</a>
      <ul className="navbar_links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="navbar_link">{l.label}</a>
          </li>
        ))}
      </ul>
      <a href="mailto:thibaultsardou2@gmail.com" className="navbar_cta">Contact</a>
    </nav>
  );
}
