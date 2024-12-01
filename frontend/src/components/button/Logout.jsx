import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }
  return (
    <button onClick={handleLogout} style={{ padding: '10px', margin: '10px' }}>
    Logout
  </button>
  )
}

export default Logout