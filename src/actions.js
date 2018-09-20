// @flow

import { EVENTS } from './constants.js';
import type { Chat } from './types.js';

export const getChatsStart = () => ({
  type: EVENTS.GET_CHATS_START
});

export const loadMoreChats = () => ({
  type: EVENTS.LOAD_MORE_CHATS
});

export const getChatsSuccess = (chats: Array<Chat>) => ({
  type: EVENTS.GET_CHATS_SUCCESS,
  payload: { chats }
});

export const getChatsFailure = (error: string) => ({
  type: EVENTS.GET_CHATS_FAILURE,
  payload: { error }
});
