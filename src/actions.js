import { EVENTS } from './constants.js';

export const getChatsStart = () => {
  return {
    type: EVENTS.GET_CHATS_START
  }
};

export const getChatsSuccess = (chats) => ({
  type: EVENTS.GET_CHATS_SUCCESS,
  payload: { chats }
});

export const getChatsFailure = (error) => ({
  type: EVENTS.GET_CHATS_FAILURE,
  payload: { error }
});
