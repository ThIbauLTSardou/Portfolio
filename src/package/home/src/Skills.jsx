import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/skills.css";

gsap.registerPlugin(ScrollTrigger);

const stack = [
  {
    category: "Front-end",
    items: [
      { name: "React", description: "Bibliothèque JavaScript pour construire des interfaces utilisateur réactives et composants réutilisables." },
      { name: "HTML", description: "Langage de balisage structurant le contenu web avec sémantique et accessibilité." },
      { name: "CSS", description: "Feuilles de style pour la mise en forme, animations et design responsive." },
      { name: "JavaScript", description: "Langage de programmation dynamique pour l'interactivité et la logique côté client." },
    ],
  },
  {
    category: "Back-end",
    items: [
      { name: "Node.js", description: "Environnement d'exécution JavaScript côté serveur pour des APIs performantes." },
      { name: "Express", description: "Framework minimaliste pour construire des APIs REST et applications web." },
      { name: "PHP", description: "Langage serveur polyvalent pour le développement web dynamique." },
    ],
  },
  {
    category: "Outils",
    items: [
      { name: "Git", description: "Système de contrôle de version distribué pour la gestion du code source." },
      { name: "Figma", description: "Outil de design collaboratif pour la création d'interfaces et prototypes." },
      { name: "VS Code", description: "Éditeur de code léger et extensible avec débogage intégré." },
      { name: "Vite", description: "Outil de build ultra-rapide pour les projets JavaScript modernes." },
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

  // Section entrance animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
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
            <div key={item.name} className="skills_card">
              <div className="skills_card_name">{item.name}</div>
              <p className="skills_card_desc">{item.description}</p>
              <span className="skills_card_arrow">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
