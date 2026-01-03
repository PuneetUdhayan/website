import "./App.css";
import Hero from "./components/Hero";
import TopNav from "./components/TopNav";
import { useLenis } from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <main>
      <TopNav />
      <Hero />
    </main>
  );
}

export default App;
