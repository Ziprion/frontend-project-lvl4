import { createAction } from "redux-actions";
import routes from "../routes.js";
import axios from "axios";

export const addChannel = createAction("CHANNEL_ADD");
export const switchChannel = createAction("CHANNEL_SWITCH");
export const addMessageSuccess = createAction("MESSAGE_ADD");
export const addMessage = (request) => async (dispatch) => {
  try {
    const {
      data: {
        attributes: { channelId },
      },
    } = request;
    const response = await axios.post(
      routes.channelMessagesPath(channelId),
      request
    );
    console.log(response);

    dispatch(addMessageSuccess({ message: response.data }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
