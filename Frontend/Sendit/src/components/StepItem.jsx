import React from 'react';

export default function StepItem({ step, title, children }) {
  return (
    <div className="step-item">
      <div className="step-number">{step}</div>
      <div className="step-content">
        <h5>{title}</h5>
        <div>{children}</div>
      </div>
    </div>
  );
}
