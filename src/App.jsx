import { useState } from "react";
import "./App.css";
import { HeaderPage } from "../component/header.jsx";
function App() {
  const [isLight, setIsLight] = useState(true);
  const toggleMood = () => {
    setIsLight(!isLight);
  };

  return (
    <section className={isLight ? "container" : "light-mode"}>
      <HeaderPage
        isLight={isLight}
        setIsLight={setIsLight}
        toggleMood={toggleMood}
      />
    </section>
  );
}
export default App;
