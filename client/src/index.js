import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';

import { Web3Provider } from './components/web3';

ReactDOM.render(
  <Web3Provider>
    <App />
  </Web3Provider>,
  document.getElementById('root'),
);
