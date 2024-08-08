import React, { useState } from 'react';
import logo from '../src/images/logo.png';
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <i className="ri-menu-3-line menu-icon" onClick={toggleMenu}></i>
        <img src={logo} className="logo" alt="Logo" />
        <h1><b>Recipe Foodie</b></h1>
        <a href="#" className="login-link"><i className="ri-user-3-line"></i>Login</a>
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
          <li><a href="#">BREAKFAST</a></li>
          <li><a href="#">LUNCH</a></li>
          <li><a href="#">DINNER</a></li>
          <li><a href="#">SANDWICH</a></li>
          <li><a href="#">SALADS</a></li>
          <li><a href="#">DESSERTS</a></li>
          <li><a href="#">CAKES</a></li>
          <li><a href="#">KITCHEN TIPS</a></li>
          <li><a href="#">ABOUT US</a></li>
        </ul>
        <div className="bordered-box"></div>
        <a href="#" className="login-link"><i className="ri-user-3-line"></i>Login</a>
        <div className='social'>
          <i className="ri-facebook-fill"></i>
          <i className="ri-twitter-x-fill"></i>
          <i className="ri-instagram-fill"></i>
          <i className="ri-pinterest-fill"></i>
          <i className="ri-youtube-fill"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;