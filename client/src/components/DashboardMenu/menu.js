import React, { useState } from 'react';
import {
  Icon,
  MenuStyles,
  MenuButton,
  MenuItem,
  MenuLink,
  MenuOptions,
} from './DashboardMenuStyles';

const Menu = ({ menu, title = 'Menu' }) => {
  const [open, setOpen] = useState(false);
  return (
    <MenuStyles
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <MenuButton>
        <span>{title}</span>
        <Icon aria-hidden="true" />
      </MenuButton>
      {open && (
        <MenuOptions>
          <ul>
            {menu.map((item, i) => (
              <MenuItem key={i}>
                <MenuLink to={item.href}>{item.name}</MenuLink>
              </MenuItem>
            ))}
          </ul>
        </MenuOptions>
      )}
    </MenuStyles>
  );
};

export default Menu;
