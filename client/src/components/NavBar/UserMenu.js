import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../pages/user-account/userContext';
import { MenuItem, MenuLink, NavLinkMenu, Icon } from './styles';

const UserMenu = ({ pathname, menu, href, name }) => {
  const { signout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <MenuLink
        to={href}
        isactive={pathname.split('/')[1] === href.split('/')[1] ? 1 : undefined}
      >
        <span>{name}</span>
        <Icon
          isactive={
            isOpen || pathname.split('/')[1] === href.split('/')[1]
              ? 1
              : undefined
          }
        />
      </MenuLink>
      {isOpen && (
        <NavLinkMenu>
          <ul>
            {menu.map((link, index) => (
              <MenuItem key={index}>
                <Link to={link.href}>{link.name}</Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Link
                to="/"
                onClick={() =>
                  signout(() => {
                    history.push('/');
                    setIsOpen(false);
                  })
                }
              >
                Sign Out
              </Link>
            </MenuItem>
          </ul>
        </NavLinkMenu>
      )}
    </li>
  );
};

export default UserMenu;
