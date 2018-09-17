export const INITIAL_STATE = {
  isLoading: false,
  chats: [],
  error: null
};

export const EVENTS = {
  GET_CHATS_START: 'GET_CHATS/GET_CHATS_START',
  GET_CHATS_SUCCESS: 'GET_CHATS/GET_CHATS_SUCCESS',
  GET_CHATS_FAILURE: 'GET_CHATS/GET_CHATS_FAILURE',
};

export const ERROR_MESSAGE = 'An error occured ! Please try again later.'