import { useState } from "react";
import "../css/home.css";
import { Header } from "../../header/index";
import { Navbar } from "../../header/src/Navbar";
import { Profile } from "../../profile/index";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { MusicPlayer } from "../../music/src/MusicPlayer";
import { Footer } from "../../../components/Footer";

export function Home({ startCurtain }) {
  const [musicOpen, setMusicOpen] = useState(false);

  return (
    <div>
      <Navbar onMusicOpen={() => setMusicOpen(true)} />
      <Header startCurtain={startCurtain} />
      <div id="section_profil"><Profile /></div>
      <div id="section_skills"><Skills /></div>
      <div className="projects_footer_wrap">
        <div className="projects_sticky">
          <Projects />
        </div>
        <Footer />
      </div>
      <MusicPlayer isOpen={musicOpen} onClose={() => setMusicOpen(false)} />
    </div>
  );
}
