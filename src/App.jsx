import { Routes, Route } from "react-router-dom";
import {Home} from "./package/home/index";
import { Cursor } from "./components/Cursor";
import './index.css'

function App() {
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
