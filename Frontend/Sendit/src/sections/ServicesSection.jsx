import React from 'react';
import ServiceCard from '../components/ServiceCard';

export default function ServicesSection() {
  const services = [
    { title: 'Same-day Delivery', description: 'Quick local delivery.' },
    { title: 'International', description: 'Ship worldwide with confidence.' },
    { title: 'E-commerce Solutions', description: 'Integrated fulfillment.' },
  ];

  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
