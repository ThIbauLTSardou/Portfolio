import "../css/header.css";
import casque_gauche from "../img/casque_gauche.png";
import casque_droit from "../img/casque_droit.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function Header() {
  useEffect(() => {
    // Animation du titre et des casques
    gsap.to(".header_title", {
      y: "-800%",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".casque_gauche", {
      y: "-800%",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".casque_droit", {
      y: "-800%",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    gsap.to(".svg", {
      y: "-700%",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });
  });
  return (
    <section className="header">
      <div className="header_container">
        <img className="casque_gauche" src={casque_gauche} alt="Casque gauche" />
        <div className="middle">
          <svg
            className="svg"
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 100 L25 40 L50 160 L75 20 L100 180 L125 60 L150 140 L175 40 L200 160 L225 20 L250 180 L275 60 L300 100">
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                  M0 100 L25 50 L50 150 L75 30 L100 170 L125 40 L150 160 L175 60 L200 140 L225 20 L250 180 L275 90 L300 100;
                  M0 100 L25 70 L50 130 L75 10 L100 190 L125 80 L150 120 L175 40 L200 160 L225 60 L250 140 L275 50 L300 100;
                  M0 100 L25 20 L50 180 L75 50 L100 150 L125 10 L150 190 L175 30 L200 170 L225 90 L250 120 L275 40 L300 100;
                  M0 100 L25 50 L50 150 L75 30 L100 170 L125 40 L150 160 L175 60 L200 140 L225 20 L250 180 L275 90 L300 100"
              />
            </path>
          </svg>

          <div className="header_title">
            <h1>Thibault Sardou</h1>
          </div>
        </div>
        <img className="casque_droit" src={casque_droit} alt="Casque droit" />
      </div>
    </section>
  );
}
