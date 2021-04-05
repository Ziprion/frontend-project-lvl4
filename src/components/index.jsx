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
import NameContext from './NameContext';

const App = (gon) => {
  const randomName = faker.name.findName();
  if (Cookies.get('name') === undefined) {
    Cookies.set('name', randomName, { expires: 1 });
  }
  const name = Cookies.get('name');
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
        <NameContext.Provider value={name}>
          <Messages />
        </NameContext.Provider>
      </Provider>
    </div>,
    document.getElementById('chat'),
  );
};

export default App;
