import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css'; 
const RequestForm = () => {
  const requestData = [
    {
    "user1" : "ank@gmail.com",
    "user2" : "sowmya@gmail.com"
    }
  ]

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(' https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/connection', requestData);
      console.log('Request submitted successfully:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Send Request</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};
export default RequestForm;