import React, { useState } from "react";
import './Form.css'; 

const Login = ({ onFormSwitch, onClose, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = {};

        if (!formData.email.trim()) {
            validateErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validateErrors.email = "Email is not valid";
        }

        if (!formData.password.trim()) {
            validateErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            validateErrors.password = "Password must contain at least 8 characters";
        }

        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) {
            return; 
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === formData.email && user.password === formData.password);

        if (user) {
            onLogin(user); 
            window.location.href = '/';
        } else {
            setErrors({ form: 'Invalid email or password' });
        }
    };

    return (
        <div className="login-container">
            <div className="login-modal">
                <div className="login-modal-content">
                    <span className="login-close" onClick={onClose}>&times;</span>
                    <h2>Login</h2>
                    <form className="log" onSubmit={handleSubmit}>
                        {errors.form && <span className="error">{errors.form}</span>}
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
                        <button type="submit" className="submit-btn">Login</button>
                        <p className="signup-text">Don't have an account? <a href="#" className="login-link-home" onClick={() => onFormSwitch('register')}>Register</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
