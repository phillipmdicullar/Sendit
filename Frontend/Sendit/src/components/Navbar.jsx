import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import logo from '../assets/logo.png';
export default function Navbar() {
  return (
    <header className="site-navbar">
      <div className="container">
        <div className="brand"><img src={logo} alt="Sendit Logo" srcset="" /></div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/track">Track</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
