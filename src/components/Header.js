import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Logo Around The US"
                className="header__logo"
            />
        </header>
    );
};

export default Header;