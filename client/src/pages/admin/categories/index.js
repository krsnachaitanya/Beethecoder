import React from 'react';
import DashboardMenu from '../../../components/DashboardMenu';
import categoryMenu from './categoryMenu';

const Categories = () => {
  return (
    <main>
      <DashboardMenu title="Categories" menu={categoryMenu} />
    </main>
  );
};

export default Categories;
