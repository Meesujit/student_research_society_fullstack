import styled from 'styled-components';

// Navbar container
export const NavbarContainer = styled.nav`
  background-color: #2c3e50;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 18px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

// Navbar links container
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

// Navbar link
export const NavLink = styled.a`
  a{
  
  margin: 0 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #ecf0f1;
  }
  }
`;

// // Profile Icon and Dropdown
// export const ProfileDropdownContainer = styled.div`
//   position: relative;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
// `;

// export const ProfileIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   background-color: #4caf50;
//   color: white;
//   font-size: 18px;
//   font-weight: bold;
//   text-transform: uppercase;
// `;

// export const ProfileCard = styled.div`
//   position: absolute;
//   top: 50px;
//   right: 0;
//   background-color: white;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   width: 250px;
//   display: ${(props) => (props.visible ? 'block' : 'none')};
//   z-index: 1000;
// `;

// export const LogoutButton = styled.button`
//   margin-top: 16px;
//   background-color: #f44336;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   cursor: pointer;
//   font-size: 14px;

//   &:hover {
//     background-color: #d32f2f;
//   }
// `;
