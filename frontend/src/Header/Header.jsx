import React from 'react';
import logo from './myopenports.svg';

import './Header.css'

export default function () {

    return <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} alt="MyOpenPorts.com go to home"/>
                    <span className="website-name has-text-grey-dark">
                        MyOpenPorts
                        <span className="has-text-grey-light">.com</span>
                    </span>
                </a>
            </div>
        </div>
    </nav>;
}