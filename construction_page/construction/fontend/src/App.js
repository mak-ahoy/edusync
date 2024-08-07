
import React, { useState } from 'react';
import './App.css';
import './css/form.css'
import axios from 'axios'

const App = () => {
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState('Join waitlist');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setResult('Please enter your email');
      return;
    }
    
    setButtonText('Sending...');
    setButtonDisabled(true);

    try {



      const uri = 'https://edusync-backend.vercel.app/storeEmail';
      // const uri = 'http://localhost:8000/storeEmail'


      const response = await axios.post(uri, {
        email:email
      });



      if (response.data) {
        setButtonText('Success!');
        setResult('Thank you for joining the waitlist!');
      } else {
        setButtonText('Try again');
        setButtonDisabled(false);
        setResult(response.data.message);
      
      }
    } catch (err) {
      // console.error(err);
      setButtonText('Try again');
      setButtonDisabled(false);
      setResult('Something went wrong');
    }
  };

  return (
    <div className="App background">
      <header className = "header">
        <div className="logo">
          <img className="logo" src="./logo.svg" alt="logo" />
        </div>
      </header>
      <div className="container">
      <h1>Join EduSync: The All-in-One Productivity Platform for Teachers</h1>
      <p style={{"color":"white", "marginTop":"20px"}}>
         EduSync simplifies your teaching experience by providing access to various tools in one place.
         Whether you need curriculum design, classroom management, or other educational aids, EduSync has you covered. 
         Streamline your workflow and focus on what you do best—teaching.
      </p>
      <p style={{"color":"white"}}>Sign up for our waitlist and be the first to experience our platform.</p>
        <form className="join-wrapper" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={buttonDisabled} style={{"color":"white", "backgroundColor":"purple"}} onClick={handleSubmit}>
            {buttonText}
          </button>
        </form>
        <p className="result" style={{"color":"white", overflow: "hidden"}}>{result}</p>

      </div>
    </div>
  );
};

export default App;

