import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {Home} from "./package/home/index";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
import './index.css'

function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      <Cursor />
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}
      <Routes>
        <Route path="/" element={<Home startCurtain={loadingDone} />} />
      </Routes>
    </>
  );
}

export default App;
