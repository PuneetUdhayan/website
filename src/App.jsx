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
    const lenis = getLenis();
    // Lenis caches the page's scrollable height and only recalculates it
    // via ResizeObserver, which doesn't reliably fire on a client-side
    // route swap. Arriving here from another route (e.g. /art, which has
    // no scroll of its own) leaves Lenis thinking the page still has ~0
    // scrollable height, so it silently clamps scrollTo to 0. Force a
    // remeasure before computing the offset.
    lenis?.resize();
    const offset = target.offsetTop + window.innerHeight * 2;
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
