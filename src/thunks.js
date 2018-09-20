// @flow

import {
  getChatsStart,
  getChatsSuccess,
  getChatsFailure
} from './actions.js';

import type { Dispatch, Chat } from './types.js';
import { ERROR_MESSAGE, GET_CHATS_URL } from './constants';

export const getChats = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getChatsStart());
    try {
      return fetch(
        GET_CHATS_URL
      ).then((response: Response) =>
        response.json()
      ).then((data: Array<Chat>) =>
        dispatch(getChatsSuccess(data))
      );
    } catch (error) {
      dispatch(getChatsFailure(ERROR_MESSAGE));
      return Promise.reject();
    }
  };
}
