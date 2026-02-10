import React, { useState } from 'react';

export default function TrackParcel() {
  const [code, setCode] = useState('');

  return (
    <div className="track-page container">
      <h2>Track Parcel</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Tracking code
          <input value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <button type="submit">Track</button>
      </form>
    </div>
  );
}
