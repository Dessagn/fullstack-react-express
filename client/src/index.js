import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

//create an instance of redux store by passing 3 arguments.
// 1. a reducer arrow function
// 2. initial state of application
// 3. applyMiddleware hook
const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store = { store }> <App /> </Provider>,
    document.getElementById('root')
    );