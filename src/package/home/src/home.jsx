import { useState } from "react";
import "../css/home.css";
import { Header } from "../../header/index";
import { Navbar } from "../../header/src/Navbar";
import { Profile } from "../../profile/index";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { MusicPlayer } from "../../music/src/MusicPlayer";

export function Home() {
  const [musicOpen, setMusicOpen] = useState(false);

  return (
    <div>
      <Navbar onMusicOpen={() => setMusicOpen(true)} />
      <Header />
      <div id="section_profil"><Profile /></div>
      <div id="section_skills"><Skills /></div>
      <Projects />
      <MusicPlayer isOpen={musicOpen} onClose={() => setMusicOpen(false)} />
    </div>
  );
}
