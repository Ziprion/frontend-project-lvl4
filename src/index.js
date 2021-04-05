// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import chat from './components/index.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

chat(gon);
