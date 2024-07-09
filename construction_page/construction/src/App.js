import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css'; // Import your CSS file for styling
import axios from 'axios'

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

  const handleJoinWaitlist = async () => {
    try{
      // Simulate successful registration (replace with actual submission logic)
      const response = await axios.post('https://edusync-backend.vercel.app/api/storeEmail', {email:email} )

      console.log('Email submitted:', email);
      setRegistered(true);
      setShowEmailField(false);
      setShowConfetti(true);
  
      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);

    }
    catch(error){
      console.log(error)
    }
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
