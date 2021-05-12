import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import {
  DashboardMenuWrapper,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuLink,
  MenuOptions,
} from './DashboardMenuStyles';

const DashboardMenu = ({ title, menu }) => {
  const [open, setOpen] = useState(false);
  return (
    <DashboardMenuWrapper>
      <PageTitle title={title} />
      <Menu>
        <MenuButton onClick={() => setOpen(!open)}>
          <span>Menu</span>
          <Icon aria-hidden="true" />
        </MenuButton>
        {open && (
          <MenuOptions>
            {menu.map((item, i) => (
              <MenuItem key={i}>
                <MenuLink to={item.href}>{item.name}</MenuLink>
              </MenuItem>
            ))}
          </MenuOptions>
        )}
      </Menu>
    </DashboardMenuWrapper>
  );
};

export default DashboardMenu;
