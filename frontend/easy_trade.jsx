import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render(<h1><Root store={store}/></h1>, root);
});
