import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import tutorials, {TutorialsState} from './tutorials';
import auth, {AuthState} from './auth';

export interface StoreState {
  auth: AuthState;
  tutorials: TutorialsState;
}

const logger = createLogger({
  collapsed: true,
});

export default createStore<StoreState>(
  combineReducers<StoreState>({
    tutorials,
    auth,
  }),
  compose(applyMiddleware(thunkMiddleware, logger)),
);
