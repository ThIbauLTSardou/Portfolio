import React, { useEffect, useRef, useState } from 'react';
import '../css/vinyle.css'
// --- COMPOSANTS DE CONTENU ---

const IntroContent = () => (
  <div className="section-content">
    <h2 className="title">Bienvenue</h2>
    <p className="description">
      Scrolle pour faire tourner le disque et découvrir mon univers piste par piste.
    </p>
  </div>
);

const PassionsContent = () => (
  <div className="section-content">
    <h2 className="title">Mes Passions</h2>
    <div className="description space-y-4">
      <p>Le design interactif et la musique vintage.</p>
      <div className="flex gap-4 justify-center mt-2">
        <span className="badge">🎨 Design</span>
        <span className="badge">🎹 Musique</span>
        <span className="badge">💻 Code</span>
      </div>
    </div>
  </div>
);

const UniversContent = () => (
  <div className="section-content">
    <h2 className="title">Mon Univers</h2>
    <p className="description">
      Un mélange de minimalisme moderne et de textures rétro, où chaque détail compte.
    </p>
  </div>
);

const RevesContent = () => (
  <div className="section-content">
    <h2 className="title">Mes Rêves</h2>
    <p className="description italic">
      "Coder des interfaces qui racontent des histoires et inspirent la curiosité."
    </p>
  </div>
);

// --- COMPOSANT PRINCIPAL ---

export const Vinyle = () => {
  const vinylRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeSection, setActiveSection] = useState('section-intro');

  const sections = [
    { id: 'section-intro', Component: IntroContent, range: [0, 150] },
    { id: 'section-passions', Component: PassionsContent, range: [150, 350] },
    { id: 'section-univers', Component: UniversContent, range: [350, 550] },
    { id: 'section-reves', Component: RevesContent, range: [550, 720] }
  ];

  useEffect(() => {
    // Chargement des scripts GSAP
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    const stScript = document.createElement('script');
    stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";

    script.onload = () => {
      document.head.appendChild(stScript);
      stScript.onload = () => {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Animation de translation et rotation synchronisée
        gsap.to(wrapperRef.current, {
          x: "-50vw",
          xPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: ".section_profil",
            
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
            
            markers: true,
            onUpdate: (self) => {
              const rotation = self.progress * 720;
              gsap.set(vinylRef.current, { rotation: -rotation });
              
              const current = sections.find(s => rotation >= s.range[0] && rotation < s.range[1]);
              if (current) setActiveSection(current.id);
            }
          }
        });
      };
    };
    document.head.appendChild(script);

    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div>

      {/* Structure du Vinyle */}
      <div ref={wrapperRef} className="vinyl-wrapper">
        <div ref={vinylRef} className="vinyl-disk">
          <div className="vinyl-shine" />

          {/* Pistes et sillons */}
          <svg className="track-svg" viewBox="0 0 550 550">
            <path id="p1" d="M 275, 275 m -215, 0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0" fill="none" />
            <text className="track-text">
              <textPath href="#p1" startOffset="0%">Piste 01 : Mes Passions • Piste 01 : Mes Passions</textPath>
            </text>
          </svg>
          <div className="groove groove-outer" />

          <svg className="track-svg" viewBox="0 0 550 550">
            <path id="p2" d="M 275, 275 m -145, 0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0" fill="none" />
            <text className="track-text">
              <textPath href="#p2" startOffset="33%">Piste 02 : Mon Univers</textPath>
            </text>
          </svg>
          <div className="groove groove-mid" />

          <svg className="track-svg" viewBox="0 0 550 550">
            <path id="p3" d="M 275, 275 m -92, 0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" fill="none" />
            <text className="track-text">
              <textPath href="#p3" startOffset="66%">Piste 03 : Mes Rêves • </textPath>
            </text>
          </svg>
          <div className="groove groove-inner" />
          
          {/* Étiquette centrale */}
          <div className="center-label">
            <svg className="label-svg" viewBox="0 0 150 150">
              <path id="pLabel" d="M 75, 75 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" fill="none" />
              <text className="label-text">
                <textPath href="#pLabel" startOffset="50%" textAnchor="middle">Qui suis-je ? • Qui suis-je ?</textPath>
              </text>
            </svg>
            <div className="center-hole" />
          </div>
        </div>
      </div>
    </div>
  );
};

