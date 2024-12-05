import React, { useState } from 'react';
import logo from '../src/images/logo.png';
import 'remixicon/fonts/remixicon.css';
import Profile from './profile';

const Navbar = ({ onMenuClick, switchForm, loggedInUser, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLoginClick = () => {
    switchForm('login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <i className="ri-menu-3-line menu-icon" onClick={toggleMenu}></i>
        <img src={logo} className="logo" alt="Logo" />
        <h1><b>Recipe Foodie</b></h1>
        {loggedInUser ? (
          <div className="profile-menu">
            <a href="#" className="profile-link" onClick={toggleProfile}>
              <i className="ri-user-3-line"></i>{loggedInUser.name}
            </a>
            <a href="#" className="logout-link" onClick={onLogout}>
              <i className="ri-logout-box-line"></i>Logout
            </a>
          </div>
        ) : (
          <a href="#" className="login-link" onClick={handleLoginClick}>
            <i className="ri-user-3-line"></i>Login
          </a>
        )}
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h1><b>Recipe Foodie</b></h1>
          <img src={logo} className="menu-logo" alt="Menu Logo" />
          <i className="ri-arrow-right-line" onClick={toggleMenu}></i>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search Foodie ..." className="search-input" />
          <i className="ri-search-line search-icon"></i>
        </div>
        <ul>
          <li><a href="#" onClick={() => { onMenuClick('breakfast'); toggleMenu(); }}>BREAKFAST</a></li>
          <li><a href="#" onClick={() => { onMenuClick('lunch'); toggleMenu(); }}>LUNCH</a></li>
          <li><a href="#" onClick={() => { onMenuClick('dinner'); toggleMenu(); }}>DINNER</a></li>
          <li><a href="#" onClick={() => { onMenuClick('sandwich'); toggleMenu(); }}>SANDWICH</a></li>
        </ul>
        <div className="bordered-box"></div>
        <div className='privacy'></div>
        <div className='social'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-fill"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-twitter-x-fill"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-fill"></i>
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-pinterest-fill"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-youtube-fill"></i>
          </a>
        </div>
      </div>
      {profileOpen && (
        <div className={`profile-dropdown ${profileOpen ? 'open' : ''}`}>
          <Profile user={loggedInUser} onLogout={onLogout} isOpen={profileOpen} onClose={toggleProfile} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
