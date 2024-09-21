import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components/Index';
import { createUser } from './../../services/Api';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await createUser({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log('Signup successful', response);
      setErrorMessage('')
      navigate('/list');
    } catch (error) {
      console.error('Error signing up', error);
      setErrorMessage('Error during signup. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', minWidth: '275px', background: 'grey', padding: '10px', margin: 'auto' }}>
      <h1>SIGNUP PAGE</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <label>Username</label>
      <Input name="username" value={formData.username} onChange={handleChange} />
      
      <label>E-Mail</label>
      <Input name="email" value={formData.email} onChange={handleChange} />
      
      <label>Password</label>
      <Input name="password" type="password" value={formData.password} onChange={handleChange} />
      
      <label>Confirm Password</label>
      <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
      
      <div>
        <Button onClick={handleSubmit}>Signup</Button>
        <Button onClick={() => navigate('/')}>Login</Button>
      </div>
    </div>
  );
};

export default Signup;
