import { mapStateToProps } from '../app.container.js';

describe('AppContainer', () => {
  it('mapStateToProps', () => {
    const state = {
      chats: { a: 0, b: 1 },
      browser: {
        is: {
          mobile: true
        }
      }
    };
    expect(mapStateToProps(state)).toEqual({
      ...state.chats,
      isMobile: true,
    });
  })
})
