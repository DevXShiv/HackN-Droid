import React from "react";
import Auth from '../features/Auth';
import "../pages/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Branding Section (65%) */}
      <div className="home-left">
        <div className="branding-content">
          <div className="logo-badge">Narrative AI</div>
          <h1 className="text1">
            The world’s news, <br />
            <span className="text2">decoded in seconds.</span>
          </h1>
          <p id="text3">
            Join thousands of analysts using neural clustering to strip away
            media bias and find the core of every story.
          </p>

          {/* Subtle decorative element */}
          
        </div>
      </div>

      {/* Auth Section (35%) */}
      <div className="home-right">
        <Auth />
      </div>
    </div>
  );
};

export default Home;