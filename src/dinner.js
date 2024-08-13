import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipes.css";

const Dinner = ({ selectedMenu, goHome }) => {
    const [recipeItems, setRecipeItems] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (selectedMenu === 'dinner') {
            axios.get('/dinner.json')
                .then(response => {
                    console.log('Fetched data:', response.data);
                    if (Array.isArray(response.data)) {
                        setRecipeItems(response.data);
                    } else {
                        console.error('Expected an array but got:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data', error);
                });
        }
    }, [selectedMenu]);

    const handleViewClick = (item) => {
        setSelectedRecipe(item);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    const filteredRecipes = recipeItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="recipe-container">
            <div className="search-container-lunch">
                <input 
                    type="text" 
                    placeholder="Search recipes..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-input" 
                />
                <i className="ri-search-line search-icon"></i>
            </div>
            <button className="home-button" onClick={goHome}>Home</button>
            
            {filteredRecipes.length > 0 ? (
                <div className="recipe-grid">
                    {filteredRecipes.map(item => (
                        <div key={item.id} className="recipe-card" onClick={() => handleViewClick(item)}>
                            <div className="recipe-img-container">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="recipe-info">
                                <h3 className="recipe-name">{item.name}</h3>
                                <p className="recipe-description">{item.description}</p>
                                <button className="view-button" onClick={(e) => { e.stopPropagation(); handleViewClick(item) }}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found.</p>   
            )}

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
                                    {selectedRecipe.ingredients && Array.isArray(selectedRecipe.ingredients) && selectedRecipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="recipe-directions-modal">
                                <h4>Directions</h4>
                                <ol>
                                    {selectedRecipe.directions && Array.isArray(selectedRecipe.directions) && selectedRecipe.directions.map((direction, index) => (
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
};

export default Dinner;
