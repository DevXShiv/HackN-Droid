import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/articles">Articles</Link>
    </nav>
  );
};

export default Navbar;
