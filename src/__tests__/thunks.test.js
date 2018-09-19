import { getChats } from '../thunks.js';
import * as actions from '../actions.js';
import { GET_CHATS_URL } from '../constants.js';

describe('Thunks', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('getChats', () => {
    const response = { coucou: 'coucou' };
    fetch.mockResponseOnce(JSON.stringify(response));

    const store = global.mockStore({});
    store.dispatch(getChats()).then(() => {
      expect(store.getActions()).toEqual([
        actions.getChatsStart(),
        actions.getChatsSuccess(response)
      ]);
    });
    expect(fetch).toHaveBeenCalledWith(GET_CHATS_URL);
  });
})
