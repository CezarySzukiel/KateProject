import "./menu.css"
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { logoutSuccess } from '../../actions/authActions';

export function Menu(props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

    const handleMenuHover = (isHovering) => {
        setIsMenuOpen(isHovering);
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/logout/', {
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 'key': props.loginToken, //todo it isn't necessary
                }),
            });
            
            if (response.ok) {
                console.log("logged out");
                props.logoutSuccess();
                navigate("/")    
            } else {
    	        console.log("logout error");
            }
        } catch (error) {
            console.error('error:', error);
        }
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
                            {props.isLoggedIn && 
                            <>
                            	<Link to={`user`}><button>użytkownik</button></Link>
                            	<Link to={`logout`}><button onClick={handleLogout}>Wyloguj</button></Link>
                        	</>
                        	}
                        	{!props.isLoggedIn &&
                        	<>
                            <Link to={`login`}><button>Zaloguj</button></Link>
                            <Link to={`register`}><button>Zarejestruj</button></Link>
                            </>
                        	}
                        </>
                    )}
                </div>
            </div>
    )

}