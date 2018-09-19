import { connect } from 'react-redux';
import { getChats } from '../thunks.js';
import { loadMoreChats } from '../actions.js';
import App from './app.js';

export const mapStateToProps = (state) => ({
  ...state.chats,
  isMobile: state.browser.is.mobile,
});

const mapDispatchToProps = (dispatch) => ({
  getChats: () => dispatch(getChats()),
  loadMoreChats: () => dispatch(loadMoreChats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
