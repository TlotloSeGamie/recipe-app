import React from 'react';
import './App.css';
import Recipes from './recipes';
import Navbar from './navbar';
import Home from './home';
import Login from './login';
import Breakfast from './breakfast';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Recipes/>
      <Breakfast/>
    </div>
  );
}

export default App;

