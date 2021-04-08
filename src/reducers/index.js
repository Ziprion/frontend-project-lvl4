import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions/index.js';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { msg } }) {
    const { data: { attributes } } = msg;
    return [...state, attributes];
  },
  [actions.renameChannel](state, { payload: { msg } }) {
    const { data: { attributes: { id, name } } } = msg;
    const index = _.findIndex(state, ['id', id]);
    const newState = _.update(state, `[${index}].name`, () => name);
    return [...newState];
  },
  [actions.removeChannel](state, { payload: { msg } }) {
    const { data: { id } } = msg;
    const newState = state.filter((channel) => channel.id !== id);
    return [...newState];
  },
}, []);

const messages = handleActions(
  {
    [actions.addMessageSuccess](state, { payload: { msg } }) {
      const { data: { attributes } } = msg;
      return [...state, attributes];
    },
  },
  [],
);
const currentChannelId = handleActions(
  {
    [actions.switchChannel](state, { payload: { id } }) {
      return id;
    },
  },
  1,
);
const modalInfo = handleActions(
  {
    [actions.openModal](state, { payload: { data } }) {
      return { ...state, ...data };
    },
    [actions.closeModal](state) {
      return { ...state, ...{ isOpened: false, type: null, extra: null } };
    },
  },
  { isOpened: false, type: null, extra: null },
);

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  modalInfo,
});
