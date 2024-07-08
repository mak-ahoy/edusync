import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css'; // Import your CSS file for styling

function JoinWaitlist() {
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
    setShowEmailField(false);
    setShowConfetti(true);

    // Hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="JoinWaitlist">
      <header className="JoinWaitlist-header">
        {showConfetti && <Confetti />}
        <p>
          {registered ? 'Thank you!' : 'Join our Waitlist'}
        </p>
        {(!showEmailField && !registered) && (
          <button onClick={handleJoinClick} className="JoinWaitlist-button">
            Join
          </button>
        )}
        {showEmailField && !registered && (
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
