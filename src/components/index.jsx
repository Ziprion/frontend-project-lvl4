import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import reducers from '../reducers/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { addMessageSuccess } from '../actions/index.js';

const App = (gon) => {
  const randomName = faker.name.findName();
  const name = Cookies.get('name') === undefined ? Cookies.set('name', randomName, { expires: 1 }) : Cookies.get('name');
  console.log(name)
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
    <div className="row h-100 pb-3">
      <Provider store={store}>
        <Channels />
        <Messages nickname={name} />
      </Provider>
    </div>,
    document.getElementById('chat'),
  );
};

export default App;
