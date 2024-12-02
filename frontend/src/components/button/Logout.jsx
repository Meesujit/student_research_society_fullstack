import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import { LogoutButton } from './LogoutButton';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    }
  return (
    <LogoutButton onClick={handleLogout} style={{ padding: '10px', margin: '10px' }}>
    Logout
  </LogoutButton>
  )
}

export default Logout