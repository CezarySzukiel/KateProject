import React from 'react';
import { Link } from "react-router-dom";
import './footer.css';

export function Footer() {
    return (
        <footer className="Footer">
            {/*<p>Napisz do nas</p>*/}
            <Link to={`/privacy-policy/`}><p>Polityka prywatności</p></Link>
            <p>Polityka Cookies</p>
            <p>Ustawienia plików cookie</p>
            <p>Regulamin</p>
            <p>kontakt</p>
            {/*<p>linki do mediów</p>*/}
            <p>App v 1.0.0</p>
        </footer>
    );
}

