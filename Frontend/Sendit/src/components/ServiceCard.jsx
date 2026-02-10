import React from 'react';

export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="service-card">
      {icon && <div className="service-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
