import React, { useState } from 'react';
import './LoginForm.css'; // Import CSS file for styling
import ToggleButton from '../Toggle/Toggle';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({   
    email: '',
    password: '',
   
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform login authentication here
    console.log('Login data:', formData);
    // Reset form fields after submission
    setFormData({
      email: '',
      password: '',
    });
    if ( errors.email === "" && errors.password === "")
    {
       axios.get('https://old8ijdqlj.execute-api.ap-south-1.amazonaws.com/prod/user/hari@gmail.com')
       .then(res => {
        if(res.status === 200)
        {
          navigate('/UserLogin')
          console.log(res)
        }
        else{
          alert("No record Found")
          console.log(res)
        }
       })
       .catch(err => console.log('error'))
    }
  };

  return (
    <div className="login-container">
        
      <div className="login-image"></div>
      <div className='cover_bgg'></div>
      
      <div className="login-form-container"> 
         <h2>Login Here</h2> 
        <div className='login-form-info'>    
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">            
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter your Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
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
          </div>
         
          <div className='login-btnn'>
          <button type="submit">Login</button>
          </div>
          <div className="form-group fp-link">
          <Link to="/ForgotPassword" className='pass-link'>Forgotten Password?</Link>
          </div>
        </form>
        <div className='df-acct'><span>Don’t have an account?</span>
         <Link to="/" className="df-acct-a">Register</Link></div>
      </div>
     <ToggleButton />
    </div>   
    </div> 
    
  );
};

export default LoginForm;
