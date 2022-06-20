import {createAction} from 'redux-actions';
import types from './types';
import User from 'entities/User';
import {NavigationPayload} from 'state/ducks/router/actions';

export type FetchUserCompleted = {
  user: User;
};

export type FetchUser = {userId: string} & NavigationPayload;

export default {
  fetchUser: createAction<FetchUser>(types.FETCH_USER),
  fetchUserCompleted: createAction<FetchUserCompleted>(types.FETCH_USER_COMPLETED),
};
