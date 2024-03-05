import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(true);

  const toggleMenu = () => {
    setIsMenuClicked(prevState => !prevState);
  };

  return (
    <div className={`navbar ${isMenuClicked ? 'menu-open' : ''}`}>
      <div className="navbar-content">
        <h1>Navbar</h1>
        <button onClick={toggleMenu}> {isMenuClicked ? '>' : '<'} </button>
      </div>
    </div>
  );
};

export default Navbar;
