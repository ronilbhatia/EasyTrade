import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/store';
import { fetchStockInfo } from './actions/stock_actions';
// import { fetchStock, request, request2, fetchStockInfo } from './util/stock_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
    if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // window.request = request;
  // window.request2 = request2;
  window.fetchStockInfo = fetchStockInfo;
  // window.fetchStock = fetchStock;
  ReactDOM.render(<Root store={store}/>, root);
});
