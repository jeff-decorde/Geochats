import { EVENTS } from './constants.js';

export const getChatsStart = () => ({
  type: EVENTS.GET_CHATS_START
});

export const loadMoreChats = () => ({
  type: EVENTS.LOAD_MORE_CHATS
});

export const getChatsSuccess = (chats) => ({
  type: EVENTS.GET_CHATS_SUCCESS,
  payload: { chats }
});

export const getChatsFailure = (error) => ({
  type: EVENTS.GET_CHATS_FAILURE,
  payload: { error }
});
