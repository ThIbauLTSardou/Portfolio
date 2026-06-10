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

    // "Moi c'est" : simple apparition depuis le bas, reste en place
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
        },
      },
    );

    // "Salut !" dans le hero : apparaît en remontant depuis le bas au scroll
    gsap.fromTo(
      ".header_salut",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".section_profil",
          start: "top 95%",
          end: "top 70%",
          scrub: 1,
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
        },
      },
    );

    ScrollTrigger.create({
      trigger: ".section_profil",
      start: "top 20%",
      end: isMobile ? "+=220%" : "+=280%",
      pin: true,
      pinSpacing: true,
    });
  }, []);

  return (
   
      <section className=" section_profil">
        <div className="profile_left_side">
          <div className="profile_title left_title">
            <h3>Moi c'est <span className="tybo_name">...</span></h3>
          </div>
        </div>

        <Vinyle />
      </section>
    
  );
}
