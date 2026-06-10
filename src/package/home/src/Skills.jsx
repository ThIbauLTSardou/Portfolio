import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// line: 0-6 (0 et 6 = au-dessus/en-dessous des 5 lignes, 1-5 = sur une ligne)
// fromDir: "top" ou "bottom" = direction d'arrivée au scroll
const stack = [
  { name: "React",       icon: `${ICON_BASE}/react/react-original.svg`,           col: 4,  line: 1, fromDir: "top"    },
  { name: "HTML",        icon: `${ICON_BASE}/html5/html5-original.svg`,            col: 8,  line: 3, fromDir: "bottom" },
  { name: "CSS",         icon: `${ICON_BASE}/css3/css3-original.svg`,              col: 12, line: 5, fromDir: "top"    },
  { name: "JavaScript",  icon: `${ICON_BASE}/javascript/javascript-original.svg`,  col: 16, line: 2, fromDir: "bottom" },
  { name: "Node.js",     icon: `${ICON_BASE}/nodejs/nodejs-original.svg`,          col: 20, line: 4, fromDir: "top"    },
  { name: "Express",     icon: `${ICON_BASE}/express/express-original.svg`,        col: 24, line: 1, fromDir: "bottom" },
  { name: "PHP",         icon: `${ICON_BASE}/php/php-original.svg`,                col: 28, line: 3, fromDir: "top"    },
  { name: "Git",         icon: `${ICON_BASE}/git/git-original.svg`,                col: 32, line: 5, fromDir: "bottom" },
  { name: "Figma",       icon: `${ICON_BASE}/figma/figma-original.svg`,            col: 36, line: 2, fromDir: "top"    },
  { name: "VS Code",     icon: `${ICON_BASE}/vscode/vscode-original.svg`,          col: 40, line: 4, fromDir: "bottom" },
  { name: "Vite",        icon: `${ICON_BASE}/vitejs/vitejs-original.svg`,          col: 44, line: 1, fromDir: "top"    },
  { name: "Supabase",    icon: `${ICON_BASE}/supabase/supabase-original.svg`,      col: 48, line: 3, fromDir: "bottom" },
  { name: "Claude Code", icon: "https://avatars.githubusercontent.com/u/76263028?s=48", col: 52, line: 5, fromDir: "top" },
  { name: "SCSS",        icon: `${ICON_BASE}/sass/sass-original.svg`,              col: 56, line: 2, fromDir: "bottom" },
  { name: "Bulma",       icon: `${ICON_BASE}/bulma/bulma-plain.svg`,               col: 60, line: 4, fromDir: "top"    },
];

// 5 lignes de portée : positions en % vertical dans la zone centrale
const STAFF_TOP    = 30; // % depuis le haut de la section
const STAFF_BOTTOM = 70;
const LINE_COUNT   = 5;

function getLineY(line) {
  // line 1 = première ligne du haut, line 5 = dernière
  const spacing = (STAFF_BOTTOM - STAFF_TOP) / (LINE_COUNT - 1);
  return STAFF_TOP + (line - 1) * spacing;
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
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
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
