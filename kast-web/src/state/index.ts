import {sharedStore} from 'state/StateInitializer';
import {Store} from 'redux';

export const getStore = () => {
  const storeInstance = sharedStore.store;

  if (!storeInstance) {
    throw new Error('You should call createStore from StateInitializer firstly');
  }

  const store: Store = storeInstance;

  return store;
};

export const getDispatch = () => {
  const {dispatch} = getStore();

  return dispatch;
};
