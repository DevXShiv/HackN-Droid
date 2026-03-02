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
          <h1>
            The world’s news, <br />
            <span>decoded in seconds.</span>
          </h1>
          <p>
            Join thousands of analysts using neural clustering to strip away
            media bias and find the core of every story.
          </p>

          {/* Subtle decorative element */}
          <div className="glow-mesh"></div>
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