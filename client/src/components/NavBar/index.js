import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../pages/user-account/userContext';
import { CartContext } from '../../pages/cart/cartContext';
import { navData } from './navdata';
import {
  NavBarStyles,
  NavLink,
  CartIcon,
  NavLinkIcon,
  CartPill,
} from './styles';
import UserMenu from './UserMenu';

const NavBar = ({ history }) => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

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
        {user?.data?.role !== 'admin' && (
          <li>
            <NavLinkIcon
              to="/cart"
              isactive={history.location.pathname === '/cart' ? 1 : undefined}
            >
              {cart?.length > 0 && <CartPill>{cart.length}</CartPill>}
              <CartIcon />
              <span>Cart</span>
            </NavLinkIcon>
          </li>
        )}
      </ul>
    </NavBarStyles>
  );
};

export default withRouter(NavBar);
