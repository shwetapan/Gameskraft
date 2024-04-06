
import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css'; 
const AcceptRequest = () => {
    const [requests, setRequests] = useState([]);
  
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://api.example.com/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
  
    const handleAccept = async (requestId) => {
      try {
        const response = await axios.put(` https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/connection`);
        console.log('Request accepted successfully:', response.data);
        // Handle success response
      } catch (error) {
        console.error('Error accepting request:', error);
        // Handle error
      }
    };
  
    return (
      <div>
        <h2>Accept Requests</h2>
        <button onClick={fetchRequests}>Refresh Requests</button>
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <div>{request.message}</div>
              <button onClick={() => handleAccept(request.id)}>Accept</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default AcceptRequest;