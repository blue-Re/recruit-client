import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import './socket/index'

import './assets/css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

