import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import GlobalStyles from './components/GlobalStyles';
import { CartProvider } from './pages/cart/cartContext';
import { UserProvider } from './pages/user-account/userContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <UserProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
