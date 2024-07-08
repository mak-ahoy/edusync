import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

function JoinWaitlist() {
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleJoinClick = () => {
    setShowEmailField(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleJoinWaitlist = () => {
    // Simulate successful registration (replace with actual submission logic)
    console.log('Email submitted:', email);
    setRegistered(true);
  };

  return (
    <div className="JoinWaitlist">
      <header className="JoinWaitlist-header">
        {/* <img src={logo} className="JoinWaitlist-logo" alt="logo" /> */}
        <p>
          {registered ? 'Thank you!' : 'Join our Waitlist'}
        </p>
        {!showEmailField ? (
          <button onClick={handleJoinClick} className="JoinWaitlist-button">
            Join
          </button>
        ) : (
          <div className="JoinWaitlist-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="JoinWaitlist-input"
            />
            <button onClick={handleJoinWaitlist} className="JoinWaitlist-button">
              Submit
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default JoinWaitlist;
