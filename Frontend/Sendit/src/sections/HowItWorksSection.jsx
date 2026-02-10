import React from 'react';
import StepItem from '../components/StepItem';

export default function HowItWorksSection() {
  const steps = [
    { step: 1, title: 'Request Pickup', detail: 'Schedule pickup online.' },
    { step: 2, title: 'We Collect', detail: 'Courier picks up your parcel.' },
    { step: 3, title: 'Delivery', detail: 'Parcel delivered to destination.' },
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((s) => (
            <StepItem key={s.step} step={s.step} title={s.title}>
              <p>{s.detail}</p>
            </StepItem>
          ))}
        </div>
      </div>
    </section>
  );
}
