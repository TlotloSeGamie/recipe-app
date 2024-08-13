import React from "react";
import foodie from "../src/images/foodie home.jpg";
import axios from "axios";
import Login from "./login";

const Home = ({ onFormSwitch }) => {
    return(
        <div className="home-container">
            <img src={foodie} className="food" />
            <div className="para">
                <p><b>Welcome to our recipe haven, where the art of cooking meets the love of food! Here, every recipe is a journey, and every dish is a celebration of flavors. Whether you're crafting hearty meals or decadent desserts, our page is your guide to creating culinary masterpieces. Dive into a world of delicious possibilities, where each recipe is designed to inspire and delight. Let's cook with passion, savor every bite, and transform every meal into a memorable experience. Join us in turning everyday ingredients into extraordinary dishes!</b></p>
            </div>
            <div className="footer">
                <a href="#" className="login-link" onClick={() => onFormSwitch('log')}><i className="ri-user-3-line"></i>Login</a>
                
            </div>
        </div>
        
    )
}

export default Home;