import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { io } from 'socket.io-client';
import reducers from '../reducers/index.js';
import { addMessageSuccess } from '../actions/index.js';
import App from './App.jsx';

const chat = (gon) => {
  const initState = gon;
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  /* eslint-enable */
  const store = createStore(
    reducers,
    initState,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );
  const socket = io();
  socket.on('connect', () => {
    console.log('connect!');
    socket.on('newMessage', (msg) => {
      store.dispatch(addMessageSuccess({ msg }));
      const messageBox = document.getElementById('messages-box');
      messageBox.scrollTop = messageBox.scrollHeight;
    });
  });
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default chat;
