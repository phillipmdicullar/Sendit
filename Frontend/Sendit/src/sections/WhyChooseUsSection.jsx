import React from 'react';
import FeatureCard from '../components/FeatureCard';

export default function WhyChooseUsSection() {
  const features = [
    { title: 'Reliable', details: 'Dependable delivery times.' },
    { title: 'Affordable', details: 'Competitive pricing.' },
    { title: 'Support', details: '24/7 customer support.' },
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <h2>Why Choose Sendit</h2>
        <div className="features-grid">
          {features.map((f) => (
            <FeatureCard key={f.title} title={f.title} details={f.details} />
          ))}
        </div>
      </div>
    </section>
  );
}
