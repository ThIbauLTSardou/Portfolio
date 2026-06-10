import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/projects.css";
import { projetsData, projetsGallery } from "../data/projets";
import { ProjetModal } from "../../../pages/ProjetDetail";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const titleRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#section_2",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Projets principaux : effet roulement sur le coin
      const projets = document.querySelectorAll(".projet");
      projets.forEach((el, i) => {
        const isRight = i % 2 === 1;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 100,
            rotation: isRight ? 10 : -10,
            transformOrigin: isRight ? "bottom right" : "bottom left",
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 5%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 2) * 0.15,
          }
        );
      });

      // Projets secondaires : apparition + disparition
      document.querySelectorAll(".content_secondaire").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 5%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="projects_wrap">
        {/* Section titre — sticky derrière les projets */}
        <section className="section_2" id="section_2">
          <div className="title" ref={titleRef}>
            <h1>Réalisations</h1>
          </div>
        </section>

        {/* Projets — passent par-dessus le titre au scroll */}
        <div className="projects_over">
          {/* Projets principaux */}
          <div className="liste_projet">
            {projetsData.map((projet) => (
              <div
                key={projet.id}
                className="projet"
                onClick={() => setOpenId(projet.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="img_projet">
                  <img
                    className="image"
                    src={`/img/${projet.id}.png`}
                    alt={projet.nom}
                  />
                </div>
                <h2 className="nom_projet">{projet.nom}</h2>
                <p>{projet.petite_description}</p>
              </div>
            ))}
          </div>

          {/* Projets secondaires */}
          <div className="projet_secondaire">
            {projetsGallery.map((projet) => (
              <div
                key={projet.id}
                className="content_secondaire"
                onClick={() => setOpenId(projet.id)}
                style={{ cursor: "pointer" }}
              >
                <a>
                  <h2>{projet.nom}</h2>
                  <p>{projet.petite_description}</p>
                  <p className="projet_secondaire_categorie">{projet.categorie}</p>
                </a>
                <span className="projet_secondaire_arrow">↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openId !== null && (
        <ProjetModal id={openId} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}
