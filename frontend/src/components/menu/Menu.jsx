import "./menu.css"
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { logoutSuccess } from '../../actions/authActions';

export function Menu(props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbar, setIsNavbar] = useState(false);

    const handleMenuHover = (isHovering) => {
        setIsMenuOpen(isHovering);
    }

    const handleLogout = () => {
        props.logoutSuccess();
        console.log("wyloogowano")
    };

    return (
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
                            <Link to={`logout`}><button onClick={handleLogout}>Wyloguj</button></Link>
                        </>
                    )}
                </div>
            </div>
    )

}