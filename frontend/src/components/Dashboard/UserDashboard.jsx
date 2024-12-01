import React, { useEffect } from 'react';
import Logout from '../button/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, userProfile } from '../../redux/slices/authSlice';
import ResearchForm from '../Research/ResearchForm';
import ResearchList from '../Research/ResarchList';
import EventList from '../Event/EventList';

const UserDashboard = () => {

  const dispatch = useDispatch();
  const {profile, loading, error} = useSelector((state) => state.auth);

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token){
      dispatch(setToken(token));
    }
    dispatch(userProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
    {/* header  */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '10vh',
      flexDirection: 'row'
    }}>

    <h1>User Dashboard</h1>
    <Logout />
    </div>

    {/* Profile  */}
    <div style={{
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'start',
      height: '30vh',
      flexDirection: 'row'
    }}>
      {profile && (
        <div key={profile}>
          <h3>Profile</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}

    </div>


      <ResearchForm />
      <ResearchList isAdmin={false} />

      <EventList isAdmin={false} />
    
  </>
  );
};

export default UserDashboard;
