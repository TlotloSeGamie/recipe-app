import React, { useState, useEffect } from 'react';
import './AddRecipeForm.css';

const AddRecipeForm = ({ closeForm, addRecipe, recipe, editMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        img: '',
        description: '',
        ingredients: '',
        directions: '',
        category: 'breakfast', 
    });

    useEffect(() => {
        if (editMode && recipe) {
            setFormData({
                name: recipe.name,
                img: recipe.img,
                description: recipe.description,
                ingredients: recipe.ingredients.join(', '),
                directions: recipe.directions.join(', '),
                category: recipe.category,
            });
        }
    }, [editMode, recipe]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedIngredients = formData.ingredients.split(',').map(ingredient => ingredient.trim());
        const parsedDirections = formData.directions.split(',').map(direction => direction.trim());

        const newRecipe = {
            ...formData,
            ingredients: parsedIngredients,
            directions: parsedDirections,
            id: editMode ? recipe.id : Date.now(), 
            isLocal: !editMode, 
            userId: localStorage.getItem('loggedInUser'), 
        };

        addRecipe(newRecipe); 

        closeForm(); 
    };

    return (
        <div className="add-recipe-form-modal">
            <div className="form-content">
                <span className="close-button" onClick={closeForm}>&times;</span>
                <h2>{editMode ? 'Edit Recipe' : 'Add New Recipe'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Recipe Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="img" value={formData.img} onChange={handleChange} required />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                    <label>
                        Ingredients (comma-separated):
                        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />
                    </label>
                    <label>
                        Directions (comma-separated):
                        <textarea name="directions" value={formData.directions} onChange={handleChange} required />
                    </label>
                    <label>
                        Category:
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="sandwich">Sandwich</option>
                        </select>
                    </label>
                    <button type="submit">{editMode ? 'Update Recipe' : 'Submit'}</button>
                    <button type="button" onClick={closeForm} className="cancel-button">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeForm;
