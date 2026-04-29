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

      document.querySelectorAll(".projet, .content_secondaire").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div>
        {/* Section titre */}
        <section className="section_2" id="section_2">
          <div className="title" ref={titleRef}>
            <h1>Réalisations</h1>
          </div>
        </section>

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
              <img src="/img/icone/fleche-diagonal.png" alt="" />
            </div>
          ))}
        </div>
      </div>

      {openId !== null && (
        <ProjetModal id={openId} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}
