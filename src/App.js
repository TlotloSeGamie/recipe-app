import React, { useState } from "react";
import './App.css';
import Navbar from "./navbar";
import Home from "./home";
import Breakfast from "./breakfast";
import Recipes from "./recipes";
import Lunch from "./lunch";
import Dinner from "./dinner";

const App = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    return localStorage.getItem('currentSection') || 'home';
  });

  const handleMenuClick = (section) => {
    setCurrentSection(section);
    localStorage.setItem('currentSection', section);
  };

  return (
    <div>
      <Navbar onMenuClick={handleMenuClick} />
      {currentSection === 'breakfast' && <Breakfast selectedMenu="breakfast" goHome={() => handleMenuClick('home')} />}
      {currentSection === 'sandwich' && <Recipes selectedMenu="sandwich" goHome={() => handleMenuClick('home')} />}
      {currentSection === 'lunch' && <Lunch selectedMenu="lunch" goHome={() => handleMenuClick('home')} />}
      {currentSection === 'dinner' && <Dinner selectedMenu="dinner" goHome={() => handleMenuClick('home')} />}
      {currentSection === 'home' && <Home />}
    </div>
  );
};

export default App;
