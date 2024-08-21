import React, { useState } from "react";
import './Reg.css';

const Register = ({ onFormSwitch, onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    // Handles form input changes and updates formData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handles form submission and registration logic
    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = {};

        // Validate inputs
        if (!formData.username.trim()) {
            validateErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            validateErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validateErrors.email = "Email is not valid";
        }

        if (!formData.password.trim()) {
            validateErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            validateErrors.password = "Password should contain at least 8 characters";
        }

        if (formData.confirmPassword !== formData.password) {
            validateErrors.confirmPassword = "Passwords do not match";
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === formData.email);

        if (userExists) {
            validateErrors.email = "User already exists with this email";
        }

        setErrors(validateErrors);

        // If no errors, register the user
        if (Object.keys(validateErrors).length === 0) {
            users.push({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('users', JSON.stringify(users));

            alert("Registered Successfully");
            onFormSwitch('login');
        }
    };

    return (
        <div className="register-container">
            <div className="register-modal-content">
                <span className="register-close" onClick={onClose}>&times;</span>
                <h2>Register</h2>
                <form className="register" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                    
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    
                    <button type="submit" className="submit-btn">Submit</button>
                    <p className="signup-text">Already have an account? <a href="#" className="login-link-home" onClick={() => onFormSwitch('login')}>Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
