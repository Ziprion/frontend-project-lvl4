import { createAction } from 'redux-actions';

export const addChannel = createAction('CHANNEL_ADD');
export const switchChannel = createAction('CHANNEL_SWITCH');
export const addMessage = createAction('MESSAGE_ADD');