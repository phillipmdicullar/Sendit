import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './hero.css';
import heroImage from '../assets/hero.png';
export default function HeroSection() {
  return (
<section className="hero">
  <div className="split">
    {/* LEFT */}
    <div className="left">
      <p className="badge">Lightning fast shipping</p>

      <div className="details">
        <h1>
          Send <span className="highlight">Parcels</span> Smarter. Track Deliveries in <span className="highlight">Real-Time</span>
        </h1>
        <p>
          Get instant delivery quotes, track your parcel, and receive real-time
          updates from pickup to doorstep
        </p>
      </div>

      <div className="hero-actions">
        <Link to="/signup">
          <Button className="primary">Get Started</Button>
        </Link>
        <Link to="/track">
          <Button>Track Parcel</Button>
        </Link>
      </div>
    </div>

    {/* RIGHT */}
    <div className="right">
      <img src={heroImage} alt="Delivery rider" loading="lazy" />
    </div>
  </div>
</section>

  );
}
