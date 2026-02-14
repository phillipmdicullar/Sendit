import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on user dashboard routes
  if (location.pathname.startsWith('/admin-dashboard')) return null;

  // Add a body class while navbar is mounted so global padding only applies when navbar exists
  useEffect(() => {
    document.body.classList.add('has-navbar');
    return () => document.body.classList.remove('has-navbar');
  }, []);

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
          <Link to="/admin-dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
