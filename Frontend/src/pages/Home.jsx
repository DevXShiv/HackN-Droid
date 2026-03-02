// src/Home.js

import React from "react";
import Auth from '../features/Auth';
import "../pages/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-left">
        {/* 65% Empty Section */}
      </div>

      <div className="home-right">
        <Auth />
      </div>
    </div>
  );
};

export default Home;