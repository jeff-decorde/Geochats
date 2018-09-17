import { connect } from 'react-redux';
import { getChats } from '../thunks.js';
import App from './app.js';

const mapStateToProps = (state) => ({
  ...state.chats
});

const mapDispatchToProps = (dispatch) => ({
  getChats: () => dispatch(getChats())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
