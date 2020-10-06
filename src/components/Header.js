import React from 'react';

function Header() {
    return (
        <header className="Header">
            <div>
                <h1>today's weather</h1>
            </div>
           
            <nav>
                <a href="/?city=Seoul">seoul</a>
                <a href="/?city=Chicago">chicago</a>
                <a href="/?city=Toronto">toronto</a>
                <a href="/?city=Shanghai">shanghai</a>
            </nav>
        </header>
    );
}

export default Header;