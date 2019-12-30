import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let store;
  if (window.currentUser1) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser1.id]: window.currentUser1 }
      },
      session: { id: window.currentUser1.id }
    };
    store = configureStore(preloadedState);
    // If user was on dark mode before page refresh they should be still
    if (localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    delete window.currentUser1;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, root);
});
