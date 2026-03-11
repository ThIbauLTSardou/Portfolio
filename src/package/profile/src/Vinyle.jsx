import React, { useEffect, useRef, useState } from 'react';

// --- COMPOSANTS DE SECTION ---

const IntroContent = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-yellow-400 text-5xl font-black uppercase mb-4 drop-shadow-xl">Bienvenue</h2>
    <p className="text-white text-xl leading-relaxed bg-zinc-900/80 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/5">
      Scrolle pour faire tourner le disque et découvrir mon univers piste par piste.
    </p>
  </div>
);

const PassionsContent = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-yellow-400 text-5xl font-black uppercase mb-4 drop-shadow-xl">Mes Passions</h2>
    <div className="text-white text-xl leading-relaxed bg-zinc-900/80 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/5 space-y-4">
      <p>Le design interactif et la musique vintage.</p>
      <div className="flex gap-4 justify-center mt-2">
        <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">🎨 Design</span>
        <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">🎹 Musique</span>
        <span className="px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-400 text-sm">💻 Code</span>
      </div>
    </div>
  </div>
);

const UniversContent = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-yellow-400 text-5xl font-black uppercase mb-4 drop-shadow-xl">Mon Univers</h2>
    <p className="text-white text-xl leading-relaxed bg-zinc-900/80 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/5">
      Un mélange de minimalisme moderne et de textures rétro, où chaque détail compte pour créer une émotion.
    </p>
  </div>
);

const RevesContent = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-yellow-400 text-5xl font-black uppercase mb-4 drop-shadow-xl">Mes Rêves</h2>
    <p className="text-white text-xl leading-relaxed bg-zinc-900/80 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/5 italic">
      "Coder des interfaces qui racontent des histoires et inspirent la curiosité de ceux qui les utilisent."
    </p>
  </div>
);

// --- COMPOSANT PRINCIPAL ---

const App = () => {
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
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    const stScript = document.createElement('script');
    stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";

    script.onload = () => {
      document.head.appendChild(stScript);
      stScript.onload = initAnimation;
    };
    document.head.appendChild(script);

    function initAnimation() {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // État initial
      gsap.set(wrapperRef.current, { xPercent: 100 });

      // Une seule animation groupée pour éviter les micro-pauses entre les étapes d'une timeline
      gsap.to(wrapperRef.current, {
        x: "-50vw",
        xPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // On garde 1 pour un léger lissage, ou 0 pour une réactivité brute
          onUpdate: (self) => {
            // On calcule la rotation ici aussi pour la synchronisation
            const rotation = self.progress * 720;
            gsap.set(vinylRef.current, { rotation: -rotation });
            
            // Mise à jour de la section active
            const current = sections.find(s => rotation >= s.range[0] && rotation < s.range[1]);
            if (current) {
              setActiveSection(current.id);
            }
          }
        }
      });
    }

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []); // Dépendance vide pour ne pas relancer l'animation à chaque changement d'état

  return (
    <div className="bg-zinc-900 min-h-[500vh] font-sans overflow-x-hidden">
      
      <div className="fixed top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-4/5 max-w-[600px] pointer-events-none">
        {sections.map(({ id, Component }) => (
          <div
            key={id}
            className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
              activeSection === id 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <Component />
          </div>
        ))}
      </div>

      <div ref={wrapperRef} className="fixed bottom-0 right-0 z-50 will-change-transform">
        <div 
          ref={vinylRef} 
          className="relative w-[550px] h-[550px] bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_-10px_60px_rgba(0,0,0,0.6)] overflow-hidden translate-y-1/2"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/30 z-10 pointer-events-none" />

          {/* Sillons avec textes */}
          <svg className="absolute w-full h-full pointer-events-none z-10" viewBox="0 0 550 550">
            <path id="pathOuter" d="M 275, 275 m -215, 0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0" fill="none" />
            <text className="fill-black text-[14px] font-black uppercase tracking-widest">
              <textPath href="#pathOuter" startOffset="0%">Piste 01 : Mes Passions • Piste 01 : Mes Passions</textPath>
            </text>
          </svg>
          <div className="absolute w-[90%] h-[90%] rounded-full border border-black/10 [background:repeating-radial-gradient(circle,transparent,transparent_3px,rgba(0,0,0,0.03)_4px)]" />

          <svg className="absolute w-full h-full pointer-events-none z-10" viewBox="0 0 550 550">
            <path id="pathMid" d="M 275, 275 m -145, 0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0" fill="none" />
            <text className="fill-black text-[14px] font-black uppercase tracking-widest">
              <textPath href="#pathMid" startOffset="33%">Piste 02 : Mon Univers • Piste 02 : Mon Univers</textPath>
            </text>
          </svg>
          <div className="absolute w-[65%] h-[65%] rounded-full border border-black/10 [background:repeating-radial-gradient(circle,transparent,transparent_2px,rgba(0,0,0,0.05)_3px)]" />

          <svg className="absolute w-full h-full pointer-events-none z-10" viewBox="0 0 550 550">
            <path id="pathInner" d="M 275, 275 m -92, 0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" fill="none" />
            <text className="fill-black text-[14px] font-black uppercase tracking-widest">
              <textPath href="#pathInner" startOffset="66%">Piste 03 : Mes Rêves • Piste 03 : Mes Rêves</textPath>
            </text>
          </svg>
          <div className="absolute w-[40%] h-[40%] rounded-full border border-black/10 [background:repeating-radial-gradient(circle,transparent,transparent_4px,rgba(0,0,0,0.04)_5px)]" />
          
          <div className="absolute w-[150px] h-[150px] bg-zinc-800 rounded-full border-[5px] border-yellow-600 flex items-center justify-center z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 150 150">
              <path id="textCircle" d="M 75, 75 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" fill="none" />
              <text className="fill-white text-[16px] font-black uppercase tracking-[3px]">
                <textPath href="#textCircle" startOffset="50%" textAnchor="middle">Qui suis-je ? • Qui suis-je ?</textPath>
              </text>
            </svg>
            <div className="absolute w-3 h-3 bg-zinc-900 rounded-full z-30 shadow-inner" />
          </div>
        </div>
      </div>
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[10vw] font-black pointer-events-none whitespace-nowrap">
        RETOURNE LE DISQUE
      </div>
    </div>
  );
};

export default App;