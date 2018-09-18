import { connect } from 'react-redux';
import { getChats } from '../thunks.js';
import App from './app.js';

const mapStateToProps = (state) => ({
  ...state.chats,
  isMobile: state.browser.is.mobile,
});

const mapDispatchToProps = (dispatch) => ({
  getChats: () => dispatch(getChats())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
