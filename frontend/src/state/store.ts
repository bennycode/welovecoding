import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import tutorials from './tutorials';

const logger = createLogger({
  collapsed: true,
});

export default createStore(
  combineReducers({
    tutorials,
  }),
  compose(
    applyMiddleware(thunkMiddleware, logger),
  ),
);
