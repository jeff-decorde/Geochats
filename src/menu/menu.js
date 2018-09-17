// @flow

import React from 'react';
import ROUTES from './routes.js';
import logo from '../assets/artech-logo.png';

const Menu = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://artechglobal.com.au/">
        <img src={logo} alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
      </a>
    </div>
  </nav>
);

export default Menu;
