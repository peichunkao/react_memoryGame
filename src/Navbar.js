import React from 'react';
import './Navbar.css';

export default function Navbar(props) {
    return (
        <header className='navbar'>
            <h2><a>Memory Game</a></h2>
            <nav>
                <li><a onClick={props.handleNewGame}>New Game</a></li>
            </nav>
        </header>
    )
}
