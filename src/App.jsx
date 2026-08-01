import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import TopNav from "./components/TopNav";
import Contact from "./components/Contact";
import ArtGallery from "./components/ArtGallery";
import { useLenis, getLenis } from "./hooks/useLenis";

function Home() {
  const location = useLocation();

  // Arriving here from another page with a #contact link should still land
  // on the contact section, not just the top of the home page.
  useEffect(() => {
    if (location.hash !== "#contact") return;
    const target = document.getElementById("contact");
    if (!target) return;
    const offset = target.offsetTop + window.innerHeight * 2;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(offset, { duration: 4 });
    } else {
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

function App() {
  useLenis();

  return (
    <main>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<ArtGallery />} />
      </Routes>
    </main>
  );
}

export default App;
