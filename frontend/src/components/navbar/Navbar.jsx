import React, { useState } from 'react';
import './navbar.css';
import { ConSearchBar } from '../../containers/Ex'

export const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(true);

  const toggleMenu = () => {
    setIsMenuClicked(prevState => !prevState);
  };

  return (
    <div className={`navbar ${isMenuClicked ? 'menu-open' : ''}`}>
      <div className="navbar-content">
        <h1>Navbar</h1>
        <div>
          <ConSearchBar />
        </div>
        <button onClick={toggleMenu}> {isMenuClicked ? '>' : '<'} </button>
      </div>
    </div>
  );
};
