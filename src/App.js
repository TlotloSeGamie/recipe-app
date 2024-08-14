import React, { useState } from "react";
import './App.css';
import Navbar from "./navbar";
import Home from "./home";
import Breakfast from "./breakfast";
import Recipes from "./recipes";
import Lunch from "./lunch";
import Dinner from "./dinner";
import Login from "./login";
import Register from "./register";

const App = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    return localStorage.getItem('currentSection') || 'home';
  });
  const [currentForm, setCurrentForm] = useState(null);

  const handleMenuClick = (section) => {
    setCurrentSection(section);
    localStorage.setItem('currentSection', section);
  };

  const switchForm = (formName) => {
    setCurrentForm(formName);
  };

  const closeForm = () => {
    setCurrentForm(null);
  };

  return (
    <div>
      <Navbar onMenuClick={handleMenuClick} switchForm={switchForm} />
      {!currentForm && currentSection === 'breakfast' && <Breakfast selectedMenu="breakfast" goHome={() => handleMenuClick('home')} />}
      {!currentForm && currentSection === 'sandwich' && <Recipes selectedMenu="sandwich" goHome={() => handleMenuClick('home')} />}
      {!currentForm && currentSection === 'lunch' && <Lunch selectedMenu="lunch" goHome={() => handleMenuClick('home')} />}
      {!currentForm && currentSection === 'dinner' && <Dinner selectedMenu="dinner" goHome={() => handleMenuClick('home')} />}
      {!currentForm && currentSection === 'home' && <Home />}
      {currentForm === 'login' && <Login onFormSwitch={() => switchForm('register')} onClose={closeForm} />}
      {currentForm === 'register' && <Register onFormSwitch={() => switchForm('login')} onClose={closeForm} />}
    </div>
  );
};

export default App;
