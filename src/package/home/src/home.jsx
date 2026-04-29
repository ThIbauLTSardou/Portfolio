import "../css/home.css";
import { Header } from "../../header/index";
import { Navbar } from "../../header/src/Navbar";
import { Profile } from "../../profile/index";
import { Skills } from "./Skills";
import { Projects } from "./Projects";

export function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div id="section_profil"><Profile /></div>
      <div id="section_skills"><Skills /></div>
      <Projects />
    </div>
  );
}
