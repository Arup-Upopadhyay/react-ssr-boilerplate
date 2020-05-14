import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/components/App.jsx';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../common/reducers/allReducers.jsx';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(allReducers, preloadedState, applyMiddleware(thunk, logger));

ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
