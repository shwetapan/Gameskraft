// UserProfileForm.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserProfileForm = ({ user }) => {
  const navigate = useNavigate();
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const [consent, setConsent] = useState(false);  
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { value: 'Music', label: 'Music' },
    { value: 'Singing', label: 'Singing' },
    { value: 'Travelling', label: 'Travelling' },
   
    // Add more options as needed
  ];
  const [formData, setFormData] = useState({
    phoneNumber: '',
    age: '',
    gender: '',
    profession: '',
    location: '',
    pincode: '',
    address: '',
    bio: '',
  });
  const [errors, setErrors] = useState({   
    phoneNumber: '',
    age: '',
    gender: '',
    profession: '',
    location: '',
    pincode: '',
    address: '',
    bio: '',
   
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };
  const avatars = [
    'https://via.placeholder.com/150?text=Avatar+1',
    'https://via.placeholder.com/150?text=Avatar+2',
    'https://via.placeholder.com/150?text=Avatar+3',
    'https://via.placeholder.com/150?text=Avatar+4',
    // Add more avatar URLs as needed
  ];
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  
  const handleConsentChange = () => {
    setConsent(!consent);
  };
  

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.username);
    }
  }, [user]);

 
  const handleSubmit = async(e) => {
    e.preventDefault();   
    const userData = { ...formData, email ,name}
    console.log('form data:', userData);
    setFormData({
      phoneNumber: '',
      age: '',
      gender: '',
      profession: '',
      location: '',
      pincode: '',
      address: '',
      bio: '',
    });
    try {
      const response = await axios.put('https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/profile/hari@gmail.com', userData)
      .then(res => {
        if(res.status === 200)
        {
          navigate('/UserProfileCard')
          console.log('Profile data submitted successfully:', response.data);
        }  
       })
      
      // Handle success response
    } catch (error) {
      console.error('Error submitting profile data:', error);
      // Handle error
    }
  };

  return (
    <div className='container-profile'>
     <div className='user-profile-group'>
        <div className='user-heading'>
            <h2>Profile Information</h2>
        </div>
     <div className='user-profile-form'>
    <form onSubmit={handleSubmit}>
    <div className="input-container">
      
        <input type="text" value={name} placeholder=""  disabled={user ? true : false}/>
      
      </div> 
      <div className="input-container">
      
        <input type="email" value={email}  disabled={user ? true : false} />
      
      </div>
      <div className="input-container">
      
      <input type="tel" id="phoneNumber" name="phoneNumber" minLength={10} value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number"/>
      
      </div>
      <div className="input-container">
      <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
      </div>
      <div className="input-container">
      <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
      </div>
      <div className="input-container">      
      <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            placeholder='Profession'
            onChange={handleChange}
            required
          />
    </div> 
    <div className="input-container">
        <textarea value={formData.address} name="address" placeholder="Address" onChange={handleChange} required/>      
      </div>
      <div className="input-container">
        <textarea value={formData.bio} name="bio" placeholder="Bio" onChange={handleChange} required/>      
      </div>

      <div className="input-container">
        <div className='pin-group'>
        <input type="text" value={formData.location} name="location" placeholder="Latitude" onChange={handleChange} required/>
        <input type="text" value={formData.pincode} name="pincode" onChange={handleChange}  placeholder="Longitude" required/>
        </div>
      </div>
     
      <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" className="check" checked={consent} onChange={handleConsentChange} required/>
        <label>I consent to share my location</label>
      </div>
     
    <div className='avatar-group' style={{textAlign:"left"}}>
      <p  style={{textAlign:"left",fontSize:"1.5em"}}>Select Your Avatar</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {avatars.map((avatar, index) => (
        <div className='avatar-img'>  
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            style={{
              width: '100px',
              height: '100px',
              margin: '5px',
              border: selectedAvatar === avatar ? '2px solid blue' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleAvatarClick(avatar)} 
          />
          </div>
        ))}
      </div>
      <p>Selected Avatar:</p>
      <div className='select-avatar' style={{marginBottom: "20px"}}>
      {selectedAvatar && <img src={selectedAvatar} alt="Selected Avatar" />}
      </div>
    </div>
    <div className="input-container">
      <p style={{textAlign:"left",fontSize:"1.5em"}}>Select your Interests</p>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        options={options}
        required
      />
      <p>Selected Options: {selectedOptions.map(option => option.label).join(', ')}</p>
    </div>
      <div className='btn-group-save'>
      <button type="submit">Save</button>
      </div>
    </form>
    </div>
    </div>
    </div>
  );
};

export default UserProfileForm;
