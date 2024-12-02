import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setToken, userProfile } from '../../redux/slices/authSlice';
import Logout from '../button/Logout';
import { ProfileCard, ProfileIcon, UserProfileContainer } from './ProfileStyle';


const UserProfile = () => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(setToken(token)); // Save the token to the Redux state
            dispatch(userProfile());  // Fetch profile using token
        } else {
            // Assume admin if no token is present (can adjust logic if needed)
            dispatch(userProfile());
        }
    }, [dispatch]);

    const toggleCardVisibility = () => setIsCardVisible((prev) => !prev);


    if (loading) return <p>Loading profile...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <UserProfileContainer>
            <ProfileIcon onClick={toggleCardVisibility}>
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </ProfileIcon>
            <ProfileCard visible={isCardVisible}>
                {profile ? (
                    <>
                        <h3>{profile.role === 'admin' ? 'Admin Profile' : 'User Profile'}</h3>
                        <p>
                            <strong>Name:</strong> {profile.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {profile.role}
                        </p>
                        <Logout />
                    </>
                ) : (
                    <p>No profile data available.</p>
                )}
            </ProfileCard>
        </UserProfileContainer>
    );

};
export default UserProfile;