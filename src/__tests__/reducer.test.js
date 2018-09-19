import geochatsReducer from '../reducer.js';
import { INITIAL_STATE } from '../constants.js';
import * as actions from '../actions';

describe('reducer', () => {
  const chatsData = Array.apply(null, { length: 40 }).map(Number.call, Number)

  it('GET_CHATS_START', () => {
    expect(geochatsReducer(INITIAL_STATE, actions.getChatsStart())).toEqual({
      ...INITIAL_STATE,
      isLoading: true
    });
  });

  it('GET_CHATS_SUCCESS', () => {
    expect(geochatsReducer(INITIAL_STATE, actions.getChatsSuccess(chatsData))).toEqual({
      ...INITIAL_STATE,
      isLoading: false,
      currentIndex: 20,
      chatsData: chatsData,
      chats: chatsData.slice(0, 20)
    });
  });

  it('GET_CHATS_FAILURE', () => {
    expect(geochatsReducer(INITIAL_STATE, actions.getChatsFailure('error'))).toEqual({
      ...INITIAL_STATE,
      isLoading: false,
      error: 'error'
    });
  });

  it('LOAD_MORE_CHATS', () => {
    const previousState = {
      ...INITIAL_STATE,
      isLoading: false,
      currentIndex: 20,
      chatsData: chatsData,
      chats: chatsData.slice(0, 20)
    }
    expect(geochatsReducer(previousState, actions.loadMoreChats())).toEqual({
      ...previousState,
      currentIndex: 40,
      chats: chatsData.slice(0, 40)
    });
  });
});
