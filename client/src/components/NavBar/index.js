import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { UserContext } from '../../pages/user-account/userContext';
import { navData } from './navdata';
import { NavBarStyles, NavLink } from './styles';
import UserMenu from './UserMenu';

const NavBar = ({ history }) => {
  const { user } = useContext(UserContext);

  return (
    <NavBarStyles as="nav">
      <ul>
        {navData(user).map((link, index) =>
          link.menu ? (
            <UserMenu
              key={index}
              href={link.href}
              name={link.name}
              menu={link.menu}
            />
          ) : (
            <li key={index}>
              <NavLink
                to={link.href}
                isactive={
                  history.location.pathname === link.href ? 1 : undefined
                }
              >
                {link.name}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </NavBarStyles>
  );
};

export default withRouter(NavBar);
