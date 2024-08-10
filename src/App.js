import React, { useState } from "react";
import './App.css';
import Navbar from "./navbar";
import Home from "./home";
import Breakfast from "./breakfast";

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const handleMenuClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div>
      <Navbar onMenuClick={handleMenuClick} />
      {currentSection === 'home' && <Home />}
      {currentSection === 'breakfast' && <Breakfast selectedMenu="breakfast" goHome={() => setCurrentSection('home')} />}
      {/* Add more sections as needed */}
    </div>
  );
};

export default App;
