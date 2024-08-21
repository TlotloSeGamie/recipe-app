import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recipes.css";
import AddRecipeForm from "./AddRecipeForm";

const Breakfast = ({ selectedMenu, goHome }) => {
    const [recipeItems, setRecipeItems] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        sandwich: []
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormVisible, setFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        const fetchRecipes = async () => {
            if (selectedMenu) {
                const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || {
                    breakfast: [],
                    lunch: [],
                    dinner: [],
                    sandwich: []
                };
    
                const userRecipes = {
                    breakfast: storedRecipes.breakfast.filter(recipe => recipe.userId === loggedInUser),
                    lunch: storedRecipes.lunch.filter(recipe => recipe.userId === loggedInUser),
                    dinner: storedRecipes.dinner.filter(recipe => recipe.userId === loggedInUser),
                    sandwich: storedRecipes.sandwich.filter(recipe => recipe.userId === loggedInUser)
                };
    
                setRecipeItems(userRecipes);
    
                try {
                    const response = await axios.get(`/${selectedMenu}.json`);
                    if (Array.isArray(response.data)) {
                        setRecipeItems(prevState => {
                            const filteredApiRecipes = response.data.filter(apiRecipe => 
                                !prevState[selectedMenu].some(localRecipe => localRecipe.id === apiRecipe.id)
                            );
                            
                            const combinedRecipes = {
                                ...prevState,
                                [selectedMenu]: [...filteredApiRecipes, ...prevState[selectedMenu]]
                            };
                            return combinedRecipes;
                        });
                    } else {
                        console.error('Expected an array but got:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching data', error);
                }
            }
        };
    
        fetchRecipes();
    }, [selectedMenu, loggedInUser]);
    

    const addRecipe = (newRecipe) => {
        setRecipeItems(prevState => {
            const updatedRecipes = {
                ...prevState,
                [newRecipe.category]: [...prevState[newRecipe.category], { ...newRecipe, isLocal: true }]
            };
            localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            return updatedRecipes;
        });
    };

    const updateRecipe = (updatedRecipe) => {
        setRecipeItems(prevState => {
            const updatedRecipes = {
                ...prevState,
                [updatedRecipe.category]: prevState[updatedRecipe.category].map(recipe =>
                    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
                )
            };
            localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            return updatedRecipes;
        });
    };

    const deleteRecipe = (id, category) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            setRecipeItems(prevState => {
                const updatedRecipes = {
                    ...prevState,
                    [category]: prevState[category].filter(recipe => recipe.id !== id)
                };
                localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
                return updatedRecipes;
            });
        }
    };

    const handleViewClick = (item) => {
        setSelectedRecipe(item);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    const handleEditClick = (recipe) => {
        setEditMode(true);
        setFormVisible(true);
        setSelectedRecipe(recipe);
    };

    const handleDeleteClick = (id, category) => {
        deleteRecipe(id, category);
    };

    const filteredRecipes = recipeItems[selectedMenu]?.filter(item => 
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
            <div className="button-container">
                <button className="home-button" onClick={goHome}>Home</button>
                <button className="add-recipe" onClick={() => { setEditMode(false); setFormVisible(true); }}>Add Recipe</button>
            </div>

            {isFormVisible && (
                <AddRecipeForm
                    closeForm={() => setFormVisible(false)}
                    addRecipe={editMode ? updateRecipe : addRecipe}
                    recipe={editMode ? selectedRecipe : null}
                    editMode={editMode}
                />
            )}

            {filteredRecipes && filteredRecipes.length > 0 ? (
                <div className="recipe-grid">
                    {filteredRecipes.map(item => (
                        <div key={item.id} className="recipe-card" onClick={() => handleViewClick(item)}>
                            <div className="recipe-img-container">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="recipe-info">
                                <h3 className="recipe-name">{item.name}</h3>
                                <p className="recipe-description">{item.description}</p>
                                <div className="recipe-actions">
                                    <button className="view-button" onClick={(e) => { e.stopPropagation(); handleViewClick(item); }}>View</button>
                                    {item.isLocal && (
                                        <>
                                            <button className="edit-button" onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}>Edit</button>
                                            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteClick(item.id, selectedMenu); }}>Delete</button>
                                        </>
                                    )}
                                </div>
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

export default Breakfast;
