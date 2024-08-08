import React from 'react';
import './App.css';
import Recipes from './recipes';
import Navbar from './navbar';
import Home from './home';
import Login from './login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Recipes/>
    </div>
  );
}

export default App;

