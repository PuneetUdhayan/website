import "./App.css";

import LandingPage from "./components/landing-page";

function App() {
  return (
    <div
      className="
        h-screen             
        overflow-y-scroll    
        snap-y              
        snap-mandatory
        scrollbar-hide
      "
    >
      <LandingPage />
    </div>
  );
}

export default App;
