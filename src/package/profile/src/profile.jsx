import "../css/profile.css";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pp = "/pp.png";

import { Vinyle } from "../index";

gsap.registerPlugin(ScrollTrigger);

export function Profile() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Pin en premier pour que les autres ScrollTriggers se calculent après
    ScrollTrigger.create({
      trigger: ".section_profil",
      start: "top 20%",
      end: isMobile ? "+=220%" : "+=280%",
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    });

    // "Salut !" : apparaît quand section_profil atteint le milieu de l'écran
    gsap.fromTo(
      ".header_salut",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 50%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      },
    );

    // "Moi c'est" : apparition depuis le bas
    gsap.fromTo(
      ".left_title",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );

    gsap.fromTo(
      ".pp_container",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );
  }, []);

  return (
   
      <section className=" section_profil">
        <h2 className="header_salut">Salut !</h2>
        <div className="profile_left_side">
          <div className="profile_title left_title">
            <h3>Moi c'est <span className="tybo_name">...</span></h3>
          </div>
        </div>

        <Vinyle />
      </section>
    
  );
}
