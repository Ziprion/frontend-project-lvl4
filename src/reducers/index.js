import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "../actions/index.js";

const channels = handleActions({}, []);
const messages = handleActions(
  {
    [actions.addMessageSuccess](state, { payload: { message } }) {
      console.log("i have a event!");
      console.log(message);
      const {
        data: { attributes },
      } = message;
      return [...state, attributes];
    },
  },
  []
);
const currentChannelId = handleActions(
  {
    [actions.switchChannel](state, { payload: { id } }) {
      return id;
    },
  },
  1
);

export default combineReducers({
  messages,
  channels,
  currentChannelId,
});
