import React from 'react';
import './how.css';
import Create from '../assets/how/create.png';
import Order from '../assets/how/order.png';
import Track from '../assets/how/Track.png';
import Deliver from '../assets/how/Deliver.png';
export default function HowItWorksSection() {

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          <img src={Create} alt="Create" srcset="" />
          <img src={Order} alt="Order" srcset="" />
          <img src={Track} alt="Track" srcset="" />
          <img src={Deliver} alt="Deliver" srcset="" />
        </div>
      </div>
    </section>
  );
}
