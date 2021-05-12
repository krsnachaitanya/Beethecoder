import React from 'react';
// import styled from 'styled-components';
// import tw from 'twin.macro';
import DashboardMenu from '../../../components/DashboardMenu';

const AdminDashboard = () => {
  const menu = [{ name: 'My Profile', href: '/me' }];
  return (
    <main>
      <DashboardMenu title="Dashboard" menu={menu} />
    </main>
  );
};

export default AdminDashboard;
