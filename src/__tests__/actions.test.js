import * as actions from '../actions.js';
import { EVENTS } from '../constants.js';

describe('Actions', () => {
  it('getChatsStart', () => {
    expect(actions.getChatsStart()).toEqual({
      type: EVENTS.GET_CHATS_START,
    });
  });

  it('loadMoreChats', () => {
    expect(actions.loadMoreChats()).toEqual({
      type: EVENTS.LOAD_MORE_CHATS,
    });
  });

  it('getChatsSuccess', () => {
    expect(actions.getChatsSuccess([])).toEqual({
      type: EVENTS.GET_CHATS_SUCCESS,
      payload: { chats: [] }
    });
  });

  it('getChatsFailure', () => {
    expect(actions.getChatsFailure('error')).toEqual({
      type: EVENTS.GET_CHATS_FAILURE,
      payload: { error: 'error' }
    });
  });
});
