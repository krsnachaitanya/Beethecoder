import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import '../src/assets/tailwind.css';
import GlobalStyles from './components/GlobalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
