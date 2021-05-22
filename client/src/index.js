import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import '../src/assets/tailwind.css';
import GlobalStyles from './components/GlobalStyles';
import { CartProvider } from './pages/cart/cartContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <CartProvider>
      <Routes />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
