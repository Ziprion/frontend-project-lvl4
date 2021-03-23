import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from "../reducers/index.js";
import Channels from "./Channels.jsx";
import Messages from "./Messages.jsx";
import { io } from "socket.io-client";
import thunk from 'redux-thunk';
import faker from 'faker';


const App = (gon) => {
  const socket = io();
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  const initState = gon;
  const randomName = faker.name.findName(); // Rowan Nikolaus
  console.log(randomName)
  /* eslint-disable no-underscore-dangle */
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  const store = createStore(
    reducers,
    initState,
    compose(
		applyMiddleware(thunk),
		//devtoolMiddleware,
	),
  );
  /* eslint-enable */

  ReactDOM.render(
    <div className="row h-100 pb-3">
      <Provider store={store}>
        <Channels />
        <Messages author={randomName}/>
      </Provider>
    </div>,
    document.getElementById("chat")
  );
};

export default App;
