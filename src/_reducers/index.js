import { combineReducers } from 'redux';

import authentication from './authentication.reducer';

export default function createReducer() {
  return combineReducers({
    authentication
  });
}