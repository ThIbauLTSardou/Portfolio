import "../css/header.css";
import casque_gauche from "../img/casque_gauche.png";
import casque_droit from "../img/casque_droit.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function Header() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".curtain_left", {
        x: "-100%",
        duration: 1,
        ease: "power4.inOut",
      })
      .to(".curtain_right", {
        x: "100%",
        duration: 1,
        ease: "power4.inOut",
      }, "<")
      .from(".casque_gauche", {
        x: "-40vw",
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }, "-=0.5")
      .from(".casque_droit", {
        x: "40vw",
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }, "<")
      .fromTo(".header_title", {
        y: 80,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "elastic.out(1, 0.4)",
      }, "<")
      .from(".svg", {
        opacity: 0,
        scaleX: 0,
        y: 20,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        transformOrigin: "center center",
      }, "<")
      .set([".curtain_left", ".curtain_right"], { display: "none" })
      .fromTo(".header_sidebar",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

    gsap.to(".header_title", {
      yPercent: -800,
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
  }, []);

  return (
    <>
      <div className="curtain_left" />
      <div className="curtain_right" />
      <section className="header">
        <div className="header_sidebar">
          <a href="https://www.linkedin.com/in/thibault-sardou" target="_blank" rel="noreferrer" className="header_sidebar_link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.863-3.059-1.865 0-2.151 1.455-2.151 2.959v5.704h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z"/></svg>
          </a>
          <a href="https://github.com/thibaultsardou" target="_blank" rel="noreferrer" className="header_sidebar_link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="header_sidebar_link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          </a>
        </div>
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
              <p className="header_subtitle">Développeur Frontend Junior</p>
            </div>
          </div>
          <img className="casque_droit" src={casque_droit} alt="Casque droit" />
        </div>
      </section>
    </>
  );
}
