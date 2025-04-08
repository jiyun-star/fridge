import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <nav className="nav-links">
          <Link to="/">        <div className="logo">🍴 OTF</div></Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/recipes">Favorite</Link>


        </nav>
      </div>
    </div>
  );
}

export default Header;
