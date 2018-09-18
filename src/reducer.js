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
        currentIndex: 20,
        chatsData: action.payload.chats,
        chats: action.payload.chats.slice(0, 20)
      };
    case EVENTS.LOAD_MORE_CHATS:
      return {
        ...state,
        currentIndex: state.currentIndex + 20 >= state.chatsData.length
          ? state.chatsData.length
          : state.currentIndex + 20,
        chats: [
          ...state.chats,
          ...state.chatsData.slice(state.currentIndex, state.currentIndex + 20)
        ]
      }
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
