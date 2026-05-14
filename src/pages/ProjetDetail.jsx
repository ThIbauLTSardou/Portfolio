import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projetsData, projetsGallery } from '../package/home/data/projets';
import './ProjetDetail.css';

const TECH_ICONS = {
  'JS':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'NodeJS':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'ExpressJs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'MySQL':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'ChartJs':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg',
  'Bulma':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bulma/bulma-plain.svg',
  'PHP':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Figma':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'VScode':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'Github':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Trello':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
  'PHPmyadmin':'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Discord':   'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg',
  'Canva':     'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg',
  'Pinterest': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pinterest.svg',
  'Drive':     'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googledrive.svg',
  'Affinity designer': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/affinitydesigner.svg',
};

const FALLBACK_IMAGES = [
  'https://picsum.photos/seed/proj1/1200/675',
  'https://picsum.photos/seed/proj2/1200/675',
  'https://picsum.photos/seed/proj3/1200/675',
];

function Carousel({ projet }) {
  const isUiUx = projet.categorie?.includes('UX');
  const images = (isUiUx && projet.images) || [];
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  if (images.length === 0) return null;

  const goTo = (i) => {
    const next = (i + images.length) % images.length;
    gsap.to(trackRef.current, {
      x: `-${next * 100}%`,
      duration: 0.55,
      ease: 'power3.inOut',
    });
    setIndex(next);
  };

  return (
    <div className="pd_carousel_section">
      <span className="pd_info_label" style={{ paddingLeft: '2.5rem' }}>Visuels</span>
      <div className="pd_carousel">
        <div className="pd_carousel_track_wrap">
          <div className="pd_carousel_track" ref={trackRef}>
            {images.map((src, i) => (
              <div key={i} className="pd_carousel_slide">
                <img src={src} alt={`Visuel ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="pd_carousel_controls">
          <button className="pd_carousel_btn" onClick={() => goTo(index - 1)}>←</button>
          <span className="pd_carousel_count">{index + 1} / {images.length}</span>
          <button className="pd_carousel_btn" onClick={() => goTo(index + 1)}>→</button>
        </div>
      </div>
    </div>
  );
}

function StackTicker({ tech }) {
  const tickerRef = useRef(null);
  const tweenRef = useRef(null);
  const items = [...tech, ...tech, ...tech, ...tech];

  useEffect(() => {
    const track = tickerRef.current;
    if (!track || tech.length === 0) return;
    const singleWidth = track.scrollWidth / 4;
    tweenRef.current = gsap.to(track, {
      x: `-=${singleWidth}`,
      duration: tech.length * 2.5,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % singleWidth),
      },
    });
    return () => tweenRef.current?.kill();
  }, [tech]);

  if (tech.length === 0) return null;

  return (
    <div className="pd_ticker_wrap">
      <div className="pd_ticker" ref={tickerRef}>
        {items.map((t, i) => (
          <div key={i} className="pd_ticker_item">
            {TECH_ICONS[t]
              ? <img src={TECH_ICONS[t]} alt={t} className="pd_tech_icon" />
              : <span className="pd_tech_fallback">{t[0]}</span>
            }
            <span className="pd_ticker_name">{t}</span>
            <span className="pd_ticker_sep">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjetModal({ id, onClose }) {
  const overlayRef = useRef(null);
  const sheetRef = useRef(null);

  const allProjets = [...projetsData, ...projetsGallery];
  const projet = allProjets.find(p => p.id === id);
  const allTech = [...(projet?.langage || []), ...(projet?.outils || [])];

  // Ouverture
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
    gsap.fromTo(sheetRef.current,
      { y: '100%' },
      { y: '0%', duration: 0.6, ease: 'power4.out' }
    );
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    gsap.to(sheetRef.current, {
      y: '100%',
      duration: 0.5,
      ease: 'power4.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!projet) return null;

  return (
    <div className="pd_overlay" ref={overlayRef} onClick={handleClose}>
      <div
        className="pd_sheet"
        ref={sheetRef}
        onClick={e => e.stopPropagation()}
      >
        {/* Topbar */}
        <div className="pd_topbar">
          <button className="pd_back" onClick={handleClose}>← Fermer</button>
        </div>

        <div className="pd_sheet_scroll">
          {/* Header */}
          <header className="pd_header">
            <p className="pd_meta">{projet.categorie}</p>
            <h1 className="pd_title">{projet.nom}</h1>
          </header>

          {/* Preview */}
          <div className="pd_preview">
            <img src={`/img/${projet.id}.png`} alt={projet.nom} className="pd_preview_img" />
          </div>

          {/* Info bar */}
          <div className="pd_infobar">
            <div className="pd_info_block">
              <span className="pd_info_label">Description</span>
              <span className="pd_info_value">{projet.petite_description}</span>
            </div>
            <div className="pd_info_block">
              <span className="pd_info_label">Catégorie</span>
              <span className="pd_info_value">{projet.categorie}</span>
            </div>
          </div>

          {/* Stack ticker */}
          {allTech.length > 0 && (
            <div className="pd_stack_section">
              <span className="pd_info_label" style={{ padding: '0 2.5rem' }}>Stack</span>
              <StackTicker tech={allTech} />
            </div>
          )}

          {/* Description */}
          {projet.paragraphe && (
            <div className="pd_body">
              <span className="pd_body_label">À propos du projet</span>
              <p className="pd_desc">{projet.paragraphe}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
