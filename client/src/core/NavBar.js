import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
// import { MenuIcon, XIcon } from '@heroicons/react/outline';

const NavBarStyles = styled.nav`
  ${tw`bg-gray-800`}
  & {
    ul {
      ${tw`flex gap-8 list-none`}
    }
  }
`;

const NavLink = styled(Link)`
  ${tw`text-white no-underline hover:text-green-500`}
  ${(props) => props.isactive && tw`text-green-500`}
`;

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Cart', href: '/cart' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Admin Dashboard', href: '/admin/dashboard' },
  { name: 'Signup', href: '/signup' },
  { name: 'Signin', href: '/signin' },
  { name: 'Signout', href: '/singout' },
];

const NavBar = ({ history }) => {
  return (
    <NavBarStyles as="nav">
      <ul>
        {navigation.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.href}
              isactive={history.location.pathname === link.href ? 1 : undefined}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </NavBarStyles>
  );
};

NavBar.propTypes = {
  history: PropTypes.object,
};

export default withRouter(NavBar);
