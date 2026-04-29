import React, { useEffect, useRef, useState } from 'react';
import '../css/vinyle.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: 'parcours',
    piste: 'Piste 01 : Parcours scolaire',
    title: 'Parcours scolaire',
    content: (
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-year">2023 — auj.</span>
            <strong>DUT Informatique</strong>
            <span className="timeline-sub">IUT de Toulon</span>
          </div>
        </div>
        <div className="timeline-line" />
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <span className="timeline-year">2023</span>
            <strong>Baccalauréat Scientifique</strong>
            <span className="timeline-sub">Mention Bien</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'objectifs',
    piste: 'Piste 02 : Mes objectifs',
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
  {
    id: 'passions',
    piste: 'Piste 03 : Mes passions',
    title: 'Mes passions',
    content: (
      <div className="passions-grid">
        <div className="passion-card">
          <span className="passion-icon">🎨</span>
          <span className="passion-label">Design</span>
        </div>
        <div className="passion-card">
          <span className="passion-icon">🎹</span>
          <span className="passion-label">Musique</span>
        </div>
        <div className="passion-card">
          <span className="passion-icon">💻</span>
          <span className="passion-label">Code</span>
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

          const index = Math.min(
            Math.floor(rotationProgress * sections.length),
            sections.length - 1
          );
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
          {active ? active.piste : ''}
        </div>

        <div ref={vinylRef} className="vinyl-disk">
          <svg className="track-svg" viewBox="0 0 550 550">
            <path id="p1" d="M 275,275 m -215,0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0" fill="none" />
            <text className="track-text">
              <textPath href="#p1" startOffset="0%">
                {active ? `${active.piste} • ${active.piste} •` : ''}
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
          {active ? active.piste : ''}
        </div>
      </div>
    </div>
  );
};
