import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes.js';

export const addChannelSuccess = createAction('CHANNEL_ADD');
export const renameChannel = createAction('CHANNEL_RENAME');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const switchChannel = createAction('CHANNEL_SWITCH');
export const addMessageSuccess = createAction('MESSAGE_ADD');
export const openModal = createAction('OPEN_MODAL');
export const closeModal = createAction('CLOSE_MODAL');
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
