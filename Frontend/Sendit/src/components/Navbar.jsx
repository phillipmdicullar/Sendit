import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hiddenRoutes = ['/admin-dashboard', '/user'];

  const hideNavbar = hiddenRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    document.body.classList.toggle('has-navbar', !hideNavbar);

    return () => {
      document.body.classList.remove('has-navbar');
    };
  }, [hideNavbar]);

  if (hideNavbar) return null;

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
          <Link to="/user">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}