import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './header.css'
// import { logoutSuccess } from '../../actions/authActions';
import { ConnectedMenu } from "../../containers/Auth"
import { Navbar } from "../navbar/Navbar";

export function Header() {
    const [isNavbar, setIsNavbar] = useState(false);

    const handleExercisesClick = () => {
        console.log('wyszukaj');
        setIsNavbar(true)
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
                <Link to={`game`}><button>Gra</button></Link>
            </div>    
            <ConnectedMenu />
            {isNavbar &&
            <Navbar />
            }
        </div>
    );
}
