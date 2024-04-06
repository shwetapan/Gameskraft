import React, { useState , useEffect} from 'react';
import UserProfileForm from './UserProfileForm';
import UserProfileCard from './UserProfileCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css'
import axios from 'axios';
const UserLogin = () => {
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

    fetchUserData();
  }, []);

  return (
    <div className="container user-group-0">
      {user && 
        <UserProfileForm user={user} />
     }
    </div>
  );
};

export default UserLogin;
