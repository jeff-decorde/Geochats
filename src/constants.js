export const INITIAL_STATE = {
  isLoading: false,
  chatsData: [],
  chats: [],
  error: null
};

export const EVENTS = {
  GET_CHATS_START: 'GET_CHATS/GET_CHATS_START',
  GET_CHATS_SUCCESS: 'GET_CHATS/GET_CHATS_SUCCESS',
  LOAD_MORE_CHATS: 'GET_CHATS/LOAD_MORE_CHATS',
  GET_CHATS_FAILURE: 'GET_CHATS/GET_CHATS_FAILURE',
};

export const GET_CHATS_URL = 'https://api.sweep.im/api/v3/public/chats';
export const ERROR_MESSAGE = 'An error occured ! Please try again later.'
export const CATEGORIES = ['Radius', 'Maximum Radius', 'Coordinates'];
