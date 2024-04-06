import React, { useState } from 'react';

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return distance;
}

const UserDistanceCalculator = () => {
  const [referenceUser, setReferenceUser] = useState({
    latitude: 26.907524, // Latitude of reference user (e.g., New York City)
    longitude: 75.739621 // Longitude of reference user (e.g., New York City)
  });

  const [users, setUsers] = useState([
    { id: 1, latitude: 16.814524, longitude: 81.526558, user:"test1", email:"test1@gmail.com" }, // User in Los Angeles
    { id: 2, latitude:21.097855, longitude: 81.033707 ,user:"test2", email:"test2@gmail.com"},   // User in London
    { id: 3, latitude: 26.907328, longitude: 75.733451,user:"test3", email:"test3@gmail.com" }     // User in Paris
  ]);

  const [closestUser, setClosestUser] = useState(null);
  const [minDistance, setMinDistance] = useState(Infinity);

  const findClosestUser = () => {
    let minDistance = Infinity;
    let closestUser = null;

    users.forEach(user => {
      const distance = calculateDistance(referenceUser.latitude, referenceUser.longitude, user.latitude, user.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closestUser = user;
      }
    });

    setMinDistance(minDistance);
    setClosestUser(closestUser);
  };

  return (
    <div>
      <h2>Closest Gamers</h2>
    
      <button onClick={findClosestUser}>Find Closest User</button>
      {closestUser && (
        <div>
          <p>Closest User: {closestUser.id}</p>
          <p>Closest UserName: {closestUser.user}</p>
          <p>Closest UserEmail: {closestUser.email}</p>
          <p>Minimum Distance: {minDistance} km</p>
        </div>
      )}
    </div>
  );
};

export default UserDistanceCalculator;
