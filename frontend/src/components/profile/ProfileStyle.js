import styled from 'styled-components';

// Profile Icon Container
export const UserProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// Profile Initials Icon
export const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
`;

// Profile Card
export const ProfileCard = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 300px;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 1000;

  h3 {
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #555;
  }
`;

// Logout Button
export const LogoutButton = styled.button`
  margin-top: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d32f2f;
  }
`;
