import "../css/profile.css";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import pp from "../../../../public/pp.png";

import { Vinyle } from "../index";

gsap.registerPlugin(ScrollTrigger);

export function Profile() {
  useEffect(() => {
    // Animation section profil
    gsap.fromTo(
      ".left_title",
      {
        y: 100, // Part de 100px plus bas
        opacity: 0,
      },
      {
        y: -180, // Arrive à la position souhaitée (ton ancien style CSS)
        opacity: 1,
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 80%", // Démarre quand le haut de la section est à 80% du bas de l'écran
          end: "top 40%",
          scrub: 1,
        },
      },
    );

    gsap.fromTo(
      ".pp_container",
      {
        y: 100, // Part de 100px plus bas
        opacity: 0,
      },
      {
        y: -120, // Arrive à la position souhaitée (ton ancien style CSS)
        opacity: 1,
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 80%", // Démarre quand le haut de la section est à 80% du bas de l'écran
          end: "top 40%",
          scrub: 1,
        },
      },
    );
  });

  return (
   
      <section className=" section_profil">
        <div className="profile_left_side">
          <div className="profile_title left_title">
            <h1>Salut !</h1>
            <h3>Moi c'est Tybo</h3>
          </div>
        </div>
        <div className="profile_right_side">
          <div className="right_top_container">
            <div className="pp_container">
              <img src={pp} alt="Photo de profil" />
            </div>
          </div>
        </div>

        <Vinyle />
      </section>
    
  );
}
