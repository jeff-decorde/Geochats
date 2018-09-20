// @flow

import { connect } from 'react-redux';
import { getChats } from '../thunks.js';
import { loadMoreChats } from '../actions.js';
import App from './app.js';

import type { State, Dispatch } from '../types.js'

export const mapStateToProps = (state: State) => ({
  ...state.chats,
  isMobile: state.browser.is.mobile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getChats: () => dispatch(getChats()),
  loadMoreChats: () => dispatch(loadMoreChats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
