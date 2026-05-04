import React, { useEffect, useRef, useState } from 'react';
import '../css/vinyle.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const sections = [
  {
    id: 'identite',
    piste: 'Piste 01 : Qui suis-je ?',
    title: 'À propos',
    content: (
      <div className="apropos">
        <p className="apropos-desc">
          Je m'appelle <em>Thibault Sardou</em>, j'ai 21 ans et je suis actuellement en troisième année de <em>BUT Métiers du Multimédia et de l'Internet (MMI)</em>. Je souhaite me spécialiser dans le <em>développement web</em> et construire une carrière d'<em>auto entrepreneur</em> dans ce domaine.
        </p>
        <div className="apropos-stats">
          <div className="apropos-stat">
            <span className="apropos-stat-num">3 ans</span>
            <span className="apropos-stat-label">d'expérience</span>
          </div>
          <div className="apropos-stat">
            <span className="apropos-stat-num">12+</span>
            <span className="apropos-stat-label">projets réalisés</span>
          </div>
        </div>
        <div className="apropos-contact">
          <div className="apropos-contact-item">
            <span className="apropos-contact-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <span className="apropos-contact-value">thibaultsardou1@gmail.com</span>
          </div>
          <div className="apropos-contact-item">
            <span className="apropos-contact-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.85 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span className="apropos-contact-value">07 66 15 18 24</span>
          </div>
        </div>
        <a href="/CV_Thibault_Sardou.pdf" className="apropos-btn" target="_blank" rel="noreferrer">
          Me découvrir →
        </a>
      </div>
    ),
  },
  {
    id: 'parcours',
    piste: 'Piste 02 : Parcours scolaire',
    title: 'Parcours scolaire',
    content: (
      <div className="parcours-cards">
        <div className="parcours-card" style={{ '--card-bg': '#e8645a' }}>
          <div className="parcours-card-top">
            <span className="parcours-location">La Roche sur Yon (85)</span>
            <strong className="parcours-name">Bac Général</strong>
            <p className="parcours-desc">Spécialité Mathématiques et Numérique et Science de l'Ingénieur</p>
          </div>
          <div className="parcours-card-logo">
            <img src="/img/delattre.png" alt="Lycée Delattre" />
          </div>
        </div>
        <div className="parcours-card" style={{ '--card-bg': '#7c3aed' }}>
          <div className="parcours-card-top">
            <span className="parcours-location">Lannion (22)</span>
            <strong className="parcours-name">BUT MMI</strong>
            <p className="parcours-desc">Spécialité Développement Web et disp. interactifs</p>
          </div>
          <div className="parcours-card-logo">
            <img src="/img/mmi.png" alt="MMI" />
          </div>
        </div>
        <div className="parcours-card" style={{ '--card-bg': '#7ab8e8' }}>
          <div className="parcours-card-top">
            <span className="parcours-location">Loperhet (29)</span>
            <strong className="parcours-name">Alternance</strong>
            <p className="parcours-sub">Aviation civile</p>
            <p className="parcours-desc">Développement d'application web React</p>
          </div>
          <div className="parcours-card-logo">
            <img src="/img/dgac.png" alt="DGAC" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'objectifs',
    piste: 'Piste 03 : Mes objectifs',
    title: 'Mes objectifs',
    content: (
      <div className="objectifs-content">
        <div className="objectif-word">
          <span className="word-outline">CRÉER</span>
          <span className="word-fill">CRÉER</span>
        </div>
        <p className="objectif-desc">
          Développeur front-end créatif — allier <em>design</em> et <em>code</em> pour des expériences mémorables.
        </p>
        <div className="objectif-tags">
          <span className="otag">UI/UX</span>
          <span className="otag">Motion</span>
          <span className="otag">Web créatif</span>
        </div>
      </div>
    ),
  },
];

// Phase 0→ARRIVAL  : vinyle arrive de droite vers le centre
// Phase ARRIVAL→EXIT : vinyle tourne (3 tours, 1 par section)
// Phase EXIT→1     : vinyle sort à gauche
const ARRIVAL = 0.1;
const EXIT = 0.75;

export const Vinyle = () => {
  const vinylRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);


  useEffect(() => {
    gsap.set(wrapperRef.current, { xPercent: -50, x: 0, y: '150vh' });

    ScrollTrigger.create({
      trigger: '.section_profil',
      start: 'top 20%',
      end: '+=280%',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        // Phase arrivée : monte depuis le bas
        if (p <= ARRIVAL) {
          const arrivalProgress = p / ARRIVAL;
          const yVal = 25 + (1 - arrivalProgress) * 60;
          gsap.set(wrapperRef.current, { y: `${yVal}%`, x: 0 });
          setActiveIndex(-1);
          return;
        }

        // Phase centre : vinyle stabilisé, tourne (moitié basse visible)
        if (p <= EXIT) {
          gsap.set(wrapperRef.current, { y: '25%', x: 0 });
          const rotationProgress = (p - ARRIVAL) / (EXIT - ARRIVAL);
          const rotation = rotationProgress * 540;
          gsap.set(vinylRef.current, { rotation: -rotation });

          const index = rotationProgress < 0.33 ? 0 : rotationProgress < 0.66 ? 1 : 2;
          setActiveIndex(index);
          return;
        }

        // Phase sortie : part à gauche
        const exitProgress = (p - EXIT) / (1 - EXIT);
        gsap.set(wrapperRef.current, { y: '25%', x: `${-exitProgress * 120}vw` });
        gsap.set(vinylRef.current, { rotation: -(540 + exitProgress * 360) });
        setActiveIndex(-1);
      },
    });


    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const active = activeIndex >= 0 ? sections[activeIndex] : null;

  return (
    <div>
      <div className="vinyl-content-display">
        {sections.map((s, i) => (
          <div key={s.id} className={`vinyl-section ${i === activeIndex ? 'active' : ''}`}>
            <h2 className="vinyl-section-title">{s.title}</h2>
            <div className="vinyl-section-body">{s.content}</div>
          </div>
        ))}
      </div>

      <div ref={wrapperRef} className="vinyl-wrapper">
        <div className="vinyl-label-top">
          {active ? active.title : ''}
        </div>

        <div ref={vinylRef} className="vinyl-disk">
          <svg className="track-svg" viewBox="0 0 550 550">
            <path id="p1" d="M 275,275 m -215,0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0" fill="none" />
            <text className="track-text">
              <textPath href="#p1" startOffset="0%" textAnchor="middle">
                {active ? active.piste : ''}
              </textPath>
            </text>
            <text className="track-text">
              <textPath href="#p1" startOffset="50%" textAnchor="middle">
                {active ? active.piste : ''}
              </textPath>
            </text>
          </svg>
          <div className="groove groove-outer" />
          <div className="groove groove-mid" />
          <div className="groove groove-inner" />

          <div className="center-label">
            <svg className="label-svg" viewBox="0 0 150 150">
              <path id="pLabel" d="M 75,75 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" fill="none" />
              <text className="label-text">
                <textPath href="#pLabel" startOffset="50%" textAnchor="middle">Qui suis-je ? • Qui suis-je ?</textPath>
              </text>
            </svg>
            <div className="center-hole" />
          </div>
        </div>

        <div className="vinyl-label-bottom">
          {active ? active.title : ''}
        </div>
      </div>
    </div>
  );
};
