import {
  getChatsStart,
  getChatsSuccess,
  getChatsFailure
} from './actions.js';

import { ERROR_MESSAGE } from './constants';

export const getChats = () => {
  return (dispatch) => {
    dispatch(getChatsStart());
    try {
      fetch(
        'https://api.sweep.im/api/v3/public/chats'
      ).then((response) =>
        response.json()
      ).then((data) =>
        dispatch(getChatsSuccess(data))
      );
    } catch (error) {
      dispatch(getChatsFailure(ERROR_MESSAGE));
    }
  };
}
