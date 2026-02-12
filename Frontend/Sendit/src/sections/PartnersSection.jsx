import React from 'react';
import './partners.css';
import Amazon from '../assets/Amazon.svg';
import Coca from '../assets/Coca.svg';
import FedEx from '../assets/FedEx.svg';
import IBM from '../assets/IBM.svg';
import Walmart from '../assets/Walmart.svg';
import Logo from '../assets/Logo.svg';

const LOGOS = [Amazon, FedEx, IBM, Walmart, Coca, Logo];

export default function PartnersSection() {
  return (
    <section className="partners">
      <h2>Our partners</h2>
      <div className="container">
        <div className="partner-logos">
          <div className="marquee" aria-hidden>
            {LOGOS.concat(LOGOS).map((src, i) => (
              <div className="logo" key={i}>
                <img src={src} alt={`partner-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
