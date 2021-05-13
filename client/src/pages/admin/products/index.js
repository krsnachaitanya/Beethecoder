import React from 'react';
import DashboardMenu from '../../../components/DashboardMenu';
import productMenu from './productMenu';

const Products = () => {
  return (
    <main>
      <DashboardMenu title="Products" menu={productMenu} />
    </main>
  );
};

export default Products;
