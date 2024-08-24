import React, { useState } from "react";
import './App.css';
import Navbar from "./navbar";
import Home from "./home";
import Breakfast from "./breakfast";
import Lunch from "./lunch";
import Dinner from "./dinner";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import Sandwich from "./sandwich";

const App = () => {
  const [currentSection, setCurrentSection] = useState(() => {
    return localStorage.getItem('currentSection') || 'home';
  });
  const [currentForm, setCurrentForm] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  });

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

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    closeForm();
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentSection('home');
    localStorage.removeItem('currentSection');
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div>
      <Navbar
        onMenuClick={handleMenuClick}
        switchForm={switchForm}
        loggedInUser={loggedInUser}
        onLogout={handleLogout} 
      />
      {loggedInUser ? (
        currentSection === 'profile' ? (
          <Profile user={loggedInUser} onLogout={handleLogout} />
        ) : (
          <div>
            {!currentForm && currentSection === 'breakfast' && <Breakfast selectedMenu="breakfast" goHome={() => handleMenuClick('home')} />}
            {!currentForm && currentSection === 'sandwich' && <Sandwich selectedMenu="sandwich" goHome={() => handleMenuClick('home')} />}
            {!currentForm && currentSection === 'lunch' && <Lunch selectedMenu="lunch" goHome={() => handleMenuClick('home')} />}
            {!currentForm && currentSection === 'dinner' && <Dinner selectedMenu="dinner" goHome={() => handleMenuClick('home')} />}
            {!currentForm && currentSection === 'home' && <Home />}
          </div>
        )
      ) : (
        <div>
          {!currentForm && currentSection === 'breakfast' && <Breakfast selectedMenu="breakfast" goHome={() => handleMenuClick('home')} />}
          {!currentForm && currentSection === 'sandwich' && <Sandwich selectedMenu="sandwich" goHome={() => handleMenuClick('home')} />}
          {!currentForm && currentSection === 'lunch' && <Lunch selectedMenu="lunch" goHome={() => handleMenuClick('home')} />}
          {!currentForm && currentSection === 'dinner' && <Dinner selectedMenu="dinner" goHome={() => handleMenuClick('home')} />}
          {!currentForm && currentSection === 'home' && <Home />}
          {currentForm === 'login' && <Login onFormSwitch={switchForm} onClose={closeForm} onLogin={handleLogin} />}
          {currentForm === 'register' && <Register onFormSwitch={switchForm} onClose={closeForm} />}
        </div>
      )}
    </div>
  );
};

export default App;
