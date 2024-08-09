import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipes.css";

const Recipes = () => {
    const [recipeItems, setRecipeItems] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        axios.get('/breakfast.json')
            .then(response => setRecipeItems(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleViewClick = (item) => {
        setSelectedRecipe(item);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="recipe-container">
            <div className="recipe-grid">
                {Array.isArray(recipeItems) && recipeItems.map(item => (
                    <div key={item.id} className="recipe-card">
                        <div className="recipe-img-container">
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className="recipe-info">
                            <h3 className="recipe-name">{item.name}</h3>
                            <p className="recipe-description">{item.description}</p>
                            <button onClick={() => handleViewClick(item)}>View</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <div className="recipe-info-modal">
                            <div className="recipe-img-modal">
                                <img src={selectedRecipe.img} alt={selectedRecipe.name} />
                            </div>
                            <h3 className="recipe-name-modal">{selectedRecipe.name}</h3>
                            <p className="recipe-description-modal">{selectedRecipe.description}</p>
                            <div className="ingred-modal">
                                <h4>Ingredients</h4>
                                <ul>
                                    {selectedRecipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="recipe-directions-modal">
                                <h4>Directions</h4>
                                <ol>
                                    {selectedRecipe.Directions.map((direction, index) => (
                                        <li key={index}>{direction}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipes;