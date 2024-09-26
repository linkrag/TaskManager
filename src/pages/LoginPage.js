import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomFloatLabelInput from '../components/CustomFloatLabelInput';
import CustomButton from '../components/CustomButton';
import './LoginPage.css';
import CryptoJS from 'crypto-js';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const encryptedPassword = CryptoJS.SHA256(password).toString();
      const response = await axios.post('http://localhost:5002/login', {
        username,
        password: encryptedPassword,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usr_id', response.data.id);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  return (
    <div className="login-page">
      <div className="card-login">
        <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
        <div className="p-field p-col-12 p-md-4">
          <CustomFloatLabelInput
            id="inputtext-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />
        </div>

        <div className="p-field p-col-12 p-md-4">
          <CustomFloatLabelInput
            id="inputtext-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="login-buttons">
          <div className="p-field p-col-12 p-md-4" >
            <CustomButton
              label="Login"
              icon="pi pi-sign-in"
              onClick={handleLogin}
              className="login-button"
            />
          </div>

          <div className="p-field p-col-12 p-md-4">
            <CustomButton
              label="Cadastrar"
              icon="pi  pi-user-plus"
              onClick={handleRegister}
              className="login-button"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
