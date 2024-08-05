import React, { useEffect, useState } from "react";
import axios from "axios";
import milktart from "../src/images/desserts/melktert.jpg"

const Recipes = () => {
    const [recipeItems,setRecipeItems] = useState([])

    useEffect(() => {
        axios.get('/db.json')
           .then(Response => setRecipeItems(Response.data))
           .catch(error => console.error('Error fetching data:',error));
    },[]);
    return(
        <div className="container">
            <div className="meal">
                {recipeItems.map(item => (
                    <div key={item.id} className="recipe-item">
                        <p>{item.description}</p>
                        <img src={milktart}  />
                        <h3>{item.name}</h3>
                        <div className="ingredients">
                            <h4><u>ingredients</u></h4>
                            {item.ingredients.map((ingredient, index) => (
                                <p key={index} className="ingredient-item">{ingredient}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recipes;