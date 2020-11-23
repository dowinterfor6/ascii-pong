import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';

// Removed StrictMode since it was calling reducer twice
// Technically not best practice with my use of reducers, but oh well
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
