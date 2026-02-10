import React from "react";
import ServiceCard from "../components/ServiceCard";
import "./service.css";
import Service1 from "../assets/service/1.jpg";
import Service2 from "../assets/service/2.jpg";
import Service3 from "../assets/service/3.jpg";
import Service4 from "../assets/service/4.jpg";
export default function ServicesSection() {
  return (
    <section className="services">
      <p>Our Services</p>
      <div className="container">
        <div className="image-container">
          <img src={Service1} alt="example" className="image" />
          <div className="overlay">
            <span className="overlay-text">Real Time Tracking</span>
          </div>
        </div>
         <div className="image-container">
          <img src={Service2} alt="example" className="image" />
          <div className="overlay">
            <span className="overlay-text">Secure Handling</span>
          </div>
        </div>
         <div className="image-container">
          <img src={Service3} alt="example" className="image" />
          <div className="overlay">
            <span className="overlay-text">Email Notification</span>
          </div>
        </div>
         <div className="image-container">
          <img src={Service4} alt="example" className="image" />
          <div className="overlay">
            <span className="overlay-text">Same Day Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
