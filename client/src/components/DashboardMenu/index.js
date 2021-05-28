import React from 'react';
import PageTitle from '../PageTitle';
import { DashboardMenuWrapper } from './DashboardMenuStyles';
import Menu from './menu';

const DashboardMenu = ({ title, menu }) => {
  return (
    <DashboardMenuWrapper>
      <PageTitle title={title} />
      <Menu menu={menu} />
    </DashboardMenuWrapper>
  );
};

export default DashboardMenu;
