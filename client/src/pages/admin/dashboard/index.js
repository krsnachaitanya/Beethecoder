import React from 'react';
// import styled from 'styled-components';
// import tw from 'twin.macro';
import DashboardMenu from '../../../components/DashboardMenu';
import { isAuthenticated } from '../../../utils/auth';

const AdminDashboard = () => {
  const {
    data: {
      user: { name, email, role },
    },
  } = isAuthenticated();
  const menu = [{ name: 'Products', href: '/' }];
  return (
    <main>
      <DashboardMenu title="Dashboard" menu={menu} />
    </main>
  );
};

export default AdminDashboard;
