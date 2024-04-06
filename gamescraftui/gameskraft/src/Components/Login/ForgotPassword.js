import React, { useState } from 'react';
import './ForgotPassword.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot Password submitted for email:', email);
    setMessage('Password reset instructions have been sent to your email.');
  };

  return (
    <div className="container-group">
         <div className='background-image'></div>
    <div className='container-group-2'>
       
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-10">
         
          <input
            type="email"
            id="email"
            value={email}
            placeholder='EmailAddress'
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">
          Reset Password
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default ForgotPassword;
