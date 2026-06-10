import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// line: 0-6 (0 et 6 = au-dessus/en-dessous des 5 lignes, 1-5 = sur une ligne)
// fromDir: "top" ou "bottom" = direction d'arrivée au scroll
const stack = [
  { name: "React",       icon: `${ICON_BASE}/react/react-original.svg`,           col: 3,  line: 2, fromDir: "top"    },
  { name: "HTML",        icon: `${ICON_BASE}/html5/html5-original.svg`,            col: 9,  line: 4, fromDir: "bottom" },
  { name: "CSS",         icon: `${ICON_BASE}/css3/css3-original.svg`,              col: 14, line: 1, fromDir: "top"    },
  { name: "JavaScript",  icon: `${ICON_BASE}/javascript/javascript-original.svg`,  col: 19, line: 3, fromDir: "bottom" },
  { name: "Node.js",     icon: `${ICON_BASE}/nodejs/nodejs-original.svg`,          col: 23, line: 4, fromDir: "top"    },
  { name: "Express",     icon: `${ICON_BASE}/express/express-original.svg`,        col: 29, line: 1, fromDir: "bottom" },
  { name: "PHP",         icon: `${ICON_BASE}/php/php-original.svg`,                col: 33, line: 3, fromDir: "top"    },
  { name: "Git",         icon: `${ICON_BASE}/git/git-original.svg`,                col: 37, line: 2, fromDir: "bottom" },
  { name: "Figma",       icon: `${ICON_BASE}/figma/figma-original.svg`,            col: 41, line: 4, fromDir: "top"    },
  { name: "VS Code",     icon: `${ICON_BASE}/vscode/vscode-original.svg`,          col: 46, line: 1, fromDir: "bottom" },
  { name: "Vite",        icon: `${ICON_BASE}/vitejs/vitejs-original.svg`,          col: 50, line: 3, fromDir: "top"    },
  { name: "Supabase",    icon: `${ICON_BASE}/supabase/supabase-original.svg`,      col: 54, line: 2, fromDir: "bottom" },
  { name: "Claude Code", icon: "https://avatars.githubusercontent.com/u/76263028?s=48", col: 58, line: 4, fromDir: "top" },
  { name: "SCSS",        icon: `${ICON_BASE}/sass/sass-original.svg`,              col: 62, line: 1, fromDir: "bottom" },
  { name: "Bulma",       icon: `${ICON_BASE}/bulma/bulma-plain.svg`,               col: 67, line: 3, fromDir: "top"    },
];

// 4 lignes : 2 au-dessus du titre (centré à 50%), 2 en dessous
// On place les lignes à intervalles fixes autour du centre
const LINES_Y = [22, 37, 63, 78]; // % depuis le haut

function getLineY(line) {
  // line 1-4 mapped sur LINES_Y
  return LINES_Y[line - 1];
}

export function Skills() {
  const sectionRef = useRef(null);
  const chipRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      chipRefs.current.forEach((chip, i) => {
        if (!chip) return;
        const { fromDir } = stack[i];
        const offscreen = fromDir === "top" ? "-120vh" : "120vh";

        gsap.fromTo(
          chip,
          { y: offscreen, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 120%",
              end: "top 20%",
              scrub: 1.5,
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

      {/* Portée musicale */}
      <div className="staff_wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="staff_line"
            style={{ top: `${getLineY(i + 1)}%` }}
          />
        ))}

        {/* Clé de sol décorative */}
        <div className="staff_clef">𝄞</div>

        {/* Chips posées sur les lignes */}
        {stack.map((item, i) => {
          const y = getLineY(item.line);
          return (
            <div
              key={item.name}
              className="skills_chip"
              ref={(el) => (chipRefs.current[i] = el)}
              style={{
                left: `${item.col}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img src={item.icon} alt={item.name} className="skills_chip_icon" />
              <div className="skills_chip_stem" />
              <span className="skills_chip_tooltip">{item.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
