// import React, { useState } from 'react';
// import Confetti from 'react-confetti';
// import axios from 'axios';
// import './App.css'; // Import your CSS file for styling

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const validateEmail = (email) => emailRegex.test(email);

// function JoinWaitlist() {
//   const [email, setEmail] = useState('');
//   const [registered, setRegistered] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [error, setError] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleJoinWaitlist = async (event) => {
//     event.preventDefault();

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email.');
//       return;
//     }

//     try {
//       const response = await axios.post('https://edusync-backend.vercel.app/api/storeEmail', { email });

//       if (response.data.content) {
//         setRegistered(true);
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 5000);
//       } else {
//         setError(response.data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Error:', error.response || error.message);
//       setError('Something went wrong');
//     }
//   };

//   return (
//     <div className="JoinWaitlist">
//       <header className="JoinWaitlist-header">
//         {showConfetti && <Confetti />}
//         <h1>{registered ? 'Thank You! We will notify you with the latest updates' : 'Join Our Waitlist'}</h1>
//         {!registered && (
//           <form className="JoinWaitlist-form" onSubmit={handleJoinWaitlist}>
//             <input
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               placeholder="Enter your email"
//               className="JoinWaitlist-input"
//             />
//             <button type="submit" className="JoinWaitlist-button">
//               {registered ? 'Success!' : 'Join'}
//             </button>
//           </form>
//         )}
//         {error && <p className="error">{error}</p>}
//         {!registered && (
//           <p className="JoinWaitlist-pitch">
//             Join EduBoost: the all-in-one productivity platform designed to simplify and enhance your teaching experience.
//           </p>
//         )}
//       </header>
//     </div>
//   );
// }

// export default JoinWaitlist;


import React, { useState } from 'react';
import './App.css';
import './css/form.css'

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
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch('https://edusync-backend.vercel.app/api/storeEmail', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.content) {
        setButtonText('Success!');
      } else {
        setButtonText('Try again');
        setButtonDisabled(false);
        setResult(data.message);
      }
    } catch (err) {
      console.error(err);
      setButtonText('Try again');
      setButtonDisabled(false);
      setResult('Something went wrong');
    }
  };

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img className="logo" src="./logo.svg" alt="logo" />
        </div>
      </header>
      <div className="container">
      <h1>Join EduSync: The All-in-One Productivity Platform for Teachers</h1>
      <p>
         EduSync simplifies and enhances your teaching experience by providing access to various tools in one place.
         Whether you need curriculum design, classroom management, or other educational aids, EduBoost has you covered. 
         Streamline your workflow and focus on what you do best—teaching.
      </p>
      <p>Sign up for our waitlist and be the first to experience our platform.
          Help us shape the future of education tools with your feedback.</p>
        <form className="join-wrapper" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={buttonDisabled}>
            {buttonText}
          </button>
        </form>
        <p className="result">{result}</p>
        {/* <div className="creators" style={{ textAlign: 'center', marginTop: '20px'}}>
            
            <p>Sign up for our waitlist and be the first to experience our platform.</p>
            <p>Help us shape the future of education tools with your feedback.</p>
        </div> */}
      </div>
    </div>
  );
};

export default App;

