import React, { useState } from 'react';
import { Button, Input } from '../../components/Index';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './../../services/Api'; 
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful', response);
            Cookies.set('token', response.token, { expires: 7 });
      navigate('/list');
    } catch (error) {
      console.error('Error logging in', error);
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', minWidth: '275px', background: 'grey', padding: '10px', margin: 'auto' }}>
      <h1>LOGIN PAGE</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <label>E-Mail</label>
      <Input name="email" value={formData.email} onChange={handleChange} />

      <label>Password</label>
      <Input name="password" type="password" value={formData.password} onChange={handleChange} />

      <div>
        <Button onClick={handleSubmit}>Login</Button>
        <Button onClick={() => navigate('/signup')}>Signup</Button>
      </div>
    </div>
  );
};

export default Login;
