import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createResponsiveStateReducer, responsiveStoreEnhancer } from 'redux-responsive';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import geochatsReducer from './reducer.js';

const reducers = combineReducers({
  chats: geochatsReducer,
  browser: createResponsiveStateReducer({
    mobile: 768,
    tablet: 1024,
  })
});

const store = createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(thunk, logger)
  )
);

export default store;
