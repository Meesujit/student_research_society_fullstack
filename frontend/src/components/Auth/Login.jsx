import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import {useNavigate} from 'react-router-dom';
import { Button, ErrorMessage, Form, Input } from './AuthStyle';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const result = await dispatch(login(credentials)).unwrap();
     if(result.user.role === 'admin'){
      navigate('/admin-dashboard')
     }else{
       navigate('/user-dashboard');
     }
    } catch (error) {
      
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Login</h3>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
};

export default Login;
