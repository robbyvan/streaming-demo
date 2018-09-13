import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../_reducers';

const loggerMiddleware = createLogger();

const middlewares = [
  thunkMiddleware,
  loggerMiddleware
];

export function configureStore(initialState = Object.assign({})) {
  const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(createReducer(), initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../_reducers', () => {
      store.replaceReducer(createReducer());
    })
  }

  return store;
}
