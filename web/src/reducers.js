import { combineReducers } from 'redux';

import appReducer from './components/App/reducer';

export default function createReducer() {
  return combineReducers({
    app: appReducer
  });
}