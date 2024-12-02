import React from 'react';

import { NavbarContainer, NavLinks, NavLink } from './NavStyle';

import { adminNavItems, userNavItems } from '../constant/NavElement'
import UserProfile from '../profile/UserProfile';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Determine the navigation items based on the user's role
  const {profile} = useSelector((state) => state.auth);
  const navItems = profile?.role === 'admin' ? adminNavItems : userNavItems;
  
  // Add common nav items like Contact
  const allNavItems = [...navItems];

  return (
    <NavbarContainer>
      {/* Left Side Navigation Links */}
      <NavLinks>
        {allNavItems.map((item) => (
          <NavLink>
            <Link key={item.name} to={item.href}>
            {item.name}
            </Link>
          </NavLink>
        ))}
      </NavLinks>
      <UserProfile />
    </NavbarContainer>
  );
};

export default Navbar;
