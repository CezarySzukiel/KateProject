import React, { useEffect, useState } from 'react';

import './Header.css'

import Navbar from "../NavbarComponent/NavbarComponent.jsx";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbar, setIsNavbar] = useState(false);

    const handleButtonClick = () => {
        console.log('Kliknięto przycisk');
    }

    const handleExercisesClick = () => {
        console.log('wyszukaj');
        setIsNavbar(true)
    }

    const handleMenuHover = (isHovering) => {
        setIsMenuOpen(isHovering);
    }
    
    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <a href="/">
                    <img src="/images/logos/logo.jpg" alt="Logo" />
                </a>
            </div>
            <div className="buttonsContainer">
                <button onClick={handleExercisesClick}>Zadania</button>
                <button onClick={handleButtonClick}>Gra</button>
            </div>    
             <div className="dropdown"
                onMouseEnter={() => handleMenuHover(true)}
                onMouseLeave={() => handleMenuHover(false)}
            >
                <button className="dropbtn">Menu</button>
                <div className="dropdownOptions">
                    {isMenuOpen && (
                        <>
                            <button href="#">Użytkownik</button>
                            <button href="#">Opcja 2</button>
                            <button href="#">Opcja 3</button>
                        </>
                    )}
                </div>
            </div>
            {isNavbar &&
            <Navbar />
            }
        </div>
    );
}

export default Header;