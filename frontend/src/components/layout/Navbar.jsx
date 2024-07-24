import React, { useState } from 'react';
import './navbar.css';
import { ConSearchBar } from '../../containers/Ex'

export const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(true);

  const toggleMenu = () => {
    setIsMenuClicked(prevState => !prevState);
  };

  return (
    <div className={`navbar ${isMenuClicked ? 'closed' : 'open'}`}>
      <div className="navbar-content">
        <div>
          {!isMenuClicked && <ConSearchBar />}
        </div>
      </div>
      <button onClick={toggleMenu}> {isMenuClicked ? '>' : '<'} </button>
    </div>
  );
};
