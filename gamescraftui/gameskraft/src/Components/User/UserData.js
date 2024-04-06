import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/profile/ank@gmail.com'); // Replace with your API endpoint
        console.log(response)
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Data</h2>
      {userData && (
        <div>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user data fields as needed */}
        </div>
      )}
    </div>
  );
};

export default UserData;
