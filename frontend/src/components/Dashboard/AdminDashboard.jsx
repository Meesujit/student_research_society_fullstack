import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Logout from '../button/Logout';
import { userProfile } from '../../redux/slices/authSlice';
// import { fetchResearches } from '../../redux/slices/researchSlice';
import ResearchList from '../Research/ResarchList';
import EventJoin from '../Event/EventJoin';
import EventList from '../Event/EventList';



const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {profile, loading, error} = useSelector((state) => state.auth);




  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;


  return (
    <>
    
    <div>
      {/* Heading  */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        flexDirection: 'row'
      }}>
      <h3>Admin Dashboard</h3>
      <Logout />
      </div>

      {/* Profile  */}
      <div style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        height: '20vh',
        flexDirection: 'column',
      }}>

      {profile && (
        <div style={{
          marginBottom: '20px'
        }}>
          <h3>Profile</h3>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Role:</strong> {profile?.role}</p>
        </div>
      )}      
    </div>
  </div>
    {/* Research Papers  */}

      <ResearchList isAdmin={true} />

      {profile?.role === 'admin' ? <EventJoin  /> : <p>You do not have permission to create events.</p>}

      <EventList isAdmin={true} />

      
    

  </>
  );
};

export default AdminDashboard;
