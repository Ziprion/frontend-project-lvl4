// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './components/index.jsx';

import '../assets/application.scss';

import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
console.log(gon)
App(gon);
