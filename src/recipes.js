import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipes.css";

const Recipes = () => {
    const [recipeItems, setRecipeItems] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track if modal is open

    useEffect(() => {
        axios.get('/db.json')
            .then(response => setRecipeItems(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to open the modal
    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
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
                            <div className="view-button-container">
                                <button onClick={() => openModal(item)}>View</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        {selectedRecipe && (
                            <>
                                <h2>{selectedRecipe.name}</h2>
                                <img src={selectedRecipe.img} alt={selectedRecipe.name} />
                                <p>{selectedRecipe.description}</p>
                                <div className="ingred">
                                    <h4>Ingredients:</h4>
                                    <ul>
                                        {selectedRecipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="recipe-directions">
                                    <h4>Directions:</h4>
                                    <ol>
                                        {selectedRecipe.directions.map((direction, index) => (
                                            <li key={index}>{direction}</li>
                                        ))}
                                    </ol>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipes;
