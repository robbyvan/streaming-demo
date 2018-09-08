import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const middlewares = [thunk];

const configureStore = (initialState = Object.assign({})) => {
  // for dev.
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(createReducer(), initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer());
    })
  }

  return store;
}

export default configureStore;