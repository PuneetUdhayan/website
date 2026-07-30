import "./App.css";
import Hero from "./components/Hero";
import TopNav from "./components/TopNav";
import Contact from "./components/Contact";
import { useLenis } from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <main>
      <TopNav />
      <Hero />
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}

export default App;
