import {applyMiddleware, createStore, Store} from 'redux';
import {createBrowserHistory} from 'history';
import createSagaMiddleware, {Saga} from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import State from './entities/State';
import {rootReducer} from 'state/ducks';

// browser history
export const history = createBrowserHistory();

export const sharedStore: {store: Store<State> | undefined} = {store: undefined};

export const configureStore = (saga: Saga, preloadedState?: State): Store<State> => {
  // configure middlewares
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    //
    sagaMiddleware,
  ];

  // compose enhancers
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  // create store
  const store = createStore(rootReducer, preloadedState, enhancer);

  const rootSagaTask = sagaMiddleware.run(saga);
  rootSagaTask.toPromise().catch((e) => {
    // eslint-disable-next-line no-console
    console.log('saga error', e);
    sagaMiddleware.run(saga);
  });
  // sagaMiddleware.run(saga);

  sharedStore.store = store;

  return store;
};
