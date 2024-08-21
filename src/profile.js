import React from "react";
import "./Profile.css";

const Profile = ({ user, onLogout, isOpen, onClose }) => {
  if (!isOpen) return null;

  const toggleProfile = () => {
    console.log("Profile clicked!"); // This should log when the user icon is clicked
    setProfileOpen(!profileOpen);
  };

  return (
    <div className="profile-dropdown">
      <i className="ri-arrow-left-s-line" onClick={onClose}></i>
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
