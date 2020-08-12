import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
