import React, { useState } from 'react';
import './auth.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-page container">
      <h2>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
