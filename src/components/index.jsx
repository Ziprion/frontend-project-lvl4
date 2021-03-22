import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from '../reducers/index.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';


const App = (gon) => {

	const initState = gon;
	let webSocket = new WebSocket('wss://www.peaceful-harbor-25225.herokuapp.com/');
	console.log('asd' + webSocket.readyState);
	console.log('asd' + webSocket.protocol);
	setTimeout(() => console.log('asd' + webSocket.readyState),5000)
	/* eslint-disable no-underscore-dangle */
	const store = createStore(
  	reducers,
  	initState,
  	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	);
	/* eslint-enable */

	ReactDOM.render(
		<div className="row h-100 pb-3">
			<Provider store={store}>
				<Channels />
				<Messages />
			</Provider>
		</div>,
		document.getElementById('chat'),
	);	
}

export default App;
