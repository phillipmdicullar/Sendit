import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-navbar">
      <div className="container">
        <div className="brand">
          <img src={Logo} alt="Sendit Logo" />
        </div>
        <button 
          className="menu-toggle" 
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <nav className={`nav-links ${open ? 'show' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/track">Track</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
