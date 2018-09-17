import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import geochatsReducer from './reducer.js';

const reducers = combineReducers({
  chats: geochatsReducer
});

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

export default store;
