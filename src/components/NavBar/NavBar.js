import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <div className="nav_inner glass" style={{ paddingTop: 0 }}>
    <ul>
      <span style={{ marginRight: 'auto' }}>
        <li>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo_white.svg`}
              alt="Anabasis Logo"
              className="logo"
              width="240"
              height="56"
            />
          </Link>
        </li>
      </span>
      <li>
        <a href="https://x.com/AnabasisRPG">           
          <img 
              style={{ opacity: 0.5 }}
              src={`${process.env.PUBLIC_URL}/assets/images/X_icon_2.svg`}
              alt="X Logo"
              className="x-logo"
              width="28"
              height="auto"
            /></a>
      </li>
    </ul>
  </div>
);
