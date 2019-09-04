import React from 'react'
import {Link} from 'react-router-dom';

const NavBar = () =>  {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">Home</Link>
                    </div>
                </div>
            </nav>
        );
};

export default NavBar;
