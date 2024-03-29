import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './Header.css'

import { Navbar } from "../Navbar/Navbar";

export function Header() {
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
                <Link to={`exercises`}><button onClick={handleExercisesClick}>Zadania</button></Link>
                <Link to={`game`}><button onClick={handleButtonClick}>Gra</button></Link>
            </div>    
             <div className="dropdown"
                onMouseEnter={() => handleMenuHover(true)}
                onMouseLeave={() => handleMenuHover(false)}
            >
                <button className="dropbtn">Menu</button>
                <div className="dropdownOptions">
                    {isMenuOpen && (
                        <>
                            <Link to={`user`}><button>użytkownik</button></Link>
                            <Link to={`login`}><button>Zaloguj</button></Link>
                            <Link to={`register`}><button>Zarejestruj</button></Link>
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
