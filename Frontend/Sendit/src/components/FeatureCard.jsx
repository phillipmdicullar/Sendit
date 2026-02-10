import React from 'react';

export default function FeatureCard({ title, details }) {
  return (
    <div className="feature-card">
      <h4>{title}</h4>
      <p>{details}</p>
    </div>
  );
}
