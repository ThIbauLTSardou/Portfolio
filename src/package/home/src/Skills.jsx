import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// position au milieu du scroll (en %) + direction de traversée
const stack = [
  { name: "React",       icon: `${ICON_BASE}/react/react-original.svg`,          midX: 15,  midY: 18,  dx: 130, dy: 25  },
  { name: "HTML",        icon: `${ICON_BASE}/html5/html5-original.svg`,           midX: 70,  midY: 8,   dx: -120, dy: 40 },
  { name: "CSS",         icon: `${ICON_BASE}/css3/css3-original.svg`,             midX: 40,  midY: 30,  dx: 110, dy: -30 },
  { name: "JavaScript",  icon: `${ICON_BASE}/javascript/javascript-original.svg`, midX: 60,  midY: 72,  dx: -130, dy: -20},
  { name: "Node.js",     icon: `${ICON_BASE}/nodejs/nodejs-original.svg`,         midX: 10,  midY: 55,  dx: 120, dy: -40 },
  { name: "Express",     icon: `${ICON_BASE}/express/express-original.svg`,       midX: 55,  midY: 50,  dx: -110, dy: 50 },
  { name: "PHP",         icon: `${ICON_BASE}/php/php-original.svg`,               midX: 25,  midY: 80,  dx: 100, dy: -60 },
  { name: "Git",         icon: `${ICON_BASE}/git/git-original.svg`,               midX: 75,  midY: 35,  dx: -120, dy: 30 },
  { name: "Figma",       icon: `${ICON_BASE}/figma/figma-original.svg`,           midX: 45,  midY: 88,  dx: 90,  dy: -50 },
  { name: "VS Code",     icon: `${ICON_BASE}/vscode/vscode-original.svg`,         midX: 80,  midY: 60,  dx: -100, dy: -35},
  { name: "Vite",        icon: `${ICON_BASE}/vitejs/vitejs-original.svg`,         midX: 20,  midY: 42,  dx: 115, dy: 55  },
  { name: "Supabase",    icon: `${ICON_BASE}/supabase/supabase-original.svg`,     midX: 65,  midY: 22,  dx: -95, dy: 60  },
  { name: "Claude Code", icon: "https://avatars.githubusercontent.com/u/76263028?s=48", midX: 35, midY: 62, dx: 105, dy: -45 },
  { name: "SCSS",        icon: `${ICON_BASE}/sass/sass-original.svg`,              midX: 50,  midY: 40,  dx: -110, dy: 70 },
  { name: "Bulma",       icon: `${ICON_BASE}/bulma/bulma-plain.svg`,               midX: 18,  midY: 68,  dx: 115, dy: -55 },
];

export function Skills() {
  const sectionRef = useRef(null);
  const chipRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        const { midX, midY, dx, dy } = stack[i];

        // fromX/Y = position au début du scroll (avant), toX/Y = après
        gsap.fromTo(
          chip,
          { left: `${midX - dx / 2}%`, top: `${midY - dy / 2}%` },
          {
            left: `${midX + dx / 2}%`,
            top:  `${midY + dy / 2}%`,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section_skills" ref={sectionRef}>
      <div className="skills_label">Stack technique</div>
      <div className="skills_field">
        {stack.map((item, i) => (
          <div
            key={item.name}
            className="skills_chip"
            ref={(el) => (chipRefs.current[i] = el)}
            style={{ left: `${item.midX - item.dx / 2}%`, top: `${item.midY - item.dy / 2}%`, '--i': i }}
          >
            <div className="skills_chip_eq">
              <span className="skills_chip_bar" style={{'--d':'0s'}} />
              <span className="skills_chip_bar" style={{'--d':'0.2s'}} />
              <span className="skills_chip_bar" style={{'--d':'0.1s'}} />
              <span className="skills_chip_bar" style={{'--d':'0.3s'}} />
              <span className="skills_chip_bar" style={{'--d':'0.15s'}} />
            </div>
            <img src={item.icon} alt={item.name} className="skills_chip_icon" />
            <span className="skills_chip_tooltip">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
