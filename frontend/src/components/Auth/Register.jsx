import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slices/authSlice';
import {useNavigate} from 'react-router-dom';
import { Button, ErrorMessage, Form, Input } from './AuthStyle';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await dispatch(signup(formData)).unwrap();
     navigate('/login');
      
    } catch (error) {
      
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Register</h3>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Form>
  );
};

export default Register;
