import { INITIAL_STATE, EVENTS } from './constants.js';

const geochatsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EVENTS.GET_CHATS_START:
      return {
        ...state,
        isLoading: true
      };
    case EVENTS.GET_CHATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chats: action.payload.chats
      };
    case EVENTS.GET_CHATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default geochatsReducer;
