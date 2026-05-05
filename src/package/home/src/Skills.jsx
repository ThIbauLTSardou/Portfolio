import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const stack = [
  {
    category: "Front-end",
    items: [
      { name: "React", icon: `${ICON_BASE}/react/react-original.svg`, url: "https://react.dev" },
      { name: "HTML", icon: `${ICON_BASE}/html5/html5-original.svg`, url: "https://developer.mozilla.org/fr/docs/Web/HTML" },
      { name: "CSS", icon: `${ICON_BASE}/css3/css3-original.svg`, url: "https://developer.mozilla.org/fr/docs/Web/CSS" },
      { name: "JavaScript", icon: `${ICON_BASE}/javascript/javascript-original.svg`, url: "https://developer.mozilla.org/fr/docs/Web/JavaScript" },
    ],
  },
  {
    category: "Back-end",
    items: [
      { name: "Node.js", icon: `${ICON_BASE}/nodejs/nodejs-original.svg`, url: "https://nodejs.org" },
      { name: "Express", icon: `${ICON_BASE}/express/express-original.svg`, url: "https://expressjs.com" },
      { name: "PHP", icon: `${ICON_BASE}/php/php-original.svg`, url: "https://www.php.net" },
    ],
  },
  {
    category: "Outils",
    items: [
      { name: "Git", icon: `${ICON_BASE}/git/git-original.svg`, url: "https://git-scm.com" },
      { name: "Figma", icon: `${ICON_BASE}/figma/figma-original.svg`, url: "https://figma.com" },
      { name: "VS Code", icon: `${ICON_BASE}/vscode/vscode-original.svg`, url: "https://code.visualstudio.com" },
      { name: "Vite", icon: `${ICON_BASE}/vitejs/vitejs-original.svg`, url: "https://vitejs.dev" },
      { name: "Supabase", icon: `${ICON_BASE}/supabase/supabase-original.svg`, url: "https://supabase.com" },
      { name: "Claude Code", icon: "https://avatars.githubusercontent.com/u/76263028?s=48", url: "https://claude.ai/code" },
      { name: "DBeaver", icon: `${ICON_BASE}/dbeaver/dbeaver-original.svg`, url: "https://dbeaver.io" },
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("Front-end");

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const contentRef = useRef(null);

  const activeGroup = stack.find((g) => g.category === activeCategory);

  // Section entrance + exit animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apparition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          filtersRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" },
          "-=0.2"
        );

      // Disparition en cascade inversée au scroll vers le bas
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center 40%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          const cards = Array.from(contentRef.current.children).reverse();
          gsap.to(cards, {
            y: 60,
            opacity: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "power2.in",
          });
          gsap.to(filtersRef.current.children, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            delay: 0.1,
          });
          gsap.to(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            delay: 0.25,
          });
        },
        onLeaveBack: () => {
          gsap.to(contentRef.current.children, { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" });
          gsap.to(filtersRef.current.children, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" });
          gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cards animation when switching category
  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;

    gsap.to(contentRef.current.children, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(category);
      },
    });
  };

  // Animate cards in after category change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <section className="section_skills" ref={sectionRef}>
      <div className="skills_inner">
        <div className="skills_header">
          <h2 className="skills_title" ref={titleRef}>Stack technique</h2>
          <div className="skills_filters" ref={filtersRef}>
            {stack.map((group) => (
              <button
                key={group.category}
                className={`skills_filter${activeCategory === group.category ? " skills_filter--active" : ""}`}
                onClick={() => handleCategoryChange(group.category)}
              >
                {group.category}
              </button>
            ))}
          </div>
        </div>

        <div className="skills_content" ref={contentRef}>
          {activeGroup.items.map((item) => (
            <a key={item.name} className="skills_card" href={item.url} target="_blank" rel="noreferrer">
              {item.icon && <img src={item.icon} alt={item.name} className="skills_card_icon" />}
              <div className="skills_card_name">{item.name}</div>
              <span className="skills_card_arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
