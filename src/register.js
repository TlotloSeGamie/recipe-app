import React from "react";

const Register = ({ onFormSwitch, onClose }) => {
  return (
    <div className="login-container">
      <div className="login-modal-content">
        <span className="login-close" onClick={onClose}>&times;</span>
        <h2>Register</h2>
        <form className="log">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            required
          />
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
          <label htmlFor="cornfim-password">Confirm Password</label>
          <input 
            type="password"
            placeholder="confirm password"
            name="confirm-password"
            required
          /> 
          <button type="submit" className="submit-btn">Submit</button>
          <p className="signup-text">Already have an account? <a href="#" className="login-link-home" onClick={() => onFormSwitch('login')}>Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
