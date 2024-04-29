import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './header.css'
import { ConMenu } from "../../containers/Auth"
import { Navbar } from "../navbar/Navbar";

export function Header() {
    const [isNavbar, setIsNavbar] = useState(false);

    const handleExercisesClick = () => {
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
                <Link to={`sections`}><button onClick={handleExercisesClick}>Zadania</button></Link>
                <Link to={`game`}><button>Gra</button></Link>
            </div>    
            <ConMenu />
            {isNavbar &&
            <Navbar />
            }
        </div>
    );
}
