import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes.js';

export const addChannel = createAction('CHANNEL_ADD');
export const switchChannel = createAction('CHANNEL_SWITCH');
export const addMessageSuccess = createAction('MESSAGE_ADD');
export const addMessage = (message) => async () => {
  try {
    const {
      data: {
        attributes: { channelId },
      },
    } = message;
    await axios.post(routes.channelMessagesPath(channelId), message);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
