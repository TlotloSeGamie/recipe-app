import React from 'react';
import logo from '../src/images/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
        <img src={logo} className='logo' />
      <div className="navbar-top">
            <h1><b>Lekke Recipes for you</b></h1>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Desserts</a></li>
        <li><a href="/about">Meat</a></li>
        <li><a href="/services">Bread</a></li>
        <li><a href="/contact">Sauce</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;