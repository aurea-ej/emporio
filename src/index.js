import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './provider';

ReactDOM.render(
  <React.StrictMode>
      <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
