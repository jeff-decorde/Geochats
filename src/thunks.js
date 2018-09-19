import {
  getChatsStart,
  getChatsSuccess,
  getChatsFailure
} from './actions.js';

import { ERROR_MESSAGE, GET_CHATS_URL } from './constants';

export const getChats = () => {
  return async (dispatch) => {
    dispatch(getChatsStart());
    try {
      return fetch(
        GET_CHATS_URL
      ).then((response) =>
        response.json()
      ).then((data) =>
        dispatch(getChatsSuccess(data))
      );
    } catch (error) {
      console.log(error.message);
      dispatch(getChatsFailure(ERROR_MESSAGE));
      return Promise.reject();
    }
  };
}
