import './header.css'
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ConMenu } from "../../containers/Auth"
import { setNavbarDisplay } from '../../actions/layoutActions'


export function Header() {
    const dispatch = useDispatch()

    const handleExercisesClick = () => {
        dispatch(setNavbarDisplay(true))
    }

    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <a href="/home/">
                    <img src="/images/logos/logo.png" alt="Logo" />
                </a>
            </div>
                <div className="buttonsContainer">
                    <Link to={`sections`}><button onClick={handleExercisesClick}>Zadania</button></Link>
                    <Link to={`blog`}><button>Blog</button></Link>
                    <Link to={`game`}><button>Gra</button></Link>
                </div>    
            <ConMenu />
            
        </div>
    );
}
