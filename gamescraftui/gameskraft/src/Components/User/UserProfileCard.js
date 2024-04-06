// UserProfileCard.js
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import RequestForm from '../Chat/RequestForm'; 
import AcceptRequest from '../Chat/AcceptRequest.js';
import UserDistanceCalculator from '../MatchUser/MatchUser.js';
const UserProfileCard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/profile/hari@gmail.com'); // Assuming the backend server is running on the same host
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    console.log(user)
    fetchUserData();
  }, []);

  return (
    <Card className="user-profile-card">
      <Card.Body>
        <Card.Title>User Profile</Card.Title>
        <Card.Text>    
        <p><strong>Name:</strong> {user && user.username}</p>
          <p><strong>Email:</strong> {user &&  user.email}</p>   
          <p><strong>Profession:</strong> {user &&  user.profession}</p>
        </Card.Text>
        <div className='chat-group'>
          <RequestForm />
         <AcceptRequest />
         <UserDistanceCalculator />
    </div>
      </Card.Body>
    </Card>
  );
};

export default UserProfileCard;
