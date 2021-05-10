import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
// import { MenuIcon, XIcon } from '@heroicons/react/outline';

const NavBarStyles = styled.nav`
  ${tw`bg-gray-800`}
  & {
    ul {
      ${tw`list-none`}
    }
  }
`;

const NavLink = styled(Link)`
  ${tw`text-yellow-100 no-underline`}
`;

const NavBar = () => {
  return (
    <NavBarStyles as="nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/">Admin Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/">Sign Out</NavLink>
        </li>
      </ul>
    </NavBarStyles>
  );
};

export default withRouter(NavBar);
