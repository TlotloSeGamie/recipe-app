import React from "react";
import hotel from '../images/Screenshot-logo.jpg';
import "./AboutUs.css";

const PrivacySecurity = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Welcome to Da Gamie Hotel & Resort</h1>
        <p>
          Nestled in the heart of luxury, **Da Gamie Hotel & Resort** offers an unparalleled experience of comfort, elegance, and tranquility. From our meticulously designed rooms to world-class amenities, every detail has been crafted to ensure your stay is unforgettable.
        </p>
        <p>
          Whether you're here for business, a romantic getaway, or a family vacation, our dedicated team is committed to delivering exceptional hospitality. Explore our exquisite dining options, rejuvenate at our spa, or unwind by the pool as you take in the breathtaking views.
        </p>
        <p>
          At Da Gamie Hotel & Resort, we don’t just provide a place to stay; we create memories that last a lifetime. Your journey to unmatched luxury begins here.
        </p>
        <div className="about-highlights">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Luxurious Accommodations</li>
            <li>State-of-the-art Facilities</li>
            <li>Exceptional Dining Experiences</li>
            <li>Personalized Services</li>
            <li>Idyllic Location and Scenic Views</li>
          </ul>
        </div>
      </div>
      <div className="about-image">
      <img src={hotel} alt="hotel" />
      </div>
    </div>
  );
};

export default PrivacySecurity;
