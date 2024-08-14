import React, { useState } from "react";
import './Form.css'; 
import axios from "axios";

const Login = ({ onFormSwitch, onClose, onLogin }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const [errors, setError] = useState({});

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        const validateErrors = {};

        if (!formData.email.trim()) {
            validateErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            validateErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            validateErrors.password ="Password should be at least 8 characters long";
        }

        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) {
            return;
        }

        try {
            const response = await axios.post('user.json',{
                email:formData.email,
                password:formData.password
            });

            onLogin(response.data.user);
        } catch(error) {
            setErrors({ form: 'Invalid email or password'});
        }
    };

  return (
    <div className="login-container">
      <div className="login-modal">
        <div className="login-modal-content">
          <span className="login-close" onClick={onClose}>&times;</span>
          <h2>Login</h2>
          <form className="log">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              name="email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
            <button type="submit" className="submit-btn">Login</button>
            <p className="signup-text">Don't have an account? <a href="#" className="login-link-home" onClick={() => onFormSwitch('register')}>Register</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
