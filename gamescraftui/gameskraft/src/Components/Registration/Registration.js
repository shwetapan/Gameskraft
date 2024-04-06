import React, { useState } from 'react';
import './RegistrationPage.css'; // Import CSS file for styling
import ToggleButton from '../Toggle/Toggle';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and submission
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Registration data:', formData);
    // Reset form fields after submission
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    // Post form data 
    if (errors.username === "" && errors.email === "" && errors.password === "" && errors.confirmPassword === "")
    {
      //  axios.post('http://localhost:8081/register', formData)
      //  .then(res => {
      //   navigate('/login')       
      //  })
      //  .catch(err => console.log(err))

      try {
        const response = await axios.post('https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/user', formData);
        console.log('Success:', response.data);
        // Handle success response
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };
  
    
  };

  return (
    <div className="registration-page">
      <div className="background-image"></div>
      <div className='cover_bg'></div>
      <div className="registration-form-container">
        <h2>Register Here</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">            
            <input
              type="text"
              id="username"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">            
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">            
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">            
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required              
              
            />
       
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className='btnn'>
          <button type="submit">Register</button>
          </div>
        </form>
        <div className='account'>
          <span>Already Have an Account? </span>
           <Link to="/login" className='login_link'>Log In</Link>
        </div>
      </div>
      <ToggleButton />
    </div>
  );
};

export default RegistrationPage;
