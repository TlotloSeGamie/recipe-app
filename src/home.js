import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = ({ currentForm, switchForm }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [shuffledRecipes, setShuffledRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || {
          breakfast: [],
          lunch: [],
          dinner: [],
          sandwich: []
        };

        const userRecipes = [
          ...storedRecipes.breakfast.filter(recipe => recipe.userId === loggedInUser),
          ...storedRecipes.lunch.filter(recipe => recipe.userId === loggedInUser),
          ...storedRecipes.dinner.filter(recipe => recipe.userId === loggedInUser),
          ...storedRecipes.sandwich.filter(recipe => recipe.userId === loggedInUser)
        ];

        const categories = ['breakfast', 'lunch', 'dinner', 'sandwich'];
        const apiRecipes = [];

        for (const category of categories) {
          const response = await axios.get(`/${category}.json`);
          if (Array.isArray(response.data)) {
            apiRecipes.push(...response.data);
          }
        }

        const combinedRecipes = [...userRecipes, ...apiRecipes];
        const shuffled = shuffleArray(combinedRecipes);
        setAllRecipes(combinedRecipes);
        setShuffledRecipes(shuffled);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [loggedInUser]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleViewClick = (item) => {
    setSelectedRecipe(item);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className="random-recipes-container">
        <h2>Explore Our Recipes</h2>
        <div className="recipe-grid">
          {shuffledRecipes.length > 0 ? (
            shuffledRecipes.map(item => (
              <div key={item.id} className="recipe-card">
                <div className="recipe-img-container">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="recipe-info">
                  <h3 className="recipe-name">{item.name}</h3>
                  <p className="recipe-description">{item.description.slice(0, 150)} ......</p>
                  <button className="view-button" onClick={() => handleViewClick(item)}>
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </div>

      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedRecipe.name}</h2>
            <img src={selectedRecipe.img} alt={selectedRecipe.name} />
            <p>{selectedRecipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Directions</h3>
            <ul>
              {selectedRecipe.directions.map((direction, index) => (
                <li key={index}>{direction}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
