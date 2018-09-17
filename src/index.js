import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './app/app.container.js';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js';

const App = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
