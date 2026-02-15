import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="app-root">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
}
