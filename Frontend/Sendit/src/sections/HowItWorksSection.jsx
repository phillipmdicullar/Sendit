import React from 'react';
import './how.css';
import Profile from '../assets/how/Profile.png';
import Create from '../assets/how/Create.png'
import Navigate from '../assets/how/Navigate.png'
import Updates from '../assets/how/Updates.png'
import '../components/feature.css';
export default function HowItWorksSection() {

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <img src={Profile} alt="Profile" />
            <h4>Create an account</h4>
            <p className="style">Manage it</p>
          </div>
          <div className="step">
            <img src={Create} alt="Profile" />
            <h4>Create a parcel order</h4>
            <p className="style">Add a new order</p>
          </div>
          <div className="step">
            <img src={Navigate} alt="Navigate" />
            <h4>Track parcel in real time</h4>
            <p className="style">See where it is</p>
          </div>
          <div className="step">
            <img src={Updates} alt="Updates" />
            <h4>Receive delivery updates</h4>
            <p className="style">Get real time updates</p>
          </div>
        </div>
      </div>
    </section>
  );
}
