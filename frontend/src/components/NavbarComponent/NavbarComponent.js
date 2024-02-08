import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const toggleMenu = () => {
    setIsMenuClicked(prevState => !prevState);
  };

  return (
    <div className={`navbar ${isMenuClicked ? 'menu-open' : ''}`}>
      <h1>Navbar</h1>
      <button onClick={toggleMenu}> {isMenuClicked ? '>' : '<'} </button>
    </div>
  );
};

export default Navbar;
