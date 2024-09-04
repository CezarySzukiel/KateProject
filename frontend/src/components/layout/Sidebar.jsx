import React, { useState } from 'react';
import './Sidebar.css';
import { ConSearchBar } from '../../containers/Ex'

export const Sidebar = () => {
    const [isMenuClicked, setIsMenuClicked] = useState(true);

    const toggleMenu = () => {
        setIsMenuClicked(prevState => !prevState);
    };
    
    return (
        <div className={`sidebar ${isMenuClicked ? 'closed' : 'open'}`}>
            <div className="sidebar-content">
                <div>
                {!isMenuClicked && <ConSearchBar />}
                </div>
            </div>
            <button
                className={'sidebar-visibility-btn'}
                onClick={toggleMenu}
            >
                {isMenuClicked ? '>' : '<'}
            </button>
        </div>
  );
};
