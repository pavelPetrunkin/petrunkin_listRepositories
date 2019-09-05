import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import RepositorySagas from './sagas/RepositorySagas';
import App from './App';
import rootReducer from './reducers';
import './index.css'
import paginationFilter from "./helpers/paginationFilter";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(RepositorySagas);

test('paginationFilter', () => {
    const repositories = [
        {name:'hellohi',html_url:'one'},
        {name:'bie',html_url:'two'},
        {name:'howareyou',html_url:'three'}
    ];
    const value = paginationFilter(repositories,'All','hello',1,2);
    expect(value.fullFilter.length).toBe(1);
});

test('paginationFilter', () => {
    const repositories = [
        {name:'hellohi',html_url:'one'},
        {name:'bie',html_url:'two'},
        {name:'howareyou',html_url:'three'}
    ];
    const value = paginationFilter(repositories,'All','i',1,2);
    expect(value.fullFilter.length).toBe(2);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
