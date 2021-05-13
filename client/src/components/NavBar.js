import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { isAuthenticated, signout } from '../utils/auth';

const NavBarStyles = styled.nav`
  ${tw`pb-4 mx-8 my-4 border-0 border-b border-gray-500 border-solid`}
  & {
    ul {
      ${tw`flex gap-4 list-none`}
    }
  }
`;

const NavLink = styled(Link)`
  ${tw`p-4 text-green-500 no-underline rounded-md hover:text-white`}
  ${(props) => props.isactive && tw`text-white bg-gray-900 shadow-md`}
`;

const SignOut = styled.span`
  ${tw`text-green-500 hover:text-white`}
`;

const NavBar = ({ history }) => {
  const navigation = () => {
    if (isAuthenticated() === false)
      return [
        { name: 'Home', href: '/' },
        { name: 'Sign In', href: '/users/signin' },
        { name: 'Sign Up', href: '/users/signup' },
      ];
    if (isAuthenticated().data.user.role === 'user') {
      return [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Cart', href: '/cart' },
      ];
    } else {
      return [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Products', href: '/admin/products' },
        { name: 'Categories', href: '/admin/categories' },
        { name: 'Orders', href: '/orders' },
      ];
    }
  };
  return (
    <NavBarStyles as="nav">
      <ul>
        {navigation().map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.href}
              isactive={history.location.pathname === link.href ? 1 : undefined}
            >
              {link.name}
            </NavLink>
          </li>
        ))}

        {isAuthenticated() && (
          <li>
            <SignOut onClick={() => signout(() => history.push('/'))}>
              Sign Out
            </SignOut>
          </li>
        )}
      </ul>
    </NavBarStyles>
  );
};

export default withRouter(NavBar);
