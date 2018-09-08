import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import './index.css';
import App from './components/App/app';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import { history } from "./history";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
