
import "./App.css";

import LandingPage from "./components/landing-page";
import ContactMe from "./components/contact-me";

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
      <ContactMe />
    </div>
  );
}

export default App;
