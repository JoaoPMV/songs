import { Routes, Route } from "react-router-dom";
import Music from "./Music";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Music />} />
      </Routes>
    </>
  );
}

export default App;
